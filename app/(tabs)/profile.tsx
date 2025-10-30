
import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, Platform, Pressable, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

export default function ResourcesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const bgColor = isDark ? '#1C1C1E' : colors.background;
  const cardColor = isDark ? '#2C2C2E' : colors.card;
  const textColor = isDark ? '#FFFFFF' : colors.text;
  const textSecondaryColor = isDark ? '#98989D' : colors.textSecondary;

  const resources = [
    {
      id: '1',
      title: 'Guía de Articulate Storyline',
      description: 'Documentación oficial y tutoriales',
      icon: 'book.fill',
      color: '#007BFF',
      url: 'https://articulate.com/support/storyline-360',
    },
    {
      id: '2',
      title: 'Plantillas de Storyboard',
      description: 'Plantillas reutilizables para planificación',
      icon: 'doc.text.fill',
      color: '#28A745',
      url: '#',
    },
    {
      id: '3',
      title: 'Recursos de Audio',
      description: 'Bibliotecas de música y efectos de sonido',
      icon: 'music.note',
      color: '#FFC107',
      url: '#',
    },
    {
      id: '4',
      title: 'Estándares SCORM',
      description: 'Información sobre exportación SCORM',
      icon: 'arrow.up.doc.fill',
      color: '#DC3545',
      url: 'https://scorm.com',
    },
    {
      id: '5',
      title: 'Comunidad E-Learning',
      description: 'Foros y grupos de discusión',
      icon: 'person.3.fill',
      color: '#6C757D',
      url: '#',
    },
  ];

  const handleResourcePress = (resource: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      resource.title,
      resource.description + '\n\nURL: ' + resource.url,
      [{ text: 'OK' }]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Recursos y Ayuda',
        }}
      />
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: textColor }]}>
              Recursos Útiles
            </Text>
            <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
              Herramientas y referencias para tu flujo de trabajo
            </Text>
          </View>

          {resources.map((resource) => (
            <Pressable
              key={resource.id}
              style={[styles.resourceCard, { backgroundColor: cardColor }]}
              onPress={() => handleResourcePress(resource)}
            >
              <View style={[styles.resourceIcon, { backgroundColor: resource.color + '20' }]}>
                <IconSymbol name={resource.icon as any} size={28} color={resource.color} />
              </View>
              <View style={styles.resourceContent}>
                <Text style={[styles.resourceTitle, { color: textColor }]}>
                  {resource.title}
                </Text>
                <Text style={[styles.resourceDescription, { color: textSecondaryColor }]}>
                  {resource.description}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={textSecondaryColor} />
            </Pressable>
          ))}

          <View style={[styles.tipsCard, { backgroundColor: cardColor }]}>
            <View style={styles.tipsHeader}>
              <IconSymbol name="lightbulb.fill" size={24} color="#FFC107" />
              <Text style={[styles.tipsTitle, { color: textColor }]}>
                Consejos Profesionales
              </Text>
            </View>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              • Mantén una biblioteca de recursos organizados por proyecto
            </Text>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              • Usa nomenclaturas consistentes para archivos y carpetas
            </Text>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              • Documenta decisiones de diseño para referencia futura
            </Text>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              • Realiza copias de seguridad regulares de tus proyectos
            </Text>
            <Text style={[styles.tipText, { color: textSecondaryColor }]}>
              • Solicita feedback temprano y frecuente
            </Text>
          </View>

          <View style={[styles.aboutCard, { backgroundColor: cardColor }]}>
            <Text style={[styles.aboutTitle, { color: textColor }]}>
              Acerca de esta App
            </Text>
            <Text style={[styles.aboutText, { color: textSecondaryColor }]}>
              Sistema de Flujo E-Learning v1.0
            </Text>
            <Text style={[styles.aboutText, { color: textSecondaryColor }]}>
              Diseñado para instructores que crean cursos con Articulate Storyline
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
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  resourceIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
  },
  tipsCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 12,
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
  aboutCard: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
});
