import { create } from 'zustand';
import { supabase } from '../supabase';
import { Database } from '../database.types';
import { toast } from 'react-hot-toast';
import { generateBotResponse } from '../openai';

type Message = Database['public']['Tables']['messages']['Row'];

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

      // Check if live mode is enabled and get domain_id
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .select('live_mode, domain_id')
        .eq('id', conversationId)
        .single();

      if (conversationError) throw conversationError;

      console.log('Conversation data:', {
        conversationId,
        conversationData,
        hasLiveMode: !!conversationData?.live_mode,
        hasDomainId: !!conversationData?.domain_id
      });

      // Only generate OpenAI response if live mode is disabled
      if (!conversationData.live_mode) {
        try {
          let chatbotName = "Friendly Assistant"; // Default name

          if (conversationData.domain_id) {
            // Get chatbot name from domain settings
            const { data: domainSettings, error: settingsError } = await supabase
              .from('domain_settings')
              .select('chatbot_name')
              .eq('domain_id', conversationData.domain_id)
              .single();

            if (!settingsError && domainSettings?.chatbot_name) {
              chatbotName = domainSettings.chatbot_name;
            }
          }

          const botResponse = await generateBotResponse(content, conversationId, chatbotName);
          
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
