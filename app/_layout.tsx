
import React, { useEffect } from "react";
import { Button } from "@/components/button";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { WorkflowProvider } from "@/contexts/WorkflowContext";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router } from "expo-router";
import { useNetworkState } from "expo-network";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { SystemBars } from "react-native-edge-to-edge";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useColorScheme, Alert } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { isConnected } = useNetworkState();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <WidgetProvider>
          <WorkflowProvider>
            <SystemBars style={colorScheme === "dark" ? "light" : "dark"} />
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  title: "Modal",
                }}
              />
              <Stack.Screen
                name="formsheet"
                options={{
                  presentation: "formSheet",
                  title: "Form Sheet",
                }}
              />
              <Stack.Screen
                name="transparent-modal"
                options={{
                  presentation: "transparentModal",
                  animation: "fade",
                  headerShown: false,
                }}
              />
            </Stack>
          </WorkflowProvider>
        </WidgetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
