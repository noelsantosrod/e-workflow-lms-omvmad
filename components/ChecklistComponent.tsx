
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { ChecklistItem } from '@/types/workflow';
import * as Haptics from 'expo-haptics';

interface ChecklistComponentProps {
  checklist: ChecklistItem[];
  onToggle: (taskId: string) => void;
  phaseColor: string;
  isDark: boolean;
}

export default function ChecklistComponent({
  checklist,
  onToggle,
  phaseColor,
  isDark,
}: ChecklistComponentProps) {
  const cardColor = isDark ? '#2C2C2E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#333333';
  const textSecondaryColor = isDark ? '#98989D' : '#767676';

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>
        Lista de Tareas
      </Text>
      {checklist.map((item) => (
        <Pressable
          key={item.id}
          style={[styles.checklistItem, { backgroundColor: cardColor }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onToggle(item.id);
          }}
        >
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: item.completed ? phaseColor : 'transparent',
                borderColor: item.completed ? phaseColor : '#E0E0E0',
              },
            ]}
          >
            {item.completed && (
              <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text
            style={[
              styles.checklistText,
              {
                color: item.completed ? textSecondaryColor : textColor,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              },
            ]}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checklistText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
  },
});
