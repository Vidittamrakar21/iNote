import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { COLORS } from "../constants/colors";
import { useNotes } from "../context/NotesContext";

export default function NoteCard({ note }: any) {
  const router = useRouter();
  const { removeNote } = useNotes();

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleDone = () => {
    removeNote(note.id);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX > 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value > 120) {
        // Swipe success
        opacity.value = withTiming(0);
        translateX.value = withTiming(300, {}, () =>
          runOnJS(handleDone)()
        );
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.wrapper}>
      {/* DONE BACKGROUND */}
      <View style={styles.doneBg}>
        <Text style={styles.doneText}>✓ Done</Text>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.card,
            { borderLeftColor: note.color },
            animatedStyle,
          ]}
        >
          <Text
            style={styles.title}
            onPress={() =>
              router.push({
                pathname: "/note/[id]",
                params: { id: note.id },
              })
            }
          >
            {note.title}
          </Text>
          <Text numberOfLines={3} style={styles.content}>
            {note.content}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  doneBg: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#22C55E",
    borderRadius: 16,
    justifyContent: "center",
    paddingLeft: 24,
  },
  doneText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 6,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  content: {
    color: COLORS.gray,
    fontSize: 14,
  },
});
