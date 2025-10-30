
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { initialWorkflowData } from '@/data/workflowData';
import { WorkflowData } from '@/types/workflow';
import PhaseScreen from '@/components/PhaseScreen';

export default function PostProductionScreen() {
  const [workflowData, setWorkflowData] = useState<WorkflowData>(initialWorkflowData);

  const phase = workflowData.phases[2]; // Post-production phase

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Post-producción',
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
