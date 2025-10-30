
export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'url' | 'file' | 'note';
  content: string;
}

export interface Phase {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  checklist: ChecklistItem[];
  resources: Resource[];
}

export interface WorkflowData {
  phases: Phase[];
  currentPhase: string;
}
