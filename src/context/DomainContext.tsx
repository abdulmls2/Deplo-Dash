import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Domain {
  id: string;
  name: string;
  icon?: string;
}

interface DomainContextType {
  currentDomain: Domain | null;
  setCurrentDomain: (domain: Domain) => void;
  updateDomainName: (name: string) => void;
  domains: Domain[];
  isLoading: boolean;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [currentDomain, _setCurrentDomain] = useState<Domain | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: domains, error } = await supabase
          .from('domains')
          .select('*')
          .eq('profile_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;

        setDomains(domains || []);
        
        // Set the first domain as current if none is selected
        if (domains && domains.length > 0 && !currentDomain) {
          const savedDomainId = localStorage.getItem('selectedDomainId');
          const savedDomain = savedDomainId 
            ? domains.find(d => d.id === savedDomainId)
            : domains[0];
          _setCurrentDomain(savedDomain || domains[0]);
        }
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, []);

  useEffect(() => {
    if (currentDomain) {
      localStorage.setItem('selectedDomainId', currentDomain.id);
    }
  }, [currentDomain]);

  const updateDomainName = async (name: string) => {
    if (!currentDomain) return;

    try {
      const { error } = await supabase
        .from('domains')
        .update({ name, updated_at: new Date().toISOString() })
        .eq('id', currentDomain.id);

      if (error) throw error;

      _setCurrentDomain(prev => prev ? { ...prev, name } : null);
      setDomains(prev => 
        prev.map(domain => 
          domain.id === currentDomain.id 
            ? { ...domain, name }
            : domain
        )
      );
    } catch (error) {
      console.error('Error updating domain name:', error);
    }
  };

  const setCurrentDomain = (domain: Domain) => {
    // Update the current domain
    _setCurrentDomain(domain);
    
    // If this is a new domain, add it to the domains list if it's not already there
    setDomains(prev => {
      if (!prev.find(d => d.id === domain.id)) {
        return [...prev, domain];
      }
      return prev;
    });
  };

  return (
    <DomainContext.Provider value={{ 
      currentDomain, 
      setCurrentDomain,
      updateDomainName,
      domains,
      isLoading
    }}>
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain() {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error('useDomain must be used within a DomainProvider');
  }
  return context;
}