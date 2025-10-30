
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkflowData } from '@/types/workflow';
import { initialWorkflowData } from '@/data/workflowData';

const STORAGE_KEY = '@workflow_data';

interface WorkflowContextType {
  workflowData: WorkflowData;
  setWorkflowData: (data: WorkflowData) => void;
  saveData: () => Promise<void>;
  loadData: () => Promise<void>;
  isLoading: boolean;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [workflowData, setWorkflowDataState] = useState<WorkflowData>(initialWorkflowData);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Auto-save whenever data changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [workflowData]);

  const loadData = async () => {
    try {
      console.log('Loading workflow data from storage...');
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const loadedData = JSON.parse(jsonValue);
        console.log('Data loaded successfully');
        setWorkflowDataState(loadedData);
      } else {
        console.log('No saved data found, using initial data');
      }
    } catch (error) {
      console.error('Error loading workflow data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = async () => {
    try {
      console.log('Saving workflow data to storage...');
      const jsonValue = JSON.stringify(workflowData);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving workflow data:', error);
    }
  };

  const setWorkflowData = (data: WorkflowData) => {
    console.log('Updating workflow data...');
    setWorkflowDataState(data);
  };

  return (
    <WorkflowContext.Provider
      value={{
        workflowData,
        setWorkflowData,
        saveData,
        loadData,
        isLoading,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
