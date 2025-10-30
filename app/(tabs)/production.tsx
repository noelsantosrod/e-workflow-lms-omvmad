
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { initialWorkflowData } from '@/data/workflowData';
import { WorkflowData } from '@/types/workflow';
import PhaseScreen from '@/components/PhaseScreen';

export default function ProductionScreen() {
  const [workflowData, setWorkflowData] = useState<WorkflowData>(initialWorkflowData);

  const phase = workflowData.phases[1]; // Production phase

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Producción',
        }}
      />
      <PhaseScreen
        phase={phase}
        workflowData={workflowData}
        setWorkflowData={setWorkflowData}
      />
    </>
  );
}
