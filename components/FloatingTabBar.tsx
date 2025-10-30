
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { BlurView } from 'expo-blur';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 24,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const activeIndex = tabs.findIndex((tab) => pathname.includes(tab.name));
  const indicatorPosition = useSharedValue(activeIndex >= 0 ? activeIndex : 0);

  React.useEffect(() => {
    const newIndex = tabs.findIndex((tab) => pathname.includes(tab.name));
    if (newIndex >= 0) {
      indicatorPosition.value = withSpring(newIndex, {
        damping: 20,
        stiffness: 90,
      });
    }
  }, [pathname, tabs]);

  const handleTabPress = (route: string, index: number) => {
    console.log('Tab pressed:', route);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Smooth navigation
    try {
      router.push(route as any);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    return {
      transform: [
        {
          translateX: interpolate(
            indicatorPosition.value,
            tabs.map((_, i) => i),
            tabs.map((_, i) => i * tabWidth)
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.safeArea, { bottom: bottomMargin }]}
    >
      <BlurView
        intensity={Platform.OS === 'ios' ? 80 : 100}
        tint={theme.dark ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            width: containerWidth,
            borderRadius,
            backgroundColor:
              Platform.OS === 'ios'
                ? 'transparent'
                : theme.dark
                ? 'rgba(44, 44, 46, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.indicator,
            {
              width: containerWidth / tabs.length,
              borderRadius: borderRadius - 4,
              backgroundColor: theme.colors.primary,
            },
            animatedIndicatorStyle,
          ]}
        />
        {tabs.map((tab, index) => {
          const isActive = pathname.includes(tab.name);
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => handleTabPress(tab.route, index)}
              activeOpacity={0.7}
            >
              <IconSymbol
                name={tab.icon as any}
                size={24}
                color={isActive ? '#FFFFFF' : colors.text}
              />
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive ? '#FFFFFF' : colors.text,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    zIndex: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  indicator: {
    position: 'absolute',
    height: '80%',
    top: '10%',
    left: 8,
    zIndex: 1,
  },
});
