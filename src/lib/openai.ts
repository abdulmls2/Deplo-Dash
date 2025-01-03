// Function to generate bot response using the API endpoint
export const generateBotResponse = async (message: string, conversationId: string, prompt: string): Promise<string> => {
  try {
    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      console.error('Invalid prompt:', { prompt, type: typeof prompt });
      throw new Error('Prompt is required for bot response and must be a non-empty string');
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.error('Invalid message:', { message, type: typeof message });
      throw new Error('Message is required and must be a non-empty string');
    }

    // Always use the absolute URL for the API endpoint
    const API_URL = 'https://deplo-dash.vercel.app/api/chat';
    
    const requestBody = {
      message: message.trim(),
      prompt: prompt.trim()
    };
    
    console.log('Sending request to API with:', {
      url: API_URL,
      body: requestBody,
      conversationId // logged for debugging but not sent
    });
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
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
    console.log('API response data:', data);
    return data.response || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
};

// Keep track of conversation history (in memory)
export const conversationHistory = new Map<string, { role: "user" | "assistant" | "system", content: string }[]>();
