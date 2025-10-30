
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Light mode colors
  background: '#F7F6F3',
  text: '#333333',
  textSecondary: '#767676',
  primary: '#007BFF',
  secondary: '#6C757D',
  accent: '#28A745',
  card: '#FFFFFF',
  highlight: '#E9ECEF',
  border: '#E0E0E0',
  danger: '#DC3545',
  warning: '#FFC107',
  
  // Dark mode colors
  darkBackground: '#1C1C1E',
  darkText: '#FFFFFF',
  darkTextSecondary: '#98989D',
  darkCard: '#2C2C2E',
  darkHighlight: '#3A3A3C',
  darkBorder: '#48484A',
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accent: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
