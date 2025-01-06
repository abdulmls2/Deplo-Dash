import { create } from 'zustand';
import { supabase } from '../supabase';
import { Database } from '../database.types';
import { toast } from 'react-hot-toast';
import { generateBotResponse } from '../openai';

type Message = Database['public']['Tables']['messages']['Row'];

interface ConversationWithSettings {
  domain_id: string;
  live_mode: boolean;
  domains: {
    domain_settings: Array<{
      chatbot_name: string | null;
    }>;
  } | null;
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
      // Get domain_id and settings from conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .select(`
          domain_id,
          live_mode,
          domains:domain_id (
            domain_settings (
              chatbot_name
            )
          )
        `)
        .eq('id', conversationId)
        .single();

      if (conversationError) throw conversationError;

      const typedConversationData = conversationData as unknown as ConversationWithSettings;
      const chatbotName = typedConversationData.domains?.domain_settings?.[0]?.chatbot_name || 'AI Assistant';

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

      // Only generate OpenAI response if live mode is disabled
      if (!conversationData.live_mode) {
        console.log('Live mode disabled, generating OpenAI response');
        try {
          // Using a test domain ID for debugging
          const testDomainId = "21de8dab-4455-435e-abab-5f058a82b956";
          console.log('Using test domain ID:', testDomainId);
          const botResponse = await generateBotResponse(content, conversationId, testDomainId, chatbotName);
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
