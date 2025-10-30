
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useWorkflow } from '@/contexts/WorkflowContext';
import PhaseScreen from '@/components/PhaseScreen';

export default function PostProductionScreen() {
  const { workflowData, saveData } = useWorkflow();
  const phase = workflowData.phases[2]; // Post-production phase

  // Save data when leaving the screen
  useEffect(() => {
    return () => {
      console.log('Post-production screen unmounting, saving data...');
      saveData();
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Post-producción',
        }}
      />
      <PhaseScreen phase={phase} />
    </>
  );
}
