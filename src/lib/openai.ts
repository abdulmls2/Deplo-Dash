// Define the system prompt
const SYSTEM_PROMPT = `You are a helpful customer support assistant. Your goal is to provide clear, accurate, and friendly responses to customer inquiries. Keep your responses concise but informative. If you don't know something, be honest about it.`;

// Function to generate bot response using the API endpoint
export const generateBotResponse = async (message: string, conversationId: string): Promise<string> => {
  try {
    const response = await fetch('https://deplo-dash.vercel.app/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.response) {
      throw new Error('Invalid response format from server');
    }
    return data.response;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Sorry, I encountered an error while processing your request. Please try again later.';
  }
};

// Keep track of conversation history (in memory)
export const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();
