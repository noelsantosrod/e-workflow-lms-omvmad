
import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Resource } from '@/types/workflow';
import * as Haptics from 'expo-haptics';

interface ResourceListProps {
  resources: Resource[];
  onAddResource: (type: 'url' | 'file' | 'note') => void;
  onDeleteResource: (resourceId: string) => void;
  phaseColor: string;
  isDark: boolean;
}

export default function ResourceList({
  resources,
  onAddResource,
  onDeleteResource,
  phaseColor,
  isDark,
}: ResourceListProps) {
  const cardColor = isDark ? '#2C2C2E' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#333333';
  const textSecondaryColor = isDark ? '#98989D' : '#767676';

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'url':
        return 'link';
      case 'file':
        return 'doc.fill';
      case 'note':
        return 'note.text';
      default:
        return 'doc';
    }
  };

  const handleResourcePress = (resource: Resource) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      resource.title,
      resource.content,
      [
        { text: 'Cerrar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => onDeleteResource(resource.id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Recursos
        </Text>
        <View style={styles.addButtons}>
          <Pressable
            style={[styles.addButton, { backgroundColor: phaseColor + '20' }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onAddResource('url');
            }}
          >
            <IconSymbol name="link" size={16} color={phaseColor} />
          </Pressable>
          <Pressable
            style={[styles.addButton, { backgroundColor: phaseColor + '20' }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onAddResource('file');
            }}
          >
            <IconSymbol name="doc.fill" size={16} color={phaseColor} />
          </Pressable>
          <Pressable
            style={[styles.addButton, { backgroundColor: phaseColor + '20' }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onAddResource('note');
            }}
          >
            <IconSymbol name="note.text" size={16} color={phaseColor} />
          </Pressable>
        </View>
      </View>

      {resources.length === 0 ? (
        <View style={[styles.emptyState, { backgroundColor: cardColor }]}>
          <IconSymbol name="folder" size={32} color={textSecondaryColor} />
          <Text style={[styles.emptyText, { color: textSecondaryColor }]}>
            No hay recursos añadidos
          </Text>
          <Text style={[styles.emptySubtext, { color: textSecondaryColor }]}>
            Usa los botones de arriba para añadir URLs, archivos o notas
          </Text>
        </View>
      ) : (
        resources.map((resource) => (
          <Pressable
            key={resource.id}
            style={[styles.resourceItem, { backgroundColor: cardColor }]}
            onPress={() => handleResourcePress(resource)}
          >
            <View style={[styles.resourceIcon, { backgroundColor: phaseColor + '20' }]}>
              <IconSymbol
                name={getResourceIcon(resource.type) as any}
                size={20}
                color={phaseColor}
              />
            </View>
            <View style={styles.resourceContent}>
              <Text style={[styles.resourceTitle, { color: textColor }]}>
                {resource.title}
              </Text>
              <Text style={[styles.resourceType, { color: textSecondaryColor }]}>
                {resource.type === 'url' ? 'Enlace' : resource.type === 'file' ? 'Archivo' : 'Nota'}
              </Text>
            </View>
            <IconSymbol name="chevron.right" size={16} color={textSecondaryColor} />
          </Pressable>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  resourceType: {
    fontSize: 13,
  },
});
