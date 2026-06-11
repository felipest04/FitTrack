import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
export function EmptyState({ title, description }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="barbell-outline" size={28} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.xl,
  },
  icon: {
    alignItems: "center",
    backgroundColor: `${colors.primary}20`,
    borderRadius: radius.pill,
    height: 58,
    justifyContent: "center",
    marginBottom: spacing.md,
    width: 58,
  },
  title: { color: colors.text, fontSize: 17, fontWeight: "800" },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
    textAlign: "center",
  },
});
