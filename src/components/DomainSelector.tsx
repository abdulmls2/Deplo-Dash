import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useDomain } from '../context/DomainContext';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function DomainSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentDomain, setCurrentDomain, domains, isLoading } = useDomain();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newDomainName, setNewDomainName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateDomain = async () => {
    if (!newDomainName.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // First create the domain
      const { data: newDomain, error: domainError } = await supabase
        .from('domains')
        .insert({
          name: newDomainName.trim(),
          profile_id: user.id
        })
        .select()
        .single();

      if (domainError) throw domainError;

      // Then create default domain settings
      const { error: settingsError } = await supabase
        .from('domain_settings')
        .insert({
          domain_id: newDomain.id,
          chatbot_name: 'Friendly Assistant',
          greeting_message: '👋 Hi there! How can I help you today?',
          primary_color: '#FF6B00',
          header_text_color: '#000000'
        });

      if (settingsError) throw settingsError;

      setCurrentDomain(newDomain);
      setNewDomainName('');
      setIsCreating(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating domain:', error);
      toast.error('Failed to create domain');
    }
  };

  if (isLoading) {
    return (
      <div className="h-9 w-40 bg-gray-100 animate-pulse rounded-lg"></div>
    );
  }

  if (!currentDomain || domains.length === 0) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 rounded-lg">
        No domains available
      </div>
    );
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="font-medium">{currentDomain.name}</span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
          isOpen ? 'transform rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {isCreating ? (
              <div className="px-4 py-2">
                <input
                  type="text"
                  value={newDomainName}
                  onChange={(e) => setNewDomainName(e.target.value)}
                  placeholder="Enter domain name"
                  className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateDomain();
                    if (e.key === 'Escape') setIsCreating(false);
                  }}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleCreateDomain}
                    className="flex-1 px-2 py-1 text-xs text-white bg-orange-500 rounded hover:bg-orange-600"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="flex-1 px-2 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-orange-600 hover:bg-orange-50"
              >
                <Plus className="h-4 w-4" />
                Create New Domain
              </button>
            )}

            <div className="my-1 border-t border-gray-100" />

            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => {
                  setCurrentDomain(domain);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 ${
                  currentDomain.id === domain.id ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                }`}
              >
                {domain.icon && <span>{domain.icon}</span>}
                {domain.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}