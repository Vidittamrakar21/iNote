import { FlatList, StyleSheet, View } from "react-native";
import FloatingButton from "../components/FloatingButton";
import NoteCard from "../components/NoteCard";
import { COLORS } from "../constants/colors";
import { useNotes } from "../context/NotesContext";

export default function Home() {
  const { notes } = useNotes();

  return (
    <View style={styles.container}>
      <FlatList
        style= {{marginTop: 50}}
        data={notes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <NoteCard note={item} />}
      />
      <FloatingButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
   
  },
});
