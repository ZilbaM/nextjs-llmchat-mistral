import { MessageType } from "./types";

export async function askLLM(messages: MessageType[]): Promise<any> {
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
  
      if (!res.ok) {
        console.error('Failed to fetch from /api/ask');
        return undefined;
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error in askLLM:', error);
      return undefined;
    }
  }
  