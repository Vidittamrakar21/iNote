import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotesProvider } from "../context/NotesContext";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotesProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </NotesProvider>
    </GestureHandlerRootView>
  );
}
