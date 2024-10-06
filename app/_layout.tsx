import { Stack } from "expo-router";
import { useEffect } from "react";
import * as QuickActions from "expo-quick-actions";
import { Platform } from "react-native";
import { useQuickActionRouting } from "expo-quick-actions/router";

export default function Layout() {
  useQuickActionRouting();

  useEffect(() => {
    QuickActions.setItems([
      {
        id: "0",
        title: "Add a plant",
        icon: Platform.OS === "ios" ? "symbol:leaf" : "leaf",
        params: { href: "/new" },
      },
    ]);
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="onboarding"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="new"
        options={{ headerShown: false, animation: "fade", title: "New plant" }}
      />
    </Stack>
  );
}
