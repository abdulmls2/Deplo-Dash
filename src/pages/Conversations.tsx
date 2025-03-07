import React, { useState, useRef } from 'react';
import {Hourglass, MessageCircleOff, Check, Mail, Clock, ChevronDown, Star, Trash2, Eye, EyeOff, Tag as TagIcon, ArrowUpDown, Archive, Bot, UserRound, ThumbsUp, ThumbsDown } from 'lucide-react';
import ConversationList from '../components/conversations/ConversationList';
import MessageList from '../components/conversations/MessageList';
import MessageInput from '../components/conversations/MessageInput';
import TagSelector from '../components/conversations/TagSelector';
import ConversationDetails from '../components/conversations/ConversationDetails';
import { useClickOutside } from '../hooks/useClickOutside';
import { useConversationStore } from '../lib/store/conversationStore';
import { toast } from 'react-hot-toast';
import TagManager from '../components/conversations/TagManager';

const initialFilters = [
  { 
    icon: Mail, 
    label: 'Active', 
    id: 'active', 
    activeColor: 'bg-[#EFF6FF] text-blue-600',
    inactiveColor: 'bg-white text-[#000000] hover:bg-gray-50'
  },
  { 
    icon: Clock, 
    label: 'Urgent', 
    id: 'urgent', 
    activeColor: 'bg-[#EFF6FF] text-blue-600',
    inactiveColor: 'bg-white text-[#000000] hover:bg-gray-50'
  },
  { 
    icon: MessageCircleOff, 
    label: 'Closed', 
    id: 'closed', 
    activeColor: 'bg-[#EFF6FF] text-blue-600',
    inactiveColor: 'bg-white text-[#000000] hover:bg-gray-50'
  },
  { 
    icon: Mail, 
    label: 'All', 
    id: 'all', 
    activeColor: 'bg-[#EFF6FF] text-blue-600',
    inactiveColor: 'bg-white text-[#000000] hover:bg-gray-50'
  },
];

export default function Conversations() {
  const [showTagManager, setShowTagManager] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showRatingMenu, setShowRatingMenu] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const { 
    updateConversation, 
    currentConversation, 
    messages,
    setSortOrder, 
    setActiveFilter,
    activeFilter,
    toggleLiveMode,
    ratingFilter,
    setRatingFilter 
  } = useConversationStore();

  // Refs for dropdown menus
  const tagManagerRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const ratingMenuRef = useRef<HTMLDivElement>(null);

  // Use click outside hook
  useClickOutside(tagManagerRef, () => setShowTagManager(false));
  useClickOutside(sortMenuRef, () => setShowSortMenu(false));
  useClickOutside(ratingMenuRef, () => setShowRatingMenu(false));

  const handleDeleteConversation = async () => {
    if (!selectedConversationId) return;
    
    // Simple confirmation dialog
    if (!window.confirm('Delete this conversation?')) {
      return;
    }

    try {
      await updateConversation(selectedConversationId, { status: 'deleted' });
      setSelectedConversationId(null);
      toast.success('Conversation deleted successfully');
    } catch (error) {
      toast.error('Failed to delete conversation');
    }
  };

  const handleReadToggle = async () => {
    if (!selectedConversationId || !currentConversation) return;
    try {
      await updateConversation(selectedConversationId, { 
        is_read: !currentConversation.is_read 
      });
    } catch (error) {
      toast.error('Failed to update conversation');
    }
  };

  const handleStarToggle = async () => {
    if (!selectedConversationId || !currentConversation) return;
    try {
      // Explicitly handle the status toggle
      const currentStatus = currentConversation.status || 'active'; // default to 'active' if undefined
      const newStatus = currentStatus === 'archived' ? 'active' : 'archived';
      
      await updateConversation(selectedConversationId, { 
        status: newStatus
      });
      toast.success(newStatus === 'archived' ? 'Conversation archived' : 'Conversation restored');
    } catch (error) {
      toast.error('Failed to update conversation');
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Panel */}
      <div className="w-[445px] border-r border-gray-200 flex flex-col bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2 mb-4 items-center justify-start">
            {initialFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as 'active' | 'all' | 'urgent' | 'closed')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium 
                  transition-all duration-200 border-2
                  ${
                    activeFilter === filter.id 
                      ? filter.activeColor 
                      : filter.inactiveColor
                  }
                  ${
                    activeFilter === filter.id 
                      ? 'scale-105 transform' 
                      : 'opacity-90'
                  }
                `}
              >
                <filter.icon className="h-3.5 w-3.5" />
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1" ref={tagManagerRef}>
              <button
                onClick={() => setShowTagManager(!showTagManager)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50 w-full"
              >
                <TagIcon className="h-3.5 w-3.5 text-gray-500" />
                <span>Tags</span>
                <ChevronDown className="h-3.5 w-3.5 ml-auto text-gray-400" />
              </button>

              {showTagManager && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 w-80">
                  <TagManager />
                </div>
              )}
            </div>

            <div className="relative" ref={sortMenuRef}>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-gray-500" />
                <span>Sort</span>
                <ChevronDown className="h-3.5 w-3.5 ml-1 text-gray-400" />
              </button>

              {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px] whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSortOrder('newest');
                      setShowSortMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 whitespace-nowrap"
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder('oldest');
                      setShowSortMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 whitespace-nowrap"
                  >
                    Oldest First
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={ratingMenuRef}>
              <button
                onClick={() => setShowRatingMenu(!showRatingMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50"
              >
                <ThumbsUp className="h-3.5 w-3.5 text-gray-500" />
                <span>Rating</span>
                <ChevronDown className="h-3.5 w-3.5 ml-1 text-gray-400" />
              </button>

              {showRatingMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px] whitespace-nowrap">
                  <button
                    onClick={() => {
                      setRatingFilter('all');
                      setShowRatingMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 whitespace-nowrap ${
                      ratingFilter === 'all' ? 'bg-gray-100' : ''
                    }`}
                  >
                    All Ratings
                  </button>
                  <button
                    onClick={() => {
                      setRatingFilter('good');
                      setShowRatingMenu(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 ${
                      ratingFilter === 'good' ? 'bg-gray-100' : ''
                    }`}
                  >
                    <ThumbsUp className="h-3 w-3 text-green-600" />
                    <span>Good</span>
                  </button>
                  <button
                    onClick={() => {
                      setRatingFilter('ok');
                      setShowRatingMenu(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 ${
                      ratingFilter === 'ok' ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className="text-yellow-600">OK</span>
                  </button>
                  <button
                    onClick={() => {
                      setRatingFilter('bad');
                      setShowRatingMenu(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 ${
                      ratingFilter === 'bad' ? 'bg-gray-100' : ''
                    }`}
                  >
                    <ThumbsDown className="h-3 w-3 text-red-600" />
                    <span>Bad</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <ConversationList
          onSelectConversation={setSelectedConversationId}
          selectedId={selectedConversationId}
        />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                  {currentConversation?.title || 'New Conversation'}
                </h1>
                <div className="flex items-center gap-3">
                  {currentConversation && (
                    <div className="flex items-center space-x-2">
                      <ConversationDetails
                        createdAt={currentConversation.created_at}
                        updatedAt={currentConversation.last_message_at}
                        messages={messages}
                        rating={currentConversation.rating}
                      />
                    </div>
                  )}
                  <div className="relative inline-flex items-center gap-1 p-1 bg-gray-200 rounded-lg" title={currentConversation?.live_mode ? 'Switch to bot mode' : 'Switch to live mode'}>
                    <button
                      onClick={() => selectedConversationId && toggleLiveMode(selectedConversationId)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all duration-200 ${
                        !currentConversation?.live_mode 
                          ? 'bg-white text-gray-900 font-semibold shadow-md ring-2 ring-gray-900/5 scale-105' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Bot className="h-4 w-4" />
                      <span className="text-xs font-medium">Bot</span>
                    </button>
                    <button
                      onClick={() => selectedConversationId && toggleLiveMode(selectedConversationId)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded transition-all duration-200 ${
                        currentConversation?.live_mode 
                          ? 'bg-white text-green-700 font-semibold shadow-md ring-2 ring-green-600/20 scale-105' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <UserRound className="h-4 w-4" />
                      <span className="text-xs font-medium">Live</span>
                    </button>
                  </div>
                  <button
                    onClick={handleReadToggle}
                    className={`p-2 rounded-lg hover:bg-gray-100 ${
                      currentConversation?.is_read ? 'text-gray-400' : 'text-blue-500'
                    }`}
                    title={currentConversation?.is_read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {currentConversation?.is_read ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={handleStarToggle}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title={currentConversation?.status === 'archived' ? 'Restore conversation' : 'Archive conversation'}
                  >
                    {currentConversation?.status === 'archived' ? (
                      <Mail className="h-5 w-5 text-gray-600" />
                    ) : (
                      <Archive className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={handleDeleteConversation}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <TagSelector conversationId={selectedConversationId} />
            </div>
            <MessageList conversationId={selectedConversationId} />
            <MessageInput conversationId={selectedConversationId} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}