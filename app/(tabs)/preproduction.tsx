
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useWorkflow } from '@/contexts/WorkflowContext';
import PhaseScreen from '@/components/PhaseScreen';

export default function PreProductionScreen() {
  const { workflowData, saveData } = useWorkflow();
  const phase = workflowData.phases[0]; // Pre-production phase

  // Save data when leaving the screen
  useEffect(() => {
    return () => {
      console.log('Pre-production screen unmounting, saving data...');
      saveData();
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Pre-producción',
        }}
      />
      <PhaseScreen phase={phase} />
    </>
  );
}
