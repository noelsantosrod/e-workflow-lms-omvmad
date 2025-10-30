
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { initialWorkflowData } from '@/data/workflowData';
import { WorkflowData } from '@/types/workflow';
import PhaseScreen from '@/components/PhaseScreen';

export default function PreProductionScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [workflowData, setWorkflowData] = useState<WorkflowData>(initialWorkflowData);

  const phase = workflowData.phases[0]; // Pre-production phase

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Pre-producción',
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
