import React from 'react';
import { Globe, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useDomain } from '../../context/DomainContext';

interface DomainHeaderProps {
  isEditing: boolean;
  domainName: string;
  setDomainName: (name: string) => void;
  handleDomainSave: () => void;
  setIsEditing: (editing: boolean) => void;
  currentDomain?: { name: string; id: string } | null;
}

export default function DomainHeader({
  isEditing,
  domainName,
  setDomainName,
  handleDomainSave,
  setIsEditing,
  currentDomain
}: DomainHeaderProps) {
  const { domains, setCurrentDomain } = useDomain();

  const handleDeleteDomain = async () => {
    if (!currentDomain?.id) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this domain? This will also delete all associated data including FAQs, settings, and training data. This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      // Delete related data first
      const { error: tagsError } = await supabase
        .from('tags')
        .delete()
        .eq('domain_id', currentDomain.id);

      if (tagsError) throw tagsError;

      const { error: faqsError } = await supabase
        .from('faqs')
        .delete()
        .eq('domain_id', currentDomain.id);

      if (faqsError) throw faqsError;

      const { error: settingsError } = await supabase
        .from('domain_settings')
        .delete()
        .eq('domain_id', currentDomain.id);

      if (settingsError) throw settingsError;

      const { error: trainingDataError } = await supabase
        .from('training_data')
        .delete()
        .eq('domain_id', currentDomain.id);

      if (trainingDataError) throw trainingDataError;

      // Finally delete the domain
      const { error: domainError } = await supabase
        .from('domains')
        .delete()
        .eq('id', currentDomain.id);

      if (domainError) throw domainError;

      // If there are other domains, switch to the first one
      const remainingDomains = domains.filter(d => d.id !== currentDomain.id);
      if (remainingDomains.length > 0) {
        setCurrentDomain(remainingDomains[0]);
      }

      // Instead of navigation, we'll rely on the context update to trigger UI changes
    } catch (error) {
      console.error('Error deleting domain:', error);
      alert('Failed to delete domain');
    }
  };

  return (
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold mb-4">Domain Name</h3>
      <div className="flex items-center gap-3">
        <Globe className="h-5 w-5 text-gray-500 flex-shrink-0" />
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter domain name"
            />
            <div className="flex gap-2">
              <button
                onClick={handleDomainSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setDomainName(currentDomain?.name || '');
                  setIsEditing(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <span className="font-medium text-gray-700">{domainName}</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-orange-500 hover:text-orange-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteDomain}
                className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete Domain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}