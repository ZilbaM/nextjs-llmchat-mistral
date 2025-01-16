import { set, get, del } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from './types';

const CONVERSATION_LIST_KEY = 'conversationIds';

const chatKey = (conversationId: string): string => `chatHistory_${conversationId}`;
const hashKey = (conversationId: string): string => `chatHash_${conversationId}`;

/**
 * Saves conversation messages with tamper detection.
 * @param conversationId - Unique identifier for the conversation.
 * @param messages - Array of messages to save.
 */
export async function setConversation(conversationId: string, messages: MessageType[]): Promise<void> {
  try {
    const messagesStr = JSON.stringify(messages);
    const hash = CryptoJS.SHA256(messagesStr).toString();

    // Store messages and their hash
    await set(chatKey(conversationId), messagesStr);
    await set(hashKey(conversationId), hash);

    // Update conversation list
    const existingList = await get<string[]>(CONVERSATION_LIST_KEY) || [];
    if (!existingList.includes(conversationId)) {
      existingList.push(conversationId);
      await set(CONVERSATION_LIST_KEY, existingList);
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}

/**
 * Loads conversation messages if data integrity is intact.
 * @param conversationId - Unique identifier for the conversation.
 * @returns Array of messages or an empty array if integrity fails or not found.
 */
export async function getConversation(conversationId: string): Promise<MessageType[]> {
  try {
    const messagesStr = await get<string>(chatKey(conversationId));
    const storedHash = await get<string>(hashKey(conversationId));

    if (!messagesStr || !storedHash) {
      console.warn(`No chat data found for conversation ${conversationId}.`);
      return [];
    }

    const currentHash = CryptoJS.SHA256(messagesStr).toString();

    if (currentHash === storedHash) {
      return JSON.parse(messagesStr);
    } else {
      console.warn(`Tampering detected for conversation ${conversationId}.`);
      return [];
    }
  } catch (error) {
    console.error('Error loading conversation:', error);
    return [];
  }
}

/**
 * Retrieves all stored conversation IDs.
 * @returns Array of conversation ID strings.
 */
export async function getConversationIds(): Promise<string[]> {
  try {
    const conversationIds = await get<string[]>(CONVERSATION_LIST_KEY);
    return conversationIds || [];
  } catch (error) {
    console.error('Error retrieving conversation IDs:', error);
    return [];
  }
}

export async function createNewConversation(initialMessages: MessageType[] = []): Promise<string> {
    const conversationId = uuidv4(); // Generate a unique conversation ID
    await setConversation(conversationId, initialMessages); // Initialize storage for the new conversation
    return conversationId;
  }

export async function deleteConversation(conversationId: string) {
    const chatKeyToDelete = chatKey(conversationId);
    const hashKeyToDelete = hashKey(conversationId);

    await del(chatKeyToDelete);
    await del(hashKeyToDelete);

    const existingList = await get<string[]>(CONVERSATION_LIST_KEY) || [];
    const updatedList = existingList.filter((id) => id !== conversationId);
    await set(CONVERSATION_LIST_KEY, updatedList);
}