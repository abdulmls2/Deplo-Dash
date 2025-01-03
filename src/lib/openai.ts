// Function to generate bot response using the API endpoint
export const generateBotResponse = async (message: string, conversationId: string, prompt: string): Promise<string> => {
  try {
    if (!prompt) {
      throw new Error('Prompt is required for bot response');
    }

    // Always use the absolute URL for the API endpoint
    const API_URL = 'https://deplo-dash.vercel.app/api/chat';
    
    console.log('Sending request to API with:', { message, conversationId, prompt });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message,
        prompt
      })
    });

    if (!response.ok) {
      console.error('API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

// Keep track of conversation history (in memory)
export const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();
