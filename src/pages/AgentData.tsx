import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDomain } from '../context/DomainContext';
import { supabase } from '../lib/supabase';
import type { TrainingData } from '../types/trainingData';
import TrainingSection from '../components/domain/TrainingSection';

export default function AgentData() {
  const { currentDomain } = useDomain();
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [newTrainingData, setNewTrainingData] = useState('');
  const [trainingSearchQuery, setTrainingSearchQuery] = useState('');

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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Agent Data</h1>
        <p className="text-gray-600">
          Train your AI agent with custom data to better understand your business
        </p>
      </div>

      <div className="space-y-8">
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