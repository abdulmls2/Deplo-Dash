import React from 'react';
import { create } from 'zustand';
import { supabase } from '../supabase';
import { Database } from '../database.types';
import { toast } from 'react-hot-toast';
import { UserRound } from 'lucide-react';
import { create } from 'zustand';
import { supabase } from '../supabase';
import { Database } from '../database.types';
import { toast } from 'react-hot-toast';

type Conversation = Database['public']['Tables']['conversations']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface ConversationStore {
  conversations: (Conversation & { tags?: Tag[] })[];
  currentConversation: (Conversation & { tags?: Tag[] }) | null;
  messages: Message[];
  tags: Tag[];
  selectedTags: string[];
  isLoading: boolean;
  error: string | null;
  currentDomainId: string | null;
  setCurrentDomainId: (domainId: string | null) => void;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  fetchTags: () => Promise<void>;
  sendMessage: (content: string, conversationId: string) => Promise<void>;
  createConversation: (title?: string) => Promise<string>;
  updateConversation: (id: string, updates: Partial<Conversation>) => Promise<void>;
  addTag: (conversationId: string, tagId: string) => Promise<void>;
  removeTag: (conversationId: string, tagId: string) => Promise<void>;
  setSelectedTags: (tags: string[]) => void;
  fetchConversationTags: (conversationId: string) => Promise<Tag[]>;
  createTag: (name: string, color: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (order: 'newest' | 'oldest') => void;
  activeFilter: 'active' | 'all' | 'urgent' | 'closed';
  setActiveFilter: (filter: 'active' | 'all' | 'urgent' | 'closed') => void;
  toggleLiveMode: (conversationId: string) => Promise<void>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  tags: [],
  selectedTags: [],
  isLoading: false,
  error: null,
  sortOrder: 'newest',
  activeFilter: 'active',
  currentDomainId: null,

  setCurrentDomainId: (domainId: string | null) => {
    set({ currentDomainId: domainId });
    if (domainId) {
      get().fetchConversations();
      get().fetchTags();
      
      // Set up real-time subscription for new conversations
      const channel = supabase
        .channel('new-conversations')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'conversations',
            filter: `domain_id=eq.${domainId}`,
          },
          async (payload) => {
            const newConversation = payload.new as Conversation;
            set((state) => ({
              conversations: [newConversation, ...state.conversations]
            }));
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'conversations',
            filter: `domain_id=eq.${domainId}`,
          },
          async (payload) => {
            const updatedConversation = payload.new as Conversation;
            const { activeFilter } = get();

            set((state) => {
              // Find the index of the existing conversation
              const existingIndex = state.conversations.findIndex(
                conv => conv.id === updatedConversation.id
              );

              // If conversation exists, update it
              if (existingIndex !== -1) {
                const updatedConversations = [...state.conversations];
                
                // If current filter is 'active' and conversation is no longer active
                if (
                  activeFilter === 'active' && 
                  (updatedConversation.requested_live_at !== null || 
                   updatedConversation.status !== 'active')
                ) {
                  // Remove the conversation from the list
                  updatedConversations.splice(existingIndex, 1);
                } else {
                  // Otherwise, update the conversation
                  updatedConversations[existingIndex] = updatedConversation;
                }

                return { conversations: updatedConversations };
              }

              // If conversation doesn't exist, add it based on current filter
              if (
                activeFilter === 'urgent' && 
                updatedConversation.requested_live_at !== null
              ) {
                return { 
                  conversations: [updatedConversation, ...state.conversations] 
                };
              } else if (
                activeFilter === 'active' && 
                updatedConversation.requested_live_at === null &&
                updatedConversation.status === 'active'
              ) {
                return { 
                  conversations: [updatedConversation, ...state.conversations] 
                };
              }

              // If it doesn't match current filter, don't add
              return { conversations: state.conversations };
            });
          }
        )
        .subscribe();

      // Clean up subscription when domain changes
      return () => {
        channel.unsubscribe();
      };
    }
  },

  setSelectedTags: (tags: string[]) => {
    set({ selectedTags: tags });
  },

  fetchConversations: async () => {
    const { currentDomainId } = get();
    if (!currentDomainId) {
      set({ conversations: [] });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { selectedTags, sortOrder, activeFilter } = get();

      let query = supabase
        .from('conversations')
        .select(`
          *,
          conversation_tags!left (
            tags (
              id,
              name,
              color
            )
          )
        `)
        .eq('domain_id', currentDomainId)
        .neq('status', 'deleted')
        .order('last_message_at', { ascending: sortOrder === 'oldest' });
        

      // Apply filter based on activeFilter
      switch (activeFilter) {
        case 'active':
          query = query.eq('status', 'active').is('requested_live_at', null);
          break;
        case 'urgent':
          query = query.not('requested_live_at', 'is', null).eq('status', 'active');
          break;
        case 'closed':
          query = query.eq('status', 'archived');
          break;
        // 'all' filter doesn't need additional conditions
      }

      const { data, error } = await query;
      if (error) throw error;

      let filteredConversations = data || [];

      // Apply tag filtering if tags are selected
      if (selectedTags.length > 0) {
        filteredConversations = filteredConversations.filter(conv => {
          const convTags = conv.conversation_tags
            .map((ct: any) => ct.tags)
            .filter((tag: Tag | null): tag is Tag => tag !== null);
          return selectedTags.every(tagId => 
            convTags.some(tag => tag.id === tagId)
          );
        });
      }

      set({
        conversations: filteredConversations.map(conv => ({
          ...conv,
          tags: conv.conversation_tags
            .map((ct: any) => ct.tags)
            .filter((tag: Tag | null): tag is Tag => tag !== null)
        }))
      });
    } catch (error: any) {
      console.error('Error fetching conversations:', error);
      set({ error: error.message });
      toast.error('Failed to fetch conversations');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMessages: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .single();

      if (conversationError) throw conversationError;

      const tags = await get().fetchConversationTags(conversationId);

      set({ 
        messages: messages || [],
        currentConversation: conversation ? { ...conversation, tags } : null
      });
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      set({ error: error.message });
      toast.error('Failed to fetch messages');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTags: async () => {
    const { currentDomainId } = get();
    if (!currentDomainId) {
      set({ tags: [] });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .eq('domain_id', currentDomainId)
        .order('name');

      if (error) throw error;
      set({ tags: data || [] });
    } catch (error: any) {
      console.error('Error fetching tags:', error);
      set({ error: error.message });
      toast.error('Failed to fetch tags');
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (content: string, conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const messageData = {
        conversation_id: conversationId,
        content,
        sender_type: 'bot',
        user_id: user?.id || null
      };

      const { error: messageError } = await supabase
        .from('messages')
        .insert(messageData);

      if (messageError) throw messageError;

      const { error: updateError } = await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (updateError) throw updateError;

      await get().fetchMessages(conversationId);
    } catch (error: any) {
      console.error('Error sending message:', error);
      set({ error: error.message });
      toast.error('Failed to send message');
    } finally {
      set({ isLoading: false });
    }
  },

  createConversation: async (title?: string) => {
    const { currentDomainId } = get();
    if (!currentDomainId) {
      throw new Error('No domain selected');
    }

    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          title,
          user_id: user.id,
          domain_id: currentDomainId,
          last_message_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Failed to create conversation');

      await get().fetchConversations();
      return data.id;
    } catch (error: any) {
      console.error('Error creating conversation:', error);
      set({ error: error.message });
      toast.error('Failed to create conversation');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateConversation: async (id: string, updates: Partial<Conversation>) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('conversations')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await get().fetchConversations();
    } catch (error: any) {
      console.error('Error updating conversation:', error);
      set({ error: error.message });
      toast.error('Failed to update conversation');
    } finally {
      set({ isLoading: false });
    }
  },

  addTag: async (conversationId: string, tagId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('conversation_tags')
        .insert({ conversation_id: conversationId, tag_id: tagId });

      if (error) throw error;
      
      await get().fetchMessages(conversationId);
      await get().fetchConversations();
    } catch (error: any) {
      console.error('Error adding tag:', error);
      set({ error: error.message });
      toast.error('Failed to add tag');
    } finally {
      set({ isLoading: false });
    }
  },

  removeTag: async (conversationId: string, tagId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('conversation_tags')
        .delete()
        .eq('conversation_id', conversationId)
        .eq('tag_id', tagId);

      if (error) throw error;
      
      await get().fetchMessages(conversationId);
      await get().fetchConversations();
    } catch (error: any) {
      console.error('Error removing tag:', error);
      set({ error: error.message });
      toast.error('Failed to remove tag');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchConversationTags: async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('conversation_tags')
        .select(`
          tags (
            id,
            name,
            color
          )
        `)
        .eq('conversation_id', conversationId);

      if (error) throw error;

      return data
        ?.map(item => item.tags)
        .filter((tag): tag is Tag => tag !== null) || [];
    } catch (error: any) {
      console.error('Error fetching conversation tags:', error);
      return [];
    }
  },

  createTag: async (name: string, color: string) => {
    const { currentDomainId } = get();
    if (!currentDomainId) {
      throw new Error('No domain selected');
    }

    set({ isLoading: true, error: null });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('tags')
        .insert([{ name, color, domain_id: currentDomainId }])
        .select()
        .single();

      if (error) throw error;

      await get().fetchTags();
      toast.success('Tag created successfully');
    } catch (error: any) {
      console.error('Error creating tag:', error);
      set({ error: error.message });
      toast.error('Failed to create tag: ' + error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTag: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await get().fetchTags();
      await get().fetchConversations();
      
      toast.success('Tag deleted successfully');
    } catch (error: any) {
      console.error('Error deleting tag:', error);
      set({ error: error.message });
      toast.error('Failed to delete tag: ' + error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleLiveMode: async (conversationId: string) => {
    try {
      const { data: conversation } = await supabase
        .from('conversations')
        .select('live_mode')
        .eq('id', conversationId)
        .single();

      const { error } = await supabase
        .from('conversations')
        .update({ live_mode: !conversation.live_mode })
        .eq('id', conversationId);

      if (error) throw error;

      // Refetch conversation to update local state
      await get().fetchMessages(conversationId);
      toast.success(conversation.live_mode ? 'Bot mode enabled' : 'Live mode enabled');
    } catch (error: any) {
      console.error('Error toggling live mode:', error);
      toast.error('Failed to toggle live mode');
    }
  },

  setSortOrder: (order: 'newest' | 'oldest') => {
    set({ sortOrder: order });
    get().fetchConversations();
  },

  setActiveFilter: (filter: 'active' | 'all' | 'urgent' | 'closed') => {
    set({ activeFilter: filter });
    get().fetchConversations();
  },

  markConversationAsRead: async (conversationId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('conversations')
        .update({ is_read: true })
        .eq('id', conversationId);

      if (error) throw error;

      // Optimistically update the local store
      set((state) => ({
        conversations: state.conversations.map(conv => 
          conv.id === conversationId ? { ...conv, is_read: true } : conv
        ),
        // If this is the current conversation, update it too
        currentConversation: state.currentConversation?.id === conversationId 
          ? { ...state.currentConversation, is_read: true } 
          : state.currentConversation
      }));
    } catch (error) {
      console.error('Error marking conversation as read:', error);
      toast.error('Failed to mark conversation as read');
    }
  },
}));