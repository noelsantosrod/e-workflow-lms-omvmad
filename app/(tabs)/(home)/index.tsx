
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useColorScheme, Platform, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useWorkflow } from '@/contexts/WorkflowContext';
import ProgressDoughnut from '@/components/ProgressDoughnut';
import ExportButton from '@/components/ExportButton';
import * as Haptics from 'expo-haptics';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  const { workflowData, isLoading, saveData } = useWorkflow();

  const bgColor = isDark ? '#1C1C1E' : colors.background;
  const cardColor = isDark ? '#2C2C2E' : colors.card;
  const textColor = isDark ? '#FFFFFF' : colors.text;
  const textSecondaryColor = isDark ? '#98989D' : colors.textSecondary;

  // Save data when leaving the screen
  useEffect(() => {
    return () => {
      console.log('Dashboard unmounting, saving data...');
      saveData();
    };
  }, []);

  // Calculate overall progress
  const calculateProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    workflowData.phases.forEach(phase => {
      totalTasks += phase.checklist.length;
      completedTasks += phase.checklist.filter(item => item.completed).length;
    });

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const calculatePhaseProgress = (phaseId: string) => {
    const phase = workflowData.phases.find(p => p.id === phaseId);
    if (!phase) return 0;

    const total = phase.checklist.length;
    const completed = phase.checklist.filter(item => item.completed).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const overallProgress = calculateProgress();

  const handlePhasePress = (phaseRoute: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Navigating to:', phaseRoute);
    router.push(phaseRoute as any);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: textColor }]}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Dashboard Global',
          headerRight: () => <ExportButton />,
        }}
      />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>
              Sistema de Flujo E-Learning
            </Text>
            <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
              Organiza y rastrea tu proceso de creación de cursos
            </Text>
          </View>

          {/* Overall Progress Card */}
          <View style={[styles.progressCard, { backgroundColor: cardColor }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Progreso Global del Proyecto
            </Text>
            <View style={styles.progressContainer}>
              <ProgressDoughnut progress={overallProgress} size={140} />
              <View style={styles.progressStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: textColor }]}>
                    {workflowData.phases.reduce((acc, p) => acc + p.checklist.filter(i => i.completed).length, 0)}
                  </Text>
                  <Text style={[styles.statLabel, { color: textSecondaryColor }]}>
                    Completadas
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: textColor }]}>
                    {workflowData.phases.reduce((acc, p) => acc + p.checklist.length, 0)}
                  </Text>
                  <Text style={[styles.statLabel, { color: textSecondaryColor }]}>
                    Total Tareas
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Phase Cards */}
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Fases del Proyecto
          </Text>

          {workflowData.phases.map((phase, index) => {
            const phaseProgress = calculatePhaseProgress(phase.id);
            const routes = ['/(tabs)/preproduction', '/(tabs)/production', '/(tabs)/postproduction'];
            
            return (
              <Pressable
                key={phase.id}
                style={[styles.phaseCard, { backgroundColor: cardColor }]}
                onPress={() => handlePhasePress(routes[index])}
              >
                <View style={[styles.phaseIconContainer, { backgroundColor: phase.color + '20' }]}>
                  <IconSymbol name={phase.icon as any} size={28} color={phase.color} />
                </View>
                <View style={styles.phaseContent}>
                  <Text style={[styles.phaseTitle, { color: textColor }]}>
                    {phase.name}
                  </Text>
                  <Text style={[styles.phaseDescription, { color: textSecondaryColor }]}>
                    {phase.description}
                  </Text>
                  <View style={styles.phaseProgressBar}>
                    <View
                      style={[
                        styles.phaseProgressFill,
                        { backgroundColor: phase.color, width: `${phaseProgress}%` }
                      ]}
                    />
                  </View>
                  <Text style={[styles.phaseProgressText, { color: textSecondaryColor }]}>
                    {phaseProgress}% completado
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={textSecondaryColor} />
              </Pressable>
            );
          })}

          {/* Quick Tips Card */}
          <View style={[styles.tipsCard, { backgroundColor: cardColor }]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color="#FFC107" />
              <Text style={[styles.tipsTitle, { color: textColor }]}>
                Consejos de Productividad
              </Text>
            </View>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              - Revisa tu progreso diariamente para mantener el enfoque
            </Text>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              - Completa las tareas de pre-producción antes de comenzar en Storyline
            </Text>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              - Exporta tus datos regularmente para mantener un respaldo
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  progressStats: {
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  phaseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  phaseIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  phaseContent: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  phaseDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  phaseProgressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  phaseProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  phaseProgressText: {
    fontSize: 12,
  },
  tipsCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
});
