import { create } from 'zustand';
import { supabase } from '../supabase';
import { Database } from '../database.types';
import { toast } from 'react-hot-toast';
import { generateBotResponse } from '../openai';

type Message = Database['public']['Tables']['messages']['Row'];

// Define the type for the nested query response
type ConversationWithSettings = {
  live_mode: boolean;
  domain_settings: {
    chatbot_name: string;
  };
}

interface ChatbotStore {
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, conversationId: string) => Promise<void>;
}

export const useChatbotStore = create<ChatbotStore>((set, get) => ({
  isLoading: false,
  error: null,

  sendMessage: async (content: string, conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Always send as user message with null user_id to indicate it's from the widget
      console.log('Sending user message from widget:', content);
      const messageData = {
        conversation_id: conversationId,
        content,
        sender_type: 'user',
        user_id: null
      };

      const { error: messageError } = await supabase
        .from('messages')
        .insert(messageData);

      if (messageError) throw messageError;

      // Get both live_mode and chatbot_name in a single query
      const { data: conversationData, error: conversationError } = await supabase
        .from('messages')
        .select(`
          conversations!inner (
            live_mode,
            domain_settings!inner (
              chatbot_name
            )
          )
        `)
        .eq('conversation_id', conversationId)
        .single();

      if (conversationError) throw conversationError;

      console.log('Query response:', conversationData);

      const chatbotName = conversationData?.conversations?.domain_settings?.chatbot_name || "Friendly Assistant";
      const live_mode = conversationData?.conversations?.live_mode;

      console.log('Extracted data:', { chatbotName, live_mode });

      // Only generate OpenAI response if live mode is disabled
      if (!live_mode) {
        console.log('Live mode disabled, generating OpenAI response');
        try {
          console.log('Using chatbot name:', chatbotName);

          const botResponse = await generateBotResponse(content, conversationId, chatbotName);
          console.log('Got OpenAI response:', botResponse);
          
          // Send bot response
          const botMessageData = {
            conversation_id: conversationId,
            content: botResponse,
            sender_type: 'bot',
            user_id: null
          };

          const { error: botError } = await supabase
            .from('messages')
            .insert(botMessageData);

          if (botError) throw botError;
        } catch (error) {
          console.error('Error generating bot response:', error);
          toast.error('Failed to generate bot response');
        }
      } else {
        console.log('Live mode enabled, skipping OpenAI response');
      }

      // Update conversation last_message_at
      const { error: updateError } = await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (updateError) throw updateError;
    } catch (error: any) {
      console.error('Error sending message:', error);
      set({ error: error.message });
      toast.error('Failed to send message');
    } finally {
      set({ isLoading: false });
    }
  },
}));
