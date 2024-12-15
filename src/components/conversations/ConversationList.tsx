import React, { useEffect, useState } from 'react';
import { User, Tag } from 'lucide-react';
import { useConversationStore } from '../../lib/store/conversationStore';
import { useDomain } from '../../context/DomainContext';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../../lib/supabase';

interface ConversationListProps {
  onSelectConversation: (conversationId: string) => void;
  selectedId?: string | null;
}

export default function ConversationList({ onSelectConversation, selectedId }: ConversationListProps) {
  const { conversations, fetchConversations, isLoading, setCurrentDomainId } = useConversationStore();
  const { currentDomain } = useDomain();
  const [latestMessages, setLatestMessages] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const messages: {[key: string]: string} = {};
      for (const conversation of conversations) {
        const { data } = await supabase
          .from('messages')
          .select('content')
          .eq('conversation_id', conversation.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (data) {
          messages[conversation.id] = data.content;
        }
      }
      setLatestMessages(messages);
    };

    if (conversations.length > 0) {
      fetchLatestMessages();
    }
  }, [conversations]);

  useEffect(() => {
    if (currentDomain) {
      setCurrentDomainId(currentDomain.id);
    } else {
      setCurrentDomainId(null);
    }
  }, [currentDomain, setCurrentDomainId]);

  if (!currentDomain) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Please select a domain</p>
      </div>
    );
  }

  if (isLoading && conversations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
          <p>No conversations found</p>
        </div>
      ) : (
        conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 border-b border-gray-200 text-left transition-colors ${
              selectedId === conversation.id ? 'bg-gray-50' : ''
            }`}
          >
            <div className="rounded-full bg-gray-100 p-2">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-900">
                  {conversation.title || 'New Conversation'}
                </span>
                {conversation.last_message_at && (
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                  </span>
                )}
              </div>
              
              {latestMessages[conversation.id] && (
                <p className="text-sm text-gray-600 truncate mb-1">
                  {latestMessages[conversation.id]}
                </p>
              )}
              
              {conversation.tags && conversation.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {conversation.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-white"
                      style={{ backgroundColor: tag.color }}
                    >
                      <Tag className="h-3 w-3" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              
              {!conversation.is_read && (
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1"></span>
              )}
            </div>
          </button>
        ))
      )}
    </div>
  );
}