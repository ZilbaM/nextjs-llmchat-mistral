// src/pages/api/ask.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Mistral } from '@mistralai/mistralai';
import { MessageType } from '@/utils/types';

// 1. Configure the Mistral client
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageType | ErrorResponse>
) {
  try {
    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    // Extract the user messages from the request body
    const { messages } = req.body;
    if (!messages) {
      return res.status(400).json({ error: 'Missing `messages` field.' });
    }

    // Call the Mistral API
    const response = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: messages,
    });

    // Ensure response is what we expect
    if (response && response.choices && response.choices.length > 0) {
      const replyContent = response.choices[0]?.message?.content;
      if (replyContent && typeof(replyContent) === 'string') {
        const reply: MessageType = {
          role: 'assistant',
          content: replyContent,
        };
        return res.status(200).json(reply);
      }
    } else {
      // Handle case where response doesn't have choices or is not structured as expected.
      return res.status(500).json({ error: 'Unexpected API response structure.' });
    }
  } catch (error) {
    console.error('Error calling Mistral:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
