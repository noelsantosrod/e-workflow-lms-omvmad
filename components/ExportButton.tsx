
import React from 'react';
import { Pressable, Alert, Platform, Share } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { useWorkflow } from '@/contexts/WorkflowContext';
import * as Haptics from 'expo-haptics';

export default function ExportButton() {
  const { workflowData } = useWorkflow();

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
          text: 'Notion (Markdown)',
          onPress: () => exportToNotion(),
        },
        {
          text: 'Google Sheets (CSV)',
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
    
    // Generate Notion-compatible markdown with better formatting
    let notionContent = '# 📚 Sistema de Flujo E-Learning\n\n';
    notionContent += '> Dashboard de gestión de proyectos de e-learning\n\n';
    notionContent += '---\n\n';
    
    // Calculate overall progress
    let totalTasks = 0;
    let completedTasks = 0;
    workflowData.phases.forEach(phase => {
      totalTasks += phase.checklist.length;
      completedTasks += phase.checklist.filter(item => item.completed).length;
    });
    const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    notionContent += `## 📊 Progreso Global: ${overallProgress}%\n\n`;
    notionContent += `**Tareas completadas:** ${completedTasks} / ${totalTasks}\n\n`;
    notionContent += '---\n\n';
    
    workflowData.phases.forEach((phase, index) => {
      const phaseProgress = phase.checklist.length > 0 
        ? Math.round((phase.checklist.filter(i => i.completed).length / phase.checklist.length) * 100)
        : 0;
      
      notionContent += `## ${index + 1}. ${phase.name} (${phaseProgress}%)\n\n`;
      notionContent += `*${phase.description}*\n\n`;
      
      notionContent += '### ✅ Tareas\n\n';
      phase.checklist.forEach(item => {
        const checkbox = item.completed ? '- [x]' : '- [ ]';
        notionContent += `${checkbox} ${item.title}\n`;
      });
      notionContent += '\n';
      
      if (phase.resources.length > 0) {
        notionContent += '### 📎 Recursos\n\n';
        phase.resources.forEach(resource => {
          const icon = resource.type === 'url' ? '🔗' : resource.type === 'file' ? '📄' : '📝';
          notionContent += `${icon} **${resource.title}**\n`;
          notionContent += `   - Tipo: ${resource.type}\n`;
          notionContent += `   - Contenido: ${resource.content}\n\n`;
        });
      }
      
      notionContent += '---\n\n';
    });

    notionContent += `\n*Exportado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}*\n`;

    // Share or copy the content
    if (Platform.OS === 'web') {
      // For web, copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(notionContent);
        Alert.alert(
          '✅ Copiado al portapapeles',
          'El contenido en formato Notion (Markdown) ha sido copiado. Pégalo en una página de Notion.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Exportar a Notion',
          'Contenido generado. Copia manualmente:\n\n' + notionContent.substring(0, 200) + '...',
          [{ text: 'OK' }]
        );
      }
    } else {
      // For mobile, use Share API
      Share.share({
        message: notionContent,
        title: 'Exportar a Notion',
      }).catch(error => {
        console.error('Error sharing:', error);
        Alert.alert('Error', 'No se pudo compartir el contenido');
      });
    }
    
    console.log('Notion export content:', notionContent);
  };

  const exportToGoogleSheets = () => {
    console.log('Exporting to Google Sheets...');
    
    // Generate CSV format with proper escaping
    let csvContent = 'Fase,Tarea,Estado,Progreso,Tipo Recurso,Nombre Recurso,Contenido Recurso\n';
    
    workflowData.phases.forEach(phase => {
      const phaseProgress = phase.checklist.length > 0 
        ? Math.round((phase.checklist.filter(i => i.completed).length / phase.checklist.length) * 100)
        : 0;
      
      // Add tasks
      phase.checklist.forEach(item => {
        const escapedTitle = `"${item.title.replace(/"/g, '""')}"`;
        csvContent += `"${phase.name}",${escapedTitle},"${item.completed ? 'Completado' : 'Pendiente'}","${phaseProgress}%","","",""\n`;
      });
      
      // Add resources
      phase.resources.forEach(resource => {
        const escapedTitle = `"${resource.title.replace(/"/g, '""')}"`;
        const escapedContent = `"${resource.content.replace(/"/g, '""')}"`;
        csvContent += `"${phase.name}","","","","${resource.type}",${escapedTitle},${escapedContent}\n`;
      });
    });

    // Share or download the CSV
    if (Platform.OS === 'web') {
      // For web, trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `workflow_${new Date().getTime()}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      Alert.alert(
        '✅ Archivo descargado',
        'El archivo CSV ha sido descargado. Ábrelo con Google Sheets.',
        [{ text: 'OK' }]
      );
    } else {
      // For mobile, use Share API
      Share.share({
        message: csvContent,
        title: 'Exportar a Google Sheets (CSV)',
      }).catch(error => {
        console.error('Error sharing:', error);
        Alert.alert('Error', 'No se pudo compartir el contenido');
      });
    }
    
    console.log('CSV export content:', csvContent);
  };

  const exportToJSON = () => {
    console.log('Exporting to JSON...');
    
    const jsonData = JSON.stringify(workflowData, null, 2);
    
    // Share or download the JSON
    if (Platform.OS === 'web') {
      // For web, trigger download
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `workflow_${new Date().getTime()}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      Alert.alert(
        '✅ Archivo descargado',
        'El archivo JSON ha sido descargado.',
        [{ text: 'OK' }]
      );
    } else {
      // For mobile, use Share API
      Share.share({
        message: jsonData,
        title: 'Exportar JSON',
      }).catch(error => {
        console.error('Error sharing:', error);
        Alert.alert('Error', 'No se pudo compartir el contenido');
      });
    }
    
    console.log('JSON export:', jsonData);
  };

  return (
    <Pressable onPress={handleExport} style={{ padding: 8 }}>
      <IconSymbol name="square.and.arrow.up" size={22} color="#007BFF" />
    </Pressable>
  );
}
