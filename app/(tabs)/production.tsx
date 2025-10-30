
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useWorkflow } from '@/contexts/WorkflowContext';
import PhaseScreen from '@/components/PhaseScreen';

export default function ProductionScreen() {
  const { workflowData, saveData } = useWorkflow();
  const phase = workflowData.phases[1]; // Production phase

  // Save data when leaving the screen
  useEffect(() => {
    return () => {
      console.log('Production screen unmounting, saving data...');
      saveData();
    };
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Producción',
        }}
      />
      <PhaseScreen phase={phase} />
    </>
  );
}
