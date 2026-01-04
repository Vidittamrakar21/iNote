import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants/colors";
import { useNotes } from "../context/NotesContext";

export default function FloatingButton() {
  const { addNote } = useNotes();
  const router = useRouter();

  const handleAdd = () => {
    const id = addNote();
    router.push({
      pathname: "/note/[id]",
      params: { id },
    });
  };

  return (
    <Pressable style={styles.btn} onPress={handleAdd}>
      <Text style={styles.plus}>＋</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    right: 24,
    bottom: 30,
    backgroundColor: COLORS.white,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  plus: {
    fontSize: 28,
    color: COLORS.bg,
  },
});
