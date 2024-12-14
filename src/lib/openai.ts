import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY
});

// Define the system prompt
const SYSTEM_PROMPT = `You are a helpful customer support assistant. Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

// Function to generate bot response using the API endpoint
export const generateBotResponse = async (message: string, conversationId: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
};

// Keep track of conversation history (in memory)
export const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();
