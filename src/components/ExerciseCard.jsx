import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
import { relativeDate } from "../utils/date";
export function ExerciseCard({ exercise, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={styles.titleGroup}>
          <Text style={styles.name}>{exercise.name}</Text>
          <Text style={styles.updated}>{relativeDate(exercise.updatedAt)}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={onEdit} hitSlop={8}>
            <Ionicons name="pencil-outline" size={19} color={colors.info} />
          </Pressable>
          <Pressable onPress={onDelete} hitSlop={8}>
            <Ionicons name="trash-outline" size={19} color={colors.danger} />
          </Pressable>
        </View>
      </View>
      <View style={styles.stats}>
        <View>
          <Text style={styles.value}>{exercise.sets}</Text>
          <Text style={styles.label}>séries</Text>
        </View>
        <View>
          <Text style={styles.value}>{exercise.reps}</Text>
          <Text style={styles.label}>repetições</Text>
        </View>
        <View>
          <Text style={[styles.value, styles.weight]}>
            {exercise.weight} kg
          </Text>
          <Text style={styles.label}>carga atual</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  top: { flexDirection: "row", justifyContent: "space-between" },
  titleGroup: { flex: 1 },
  name: { color: colors.text, fontSize: 17, fontWeight: "800" },
  updated: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  actions: { flexDirection: "row", gap: spacing.md },
  stats: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    padding: spacing.md,
  },
  value: { color: colors.text, fontSize: 16, fontWeight: "800" },
  weight: { color: colors.primary },
  label: { color: colors.textMuted, fontSize: 10, marginTop: 3 },
});
