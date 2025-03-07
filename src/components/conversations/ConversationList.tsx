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
  const { 
    conversations, 
    fetchConversations, 
    isLoading, 
    setCurrentDomainId,
    markConversationAsRead 
  } = useConversationStore();
  const { currentDomain } = useDomain();
  const [latestMessages, setLatestMessages] = useState<{[key: string]: string}>({});
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchLatestMessages = async () => {
      const messages: {[key: string]: string} = {};
      for (const conversation of conversations) {
        const { data } = await supabase
          .from('messages')
          .select('content')
          .eq('conversation_id', conversation.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (data && data.length > 0) {
          messages[conversation.id] = data[0].content;
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute instead of every second

    return () => clearInterval(timer);
  }, []);

  const formatWaitingTime = (requestedAt: string) => {
    const waitTime = currentTime - new Date(requestedAt).getTime();
    const minutes = Math.floor(waitTime / 60000);
    
    if (minutes < 1) return 'just now';
    if (minutes === 1) return '1 min';
    return `${minutes} min`;
  };

  const formatDistanceToNowWithJustNow = (date: Date) => {
    const distanceToNow = formatDistanceToNow(date, { addSuffix: true });
    if (distanceToNow === 'a few seconds ago') return 'just now';
    return distanceToNow;
  };

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
            onClick={() => {
              if (conversation.requested_live_at && !conversation.is_read) {
                markConversationAsRead(conversation.id);
              }
              onSelectConversation(conversation.id);
            }}
            className={`w-full flex items-start gap-4 px-5 py-4 text-left transition-all duration-200
              ${selectedId === conversation.id 
                ? 'bg-gray-50 shadow-sm' 
                : 'hover:bg-gray-50/50'
              }
              ${conversation.requested_live_at && !conversation.is_read 
                ? 'border-l-4 border-l-blue-500 bg-blue-50' 
                : 'border-l-4 border-l-transparent'
              }
              border-b border-gray-100
            `}
          >
            <div className={`shrink-0 rounded-full p-2.5 transition-colors
              ${selectedId === conversation.id 
                ? 'bg-blue-50' 
                : 'bg-gray-100'
              }`}>
              <User className={`h-5 w-5 
                ${selectedId === conversation.id 
                  ? 'text-blue-600' 
                  : 'text-gray-600'
                }`} 
              />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-center">
                <span className={`font-medium truncate
                  ${selectedId === conversation.id 
                    ? 'text-blue-600' 
                    : 'text-gray-900'
                  }`}>
                  {conversation.title || 'New Conversation'}
                </span>
                {conversation.last_message_at && (
                  <span className="text-xs text-gray-500 shrink-0 ml-2">
                    {formatDistanceToNowWithJustNow(new Date(conversation.last_message_at))}
                  </span>
                )}
              </div>
              
              {latestMessages[conversation.id] && (
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {latestMessages[conversation.id]}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-2">
                {conversation.tags && conversation.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
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
                
                {conversation.requested_live_at && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    conversation.status === 'archived' 
                      ? 'bg-blue-100 text-black-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {conversation.status === 'archived' 
                      ? 'Requested Live Chat' 
                      : `Waiting for agent • ${formatWaitingTime(conversation.requested_live_at)}`}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
}