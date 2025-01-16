import React, { useState } from "react";
import Sidebar from "./Sidebar";
import InputText from "./InputText";
import Button from "./Button";
import { MessageType } from "@/utils/types";
import { Copy } from "lucide-react";

type Props = {
  conversationId?: string;
  conversations: string[];
  messages: MessageType[];
  onSend: (message: string) => void;
  isLoading: boolean;
};

const ChatLayout: React.FC<Props> = function ({
  messages = [],
  conversations = [],
  conversationId,
  onSend,
  isLoading = false,
}: Props) {
  const [message, setMessage] = useState("");

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex w-screen h-screen">
      <Sidebar conversations={conversations} conversationId={conversationId} />
      <main className="w-full h-full py-16 flex flex-col items-center">
        <div className="w-3/5 h-full flex flex-col justify-between items-center">
          <ul className="flex flex-col gap-2 overflow-auto">
            {messages.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-4xl">AI Chatbot</h2>
                <p>Write a message to start a conversation !</p>
              </div>
            )}
            {messages.map((messageItem, idx) => {
              const key = `${messageItem}_${idx}`;
              return (
                <li className="flex gap-2 p-1" key={key}>
                  {messageItem.role == "user" ? (
                    <div>
                      <span className="font-bold">You:</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold">AI:</span>
                    </div>
                  )}
                  <div className="w-full flex justify-between items-center group">
                    <p>{messageItem.content}</p>
                    <Copy
                        size={20}
                      className="cursor-pointer hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                      onClick={() =>
                        navigator.clipboard.writeText(messageItem.content)
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="w-2/3 flex gap-8 border border-gray-200 p-6 mt-6 items-center">
            <InputText
              inputId="chatInput"
              fullWidth
              placeholder="Message"
              type="text"
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <Button
              buttonId="sendButton"
              variant="outlined"
              onClick={() => {
                onSend(message);
                setMessage("");
              }}
              disabled={message.length == 0}
              loading={isLoading}
            >
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatLayout;
