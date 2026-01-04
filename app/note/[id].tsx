import { useLocalSearchParams } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";
import { useNotes } from "../../context/NotesContext";

export default function NoteEditor() {
  const { id } = useLocalSearchParams();
  const { notes, updateNote } = useNotes();

  const note = notes.find((n: any) => n.id === id);
  if (!note) return null;

  return (
    <View style={[styles.container, { backgroundColor: note.color }]}>
      {/* TITLE */}
      <TextInput
        value={note.title}
        onChangeText={(text) =>
          updateNote(note.id, { title: text })
        }
        placeholder="Title"
        placeholderTextColor="#444"
        style={styles.title}
      />

      {/* CONTENT */}
      <TextInput
        value={note.content}
        onChangeText={(text) =>
          updateNote(note.id, { content: text })
        }
        placeholder="Start writing..."
        placeholderTextColor="#444"
        multiline
        style={styles.editor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#000",
    marginTop: 50
  },
  editor: {
    fontSize: 18,
    lineHeight: 26,
    color: "#000",
    
  },
});
