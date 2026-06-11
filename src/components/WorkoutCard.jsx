import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { relativeDate } from "../utils/date";
export function WorkoutCard({ workout, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.accent, { backgroundColor: workout.color }]} />
      <View style={styles.content}>
        <View style={styles.top}>
          <View style={styles.titleGroup}>
            <Text style={styles.name}>{workout.name}</Text>
            <Text style={styles.focus}>{workout.focus}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </View>
        <View style={styles.meta}>
          <Text style={styles.metaText}>
            {workout.exercises.length} exercícios
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>{relativeDate(workout.updatedAt)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  accent: { width: 5 },
  content: { flex: 1, padding: spacing.md },
  top: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleGroup: { flex: 1 },
  name: { color: colors.text, fontSize: 18, fontWeight: "800" },
  focus: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  meta: { alignItems: "center", flexDirection: "row", marginTop: spacing.md },
  metaText: { color: colors.textMuted, fontSize: 12 },
  dot: { color: colors.border, marginHorizontal: spacing.sm },
  pressed: { opacity: 0.75 },
});
