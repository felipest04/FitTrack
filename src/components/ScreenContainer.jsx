import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { colors, spacing } from "../constants/theme";
export function ScreenContainer({ children, scroll = true, contentStyle }) {
  if (!scroll) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.content, contentStyle]}>
        {children}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[styles.content, contentStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: spacing.md, paddingBottom: 110 },
});
