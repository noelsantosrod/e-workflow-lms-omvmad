
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  // Define the tabs configuration
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'house.fill',
      label: 'Dashboard',
    },
    {
      name: 'preproduction',
      route: '/(tabs)/preproduction',
      icon: 'doc.text.fill',
      label: 'Pre-prod',
    },
    {
      name: 'production',
      route: '/(tabs)/production',
      icon: 'hammer.fill',
      label: 'Producción',
    },
    {
      name: 'postproduction',
      route: '/(tabs)/postproduction',
      icon: 'checkmark.seal.fill',
      label: 'Post-prod',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'book.fill',
      label: 'Recursos',
    },
  ];

  // Use NativeTabs for iOS, custom FloatingTabBar for Android and Web
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="house.fill" drawable="ic_home" />
          <Label>Dashboard</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="preproduction">
          <Icon sf="doc.text.fill" drawable="ic_doc" />
          <Label>Pre-prod</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="production">
          <Icon sf="hammer.fill" drawable="ic_hammer" />
          <Label>Producción</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="postproduction">
          <Icon sf="checkmark.seal.fill" drawable="ic_check" />
          <Label>Post-prod</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="book.fill" drawable="ic_book" />
          <Label>Recursos</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation with custom floating tab bar
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="preproduction" />
        <Stack.Screen name="production" />
        <Stack.Screen name="postproduction" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
