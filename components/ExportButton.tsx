
import React from 'react';
import { Pressable, Alert, Platform } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { WorkflowData } from '@/types/workflow';
import * as Haptics from 'expo-haptics';

interface ExportButtonProps {
  workflowData: WorkflowData;
}

export default function ExportButton({ workflowData }: ExportButtonProps) {
  const handleExport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      'Exportar Datos',
      'Selecciona el formato de exportación:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Notion',
          onPress: () => exportToNotion(),
        },
        {
          text: 'Google Sheets',
          onPress: () => exportToGoogleSheets(),
        },
        {
          text: 'JSON',
          onPress: () => exportToJSON(),
        },
      ]
    );
  };

  const exportToNotion = () => {
    console.log('Exporting to Notion...');
    
    // Generate Notion-compatible markdown
    let notionContent = '# Sistema de Flujo E-Learning\n\n';
    
    workflowData.phases.forEach(phase => {
      notionContent += `## ${phase.name}\n`;
      notionContent += `${phase.description}\n\n`;
      
      notionContent += '### Tareas\n';
      phase.checklist.forEach(item => {
        const checkbox = item.completed ? '[x]' : '[ ]';
        notionContent += `- ${checkbox} ${item.title}\n`;
      });
      
      if (phase.resources.length > 0) {
        notionContent += '\n### Recursos\n';
        phase.resources.forEach(resource => {
          notionContent += `- ${resource.title} (${resource.type}): ${resource.content}\n`;
        });
      }
      
      notionContent += '\n---\n\n';
    });

    Alert.alert(
      'Exportar a Notion',
      'Copia este contenido y pégalo en una página de Notion:\n\n' + notionContent.substring(0, 200) + '...',
      [
        { text: 'OK' },
      ]
    );
    
    console.log('Notion export content:', notionContent);
  };

  const exportToGoogleSheets = () => {
    console.log('Exporting to Google Sheets...');
    
    // Generate CSV format
    let csvContent = 'Fase,Tarea,Estado,Tipo Recurso,Recurso\n';
    
    workflowData.phases.forEach(phase => {
      phase.checklist.forEach(item => {
        csvContent += `"${phase.name}","${item.title}","${item.completed ? 'Completado' : 'Pendiente'}","",""\n`;
      });
      
      phase.resources.forEach(resource => {
        csvContent += `"${phase.name}","","","${resource.type}","${resource.title}"\n`;
      });
    });

    Alert.alert(
      'Exportar a Google Sheets',
      'Los datos están listos para exportar. En una aplicación real, esto abriría Google Sheets o descargaría un archivo CSV.',
      [
        { text: 'OK' },
      ]
    );
    
    console.log('CSV export content:', csvContent);
  };

  const exportToJSON = () => {
    console.log('Exporting to JSON...');
    
    const jsonData = JSON.stringify(workflowData, null, 2);
    
    Alert.alert(
      'Exportar JSON',
      'Datos exportados exitosamente. En una aplicación real, esto descargaría un archivo JSON.',
      [
        { text: 'OK' },
      ]
    );
    
    console.log('JSON export:', jsonData);
  };

  return (
    <Pressable onPress={handleExport} style={{ padding: 8 }}>
      <IconSymbol name="square.and.arrow.up" size={22} color="#007BFF" />
    </Pressable>
  );
}
