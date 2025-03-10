import React, { useState } from 'react';
import { Send, Paperclip, MessageSquare, RefreshCw, X } from 'lucide-react';

interface ChatbotPreviewProps {
  chatbotName: string;
  greetingMessage: string;
  color: string;
  domainName: string;
  headerTextColor: string;
  agentMessageColor: string;
  userMessageColor: string;
  agentMessageTextColor: string;
  userMessageTextColor: string;
}

export default function ChatbotPreview({ 
  chatbotName, 
  greetingMessage, 
  color,
  domainName,
  headerTextColor,
  agentMessageColor,
  userMessageColor,
  agentMessageTextColor,
  userMessageTextColor
}: ChatbotPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [message, setMessage] = useState('');

  const buttonStyle = {
    backgroundColor: color,
  };

  const indicatorStyle = {
    backgroundColor: color,
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {isExpanded && (
        <div className="mb-4 w-[380px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex items-center gap-3" style={{ backgroundColor: color }}>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={indicatorStyle}></div>
            </div>
            <div>
              <h3 className="font-medium" style={{ color: headerTextColor }}>{chatbotName}</h3>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800" title="Back to History">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800" title="Refresh Chat">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800" title="Close Chat">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-[380px] overflow-y-auto p-4 bg-gray-50">
            <div className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                🤖
              </div>
              <div className="p-3 rounded-lg shadow-sm max-w-[80%]" style={{ backgroundColor: agentMessageColor }}>
                <p className="text-sm" style={{ color: agentMessageTextColor }}>{greetingMessage}</p>
                <span className="text-xs mt-1 block opacity-75" style={{ color: agentMessageTextColor }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Default User Message */}
            <div className="flex gap-2 mb-4 justify-end">
              <div className="p-3 rounded-lg shadow-sm max-w-[80%]" style={{ backgroundColor: userMessageColor }}>
                <p className="text-sm" style={{ color: userMessageTextColor }}>Hi! I have a question about your services.</p>
                <span className="text-xs mt-1 block opacity-75" style={{ color: userMessageTextColor }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                  <Paperclip className="h-5 w-5" />
                </button>
              </div>
              <button 
                className="p-2 rounded-full text-white flex items-center justify-center"
                style={buttonStyle}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center mt-2">
              <a href="https://dashboard.ai" className="text-sm text-gray-600 hover:text-gray-700">Powered by Dashboard.ai</a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className="w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg"
        style={buttonStyle}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '×' : '💬'}
      </button>
    </div>
  );
}