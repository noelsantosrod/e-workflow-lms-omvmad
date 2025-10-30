
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useColorScheme, Platform, Alert } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Phase, WorkflowData } from '@/types/workflow';
import ChecklistComponent from '@/components/ChecklistComponent';
import ResourceList from '@/components/ResourceList';
import ViewSwitcher from '@/components/ViewSwitcher';
import * as Haptics from 'expo-haptics';

interface PhaseScreenProps {
  phase: Phase;
  workflowData: WorkflowData;
  setWorkflowData: (data: WorkflowData) => void;
}

export default function PhaseScreen({ phase, workflowData, setWorkflowData }: PhaseScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [currentView, setCurrentView] = useState<'checklist' | 'kanban' | 'timeline'>('checklist');

  const bgColor = isDark ? '#1C1C1E' : colors.background;
  const cardColor = isDark ? '#2C2C2E' : colors.card;
  const textColor = isDark ? '#FFFFFF' : colors.text;
  const textSecondaryColor = isDark ? '#98989D' : colors.textSecondary;

  const handleToggleTask = (taskId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const updatedPhases = workflowData.phases.map(p => {
      if (p.id === phase.id) {
        return {
          ...p,
          checklist: p.checklist.map(item =>
            item.id === taskId ? { ...item, completed: !item.completed } : item
          ),
        };
      }
      return p;
    });

    setWorkflowData({ ...workflowData, phases: updatedPhases });
  };

  const handleAddResource = (type: 'url' | 'file' | 'note') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.prompt(
      'Añadir Recurso',
      `Ingresa el ${type === 'url' ? 'URL' : type === 'file' ? 'nombre del archivo' : 'nota'}:`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Añadir',
          onPress: (value) => {
            if (value && value.trim()) {
              const newResource = {
                id: Date.now().toString(),
                title: value.trim(),
                type,
                content: value.trim(),
              };

              const updatedPhases = workflowData.phases.map(p => {
                if (p.id === phase.id) {
                  return {
                    ...p,
                    resources: [...p.resources, newResource],
                  };
                }
                return p;
              });

              setWorkflowData({ ...workflowData, phases: updatedPhases });
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleDeleteResource = (resourceId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    
    const updatedPhases = workflowData.phases.map(p => {
      if (p.id === phase.id) {
        return {
          ...p,
          resources: p.resources.filter(r => r.id !== resourceId),
        };
      }
      return p;
    });

    setWorkflowData({ ...workflowData, phases: updatedPhases });
  };

  const calculateProgress = () => {
    const total = phase.checklist.length;
    const completed = phase.checklist.filter(item => item.completed).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const progress = calculateProgress();

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Phase Header */}
        <View style={[styles.headerCard, { backgroundColor: cardColor }]}>
          <View style={[styles.phaseIconLarge, { backgroundColor: phase.color + '20' }]}>
            <IconSymbol name={phase.icon as any} size={40} color={phase.color} />
          </View>
          <Text style={[styles.phaseTitle, { color: textColor }]}>{phase.name}</Text>
          <Text style={[styles.phaseDescription, { color: textSecondaryColor }]}>
            {phase.description}
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressLabel, { color: textColor }]}>Progreso</Text>
              <Text style={[styles.progressPercentage, { color: phase.color }]}>
                {progress}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: phase.color, width: `${progress}%` }
                ]}
              />
            </View>
          </View>
        </View>

        {/* View Switcher */}
        <ViewSwitcher
          currentView={currentView}
          onViewChange={setCurrentView}
          isDark={isDark}
        />

        {/* Content based on current view */}
        {currentView === 'checklist' && (
          <ChecklistComponent
            checklist={phase.checklist}
            onToggle={handleToggleTask}
            phaseColor={phase.color}
            isDark={isDark}
          />
        )}

        {currentView === 'kanban' && (
          <View style={[styles.viewContainer, { backgroundColor: cardColor }]}>
            <Text style={[styles.viewTitle, { color: textColor }]}>Vista Kanban</Text>
            <View style={styles.kanbanContainer}>
              <View style={styles.kanbanColumn}>
                <Text style={[styles.kanbanColumnTitle, { color: textColor }]}>
                  Por Hacer
                </Text>
                {phase.checklist.filter(item => !item.completed).map(item => (
                  <Pressable
                    key={item.id}
                    style={[styles.kanbanCard, { backgroundColor: isDark ? '#3A3A3C' : '#F5F5F5' }]}
                    onPress={() => handleToggleTask(item.id)}
                  >
                    <Text style={[styles.kanbanCardText, { color: textColor }]}>
                      {item.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.kanbanColumn}>
                <Text style={[styles.kanbanColumnTitle, { color: textColor }]}>
                  Completado
                </Text>
                {phase.checklist.filter(item => item.completed).map(item => (
                  <Pressable
                    key={item.id}
                    style={[styles.kanbanCard, { backgroundColor: phase.color + '20' }]}
                    onPress={() => handleToggleTask(item.id)}
                  >
                    <IconSymbol name="checkmark.circle.fill" size={16} color={phase.color} />
                    <Text style={[styles.kanbanCardText, { color: textColor, marginLeft: 8 }]}>
                      {item.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        )}

        {currentView === 'timeline' && (
          <View style={[styles.viewContainer, { backgroundColor: cardColor }]}>
            <Text style={[styles.viewTitle, { color: textColor }]}>Vista Timeline</Text>
            <View style={styles.timelineContainer}>
              {phase.checklist.map((item, index) => (
                <View key={item.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View
                      style={[
                        styles.timelineDot,
                        {
                          backgroundColor: item.completed ? phase.color : '#E0E0E0',
                        },
                      ]}
                    />
                    {index < phase.checklist.length - 1 && (
                      <View
                        style={[
                          styles.timelineLine,
                          { backgroundColor: isDark ? '#3A3A3C' : '#E0E0E0' },
                        ]}
                      />
                    )}
                  </View>
                  <Pressable
                    style={[
                      styles.timelineCard,
                      {
                        backgroundColor: isDark ? '#3A3A3C' : '#F5F5F5',
                        borderLeftColor: item.completed ? phase.color : '#E0E0E0',
                      },
                    ]}
                    onPress={() => handleToggleTask(item.id)}
                  >
                    <Text style={[styles.timelineCardText, { color: textColor }]}>
                      {item.title}
                    </Text>
                    {item.completed && (
                      <IconSymbol name="checkmark.circle.fill" size={20} color={phase.color} />
                    )}
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Resources Section */}
        <ResourceList
          resources={phase.resources}
          onAddResource={handleAddResource}
          onDeleteResource={handleDeleteResource}
          phaseColor={phase.color}
          isDark={isDark}
        />

        {/* Tips Section */}
        <View style={[styles.tipsCard, { backgroundColor: cardColor }]}>
          <View style={styles.tipsHeader}>
            <IconSymbol name="lightbulb.fill" size={20} color="#FFC107" />
            <Text style={[styles.tipsTitle, { color: textColor }]}>
              Recursos y Plantillas
            </Text>
          </View>
          <Text style={[styles.tipText, { color: textSecondaryColor }]}>
            • Mantén todos tus archivos organizados en carpetas
          </Text>
          <Text style={[styles.tipText, { color: textSecondaryColor }]}>
            • Usa plantillas reutilizables para agilizar el proceso
          </Text>
          <Text style={[styles.tipText, { color: textSecondaryColor }]}>
            • Documenta decisiones importantes en notas
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 100,
  },
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  phaseIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  phaseDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressSection: {
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  viewContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  viewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  kanbanContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  kanbanColumn: {
    flex: 1,
  },
  kanbanColumnTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  kanbanCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  kanbanCardText: {
    fontSize: 14,
    flex: 1,
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  timelineCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timelineCardText: {
    fontSize: 14,
    flex: 1,
  },
  tipsCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});
