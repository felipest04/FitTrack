import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../constants/theme";
export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.text}>Preparando seus treinos...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  },
  text: { color: colors.textMuted, marginTop: spacing.md },
});
