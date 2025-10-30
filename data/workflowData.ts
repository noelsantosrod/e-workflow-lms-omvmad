
import { WorkflowData } from '@/types/workflow';

export const initialWorkflowData: WorkflowData = {
  currentPhase: 'pre-production',
  phases: [
    {
      id: 'pre-production',
      name: 'Pre-producción',
      description: 'Planificación y preparación del curso',
      icon: 'doc.text.fill',
      color: '#007BFF',
      checklist: [
        { id: 'pp1', title: 'Definir objetivos de aprendizaje', completed: false },
        { id: 'pp2', title: 'Crear guión del curso', completed: false },
        { id: 'pp3', title: 'Desarrollar storyboard', completed: false },
        { id: 'pp4', title: 'Planificar recursos necesarios', completed: false },
        { id: 'pp5', title: 'Revisar contenido con expertos', completed: false },
        { id: 'pp6', title: 'Aprobar estructura del curso', completed: false },
      ],
      resources: [],
    },
    {
      id: 'production',
      name: 'Producción',
      description: 'Desarrollo en Articulate Storyline',
      icon: 'hammer.fill',
      color: '#28A745',
      checklist: [
        { id: 'pr1', title: 'Configurar proyecto en Storyline', completed: false },
        { id: 'pr2', title: 'Crear escenas principales', completed: false },
        { id: 'pr3', title: 'Diseñar interacciones', completed: false },
        { id: 'pr4', title: 'Agregar triggers y variables', completed: false },
        { id: 'pr5', title: 'Incorporar animaciones', completed: false },
        { id: 'pr6', title: 'Añadir audio y narración', completed: false },
        { id: 'pr7', title: 'Implementar evaluaciones', completed: false },
        { id: 'pr8', title: 'Revisión interna del curso', completed: false },
      ],
      resources: [],
    },
    {
      id: 'post-production',
      name: 'Post-producción',
      description: 'Publicación y mejora continua',
      icon: 'checkmark.seal.fill',
      color: '#FFC107',
      checklist: [
        { id: 'po1', title: 'Exportar paquete SCORM', completed: false },
        { id: 'po2', title: 'Subir curso al LMS', completed: false },
        { id: 'po3', title: 'Realizar pruebas en LMS', completed: false },
        { id: 'po4', title: 'Recopilar feedback de usuarios', completed: false },
        { id: 'po5', title: 'Analizar métricas de uso', completed: false },
        { id: 'po6', title: 'Implementar mejoras', completed: false },
        { id: 'po7', title: 'Documentar lecciones aprendidas', completed: false },
      ],
      resources: [],
    },
  ],
};
