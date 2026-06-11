import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing } from "../constants/theme";
export function AppButton({ label, onPress, icon, variant = "primary" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={18}
          color={variant === "primary" ? colors.background : colors.text}
        />
      ) : null}
      <Text
        style={[styles.label, variant === "primary" && styles.primaryLabel]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: spacing.md,
  },
  primary: { backgroundColor: colors.primary },
  secondary: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.border,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: "#351A20",
    borderColor: "#6A2932",
    borderWidth: 1,
  },
  label: { color: colors.text, fontSize: 15, fontWeight: "700" },
  primaryLabel: { color: colors.background },
  pressed: { opacity: 0.75 },
});
