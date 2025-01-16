import '../globals.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatLayout from "@/ui/ChatLayout";
import {
  getConversation,
  setConversation,
  getConversationIds,
  createNewConversation,
} from "@/utils/storage";
import { askLLM } from "@/utils/llm";
import { MessageType } from "@/utils/types";

export default function ChatPage() {
  const router = useRouter();
  // If we have no "conversationId" in the URL, routeConversationId will be undefined.
  const { conversationId: routeConversationIds } = router.query as {
    conversationId?: string[];
  };
  const routeConversationId = routeConversationIds?.[0];

  const [conversationId, setConversationId] = useState<string | undefined>(
    routeConversationId
  );
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversations] = useState<string[]>([]);

  /**
   * Effect 1: Sync local conversationId state with the route’s ID,
   *           whenever the route changes (e.g., user navigates or a new route is set).
   */
  useEffect(() => {
    // If route param is defined, sync to local state.
    setConversationId(routeConversationId);
  }, [routeConversationId]);

  /**
   * Effect 2: Load the conversation from storage whenever conversationId changes
   */
  useEffect(() => {
    if (!conversationId) {
      // If there's still no conversationId (meaning user visited /chat, no ID in the URL),
      // we won't load anything yet. We'll create a new conversation on first message.
      setMessages([]);
      return;
    }

    // If we do have a conversationId, load its messages
    (async () => {
      const saved = await getConversation(conversationId);
      if (!saved || saved.length === 0) {
        console.warn(`No chat data found for conversation ${conversationId}.`);
        router.replace(`/chat/`, undefined, { shallow: true });
        return;
      }
      setMessages(saved);
    })();
  }, [conversationId]);

  /**
   * Effect 3: Load the list of conversation IDs (for a sidebar or similar).
   *           Only needs to happen once on mount, or after certain triggers.
   */
  useEffect(() => {
    (async () => {
      const ids = await getConversationIds();
      setConversations(ids);
    })();
  }, []); // Empty dependency, runs once on mount

  /**
   * handleSend: Called when the user sends a new message
   */
  const handleSend = async (newMessage: string) => {
    setIsLoading(true);
    let currentConversationId = conversationId
    // If no conversationId exists, create one now.
    const formattedMessage: MessageType = {
      role: "user",
      content: newMessage,
    };
    if (!currentConversationId) {
      // You may create an initial array with the first message or an empty array

      // Create the conversation in storage
      const newId = await createNewConversation([formattedMessage]);
      // Update local state
      setConversationId(newId);
      const newConversations = [...conversations, newId];
      setConversations(newConversations);
      // Optionally, update the URL so it can be bookmarked/shared
      router.replace(`/chat/${newId}`, undefined, { shallow: true });
      currentConversationId = newId
    }
    let updatedMessages = [...messages, formattedMessage];
    setMessages(updatedMessages);
    await setConversation(currentConversationId, updatedMessages);

    const llmReply = await askLLM(updatedMessages);
    if (!llmReply) {
      console.error("LLM call returned no response");
      setIsLoading(false);
      return;
    }
    updatedMessages = [...updatedMessages, llmReply];
    setMessages(updatedMessages);
    await setConversation(currentConversationId, updatedMessages);
    setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ChatLayout
      conversations={conversations}
      conversationId={conversationId}
      messages={messages}
      onSend={handleSend}
      isLoading={isLoading}
    />
  );
}
