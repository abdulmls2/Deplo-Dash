import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDomain } from '../context/DomainContext';
import { supabase } from '../lib/supabase';
import type { TrainingData } from '../types/trainingData';
import TrainingSection from '../components/domain/TrainingSection';
import { Database } from '../types/supabase';

export default function AgentData() {
  const { currentDomain } = useDomain();
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [newTrainingData, setNewTrainingData] = useState('');
  const [trainingSearchQuery, setTrainingSearchQuery] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);

  useEffect(() => {
    const fetchTrainingData = async () => {
      if (!currentDomain?.id) return;

      try {
        const { data, error } = await supabase
          .from('training_data')
          .select('*')
          .eq('domain_id', currentDomain.id);

        if (error) throw error;

        setTrainingData(data || []);
      } catch (error) {
        console.error('Error fetching training data:', error);
        toast.error('Failed to load training data');
      }
    };

    fetchTrainingData();
  }, [currentDomain?.id]);

  useEffect(() => {
    const fetchDomainSettings = async () => {
      if (!currentDomain?.id) return;

      try {
        const { data, error } = await supabase
          .from('domain_settings')
          .select('prompt')
          .eq('domain_id', currentDomain.id)
          .single();

        if (error) throw error;
        setPrompt(data.prompt);
      } catch (error) {
        console.error('Error fetching prompt:', error);
        toast.error('Failed to load prompt settings');
      }
    };

    fetchDomainSettings();
  }, [currentDomain?.id]);

  const handleAddTrainingData = async () => {
    if (!newTrainingData.trim() || !currentDomain?.id) {
      toast.error('Training data cannot be empty');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('training_data')
        .insert({
          content: newTrainingData.trim(),
          domain_id: currentDomain.id
        })
        .select()
        .single();

      if (error) throw error;

      setTrainingData([...trainingData, data]);
      setNewTrainingData('');
      toast.success('Training data added successfully');
    } catch (error) {
      console.error('Error adding training data:', error);
      toast.error('Failed to add training data');
    }
  };

  const handleDeleteTrainingData = async (id: number | string) => {
    try {
      const { error } = await supabase
        .from('training_data')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTrainingData(trainingData.filter(item => item.id !== id));
      toast.success('Training data removed successfully');
    } catch (error) {
      console.error('Error deleting training data:', error);
      toast.error('Failed to delete training data');
    }
  };

  const handleSavePrompt = async () => {
    if (!currentDomain?.id) return;

    try {
      const { error } = await supabase
        .from('domain_settings')
        .update({ prompt })
        .eq('domain_id', currentDomain.id);

      if (error) throw error;
      setIsEditingPrompt(false);
      toast.success('Prompt updated successfully');
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast.error('Failed to update prompt');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Agent Data</h1>
        <p className="text-gray-600">
          Train your AI agent with custom data to better understand your business
        </p>
      </div>

      <div className="space-y-8">
        {/* System Prompt Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">System Prompt</h2>
          <p className="text-gray-600 mb-4">
            Customize how your AI assistant behaves and responds to queries.
          </p>
          
          {isEditingPrompt ? (
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 p-3 border rounded-md"
                placeholder="Enter system prompt..."
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSavePrompt}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingPrompt(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md">
                {prompt}
              </pre>
              <button
                onClick={() => setIsEditingPrompt(true)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Edit Prompt
              </button>
            </div>
          )}
        </section>

        {/* Bot Training Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Bot Training</h2>
          <TrainingSection
            trainingData={trainingData}
            trainingSearchQuery={trainingSearchQuery}
            setTrainingSearchQuery={setTrainingSearchQuery}
            newTrainingData={newTrainingData}
            setNewTrainingData={setNewTrainingData}
            handleAddTrainingData={handleAddTrainingData}
            handleDeleteTrainingData={handleDeleteTrainingData}
          />
        </section>
      </div>
    </div>
  );
} 