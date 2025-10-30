
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import * as Haptics from 'expo-haptics';

interface ViewSwitcherProps {
  currentView: 'checklist' | 'kanban' | 'timeline';
  onViewChange: (view: 'checklist' | 'kanban' | 'timeline') => void;
  isDark: boolean;
}

export default function ViewSwitcher({ currentView, onViewChange, isDark }: ViewSwitcherProps) {
  const cardColor = isDark ? '#2C2C2E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#333333';
  const activeColor = '#007BFF';

  const handleViewChange = (view: 'checklist' | 'kanban' | 'timeline') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onViewChange(view);
  };

  return (
    <View style={[styles.container, { backgroundColor: cardColor }]}>
      <Pressable
        style={[
          styles.viewButton,
          currentView === 'checklist' && { backgroundColor: activeColor + '20' },
        ]}
        onPress={() => handleViewChange('checklist')}
      >
        <IconSymbol
          name="checklist"
          size={20}
          color={currentView === 'checklist' ? activeColor : textColor}
        />
        <Text
          style={[
            styles.viewButtonText,
            { color: currentView === 'checklist' ? activeColor : textColor },
          ]}
        >
          Lista
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.viewButton,
          currentView === 'kanban' && { backgroundColor: activeColor + '20' },
        ]}
        onPress={() => handleViewChange('kanban')}
      >
        <IconSymbol
          name="square.grid.2x2"
          size={20}
          color={currentView === 'kanban' ? activeColor : textColor}
        />
        <Text
          style={[
            styles.viewButtonText,
            { color: currentView === 'kanban' ? activeColor : textColor },
          ]}
        >
          Kanban
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.viewButton,
          currentView === 'timeline' && { backgroundColor: activeColor + '20' },
        ]}
        onPress={() => handleViewChange('timeline')}
      >
        <IconSymbol
          name="clock"
          size={20}
          color={currentView === 'timeline' ? activeColor : textColor}
        />
        <Text
          style={[
            styles.viewButtonText,
            { color: currentView === 'timeline' ? activeColor : textColor },
          ]}
        >
          Timeline
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
