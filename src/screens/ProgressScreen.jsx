import { StyleSheet, Text, View } from "react-native";
import { EmptyState } from "../components/EmptyState";
import { LoadingScreen } from "../components/LoadingScreen";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { colors, radius, spacing } from "../constants/theme";
import { useAppData } from "../hooks/useAppData";
import { formatShortDate } from "../utils/date";
import {
  getAllExercises,
  getExerciseProgress,
  getHighestLoad,
} from "../utils/statistics";
export function ProgressScreen() {
  const { workouts, isLoading } = useAppData();
  if (isLoading) return <LoadingScreen />;
  const exercises = getAllExercises(workouts).sort(
    (a, b) => b.weight - a.weight,
  );
  const highest = getHighestLoad(workouts);
  const improved = exercises.filter(
    (exercise) => getExerciseProgress(exercise).difference > 0,
  );
  const totalGain = improved.reduce(
    (sum, exercise) => sum + getExerciseProgress(exercise).difference,
    0,
  );
  return (
    <ScreenContainer>
      <SectionHeader
        title="Sua evolução"
        subtitle="Histórico de cargas e indicadores do seu progresso."
      />
      <View style={styles.grid}>
        <StatCard
          icon="trophy-outline"
          label="Maior carga registrada"
          value={highest ? `${highest.weight} kg` : "0 kg"}
          accent={colors.warning}
        />
        <StatCard
          icon="trending-up-outline"
          label="Exercícios em evolução"
          value={String(improved.length)}
        />
      </View>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>GANHO TOTAL DE CARGA</Text>
        <Text style={styles.totalValue}>+{totalGain} kg</Text>
        <Text style={styles.totalText}>
          Soma da evolução entre o primeiro e o último registro de cada
          exercício.
        </Text>
      </View>
      <SectionHeader
        title="Histórico por exercício"
        subtitle="Maiores cargas aparecem primeiro"
      />
      {exercises.length ? (
        exercises.map((exercise) => {
          const progress = getExerciseProgress(exercise);
          const maxWeight = Math.max(
            ...exercise.history.map((item) => item.weight),
            1,
          );
          return (
            <View key={exercise.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.name}>{exercise.name}</Text>
                  <Text style={styles.workout}>{exercise.workoutName}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {progress.difference >= 0 ? "+" : ""}
                    {progress.percentage}%
                  </Text>
                </View>
              </View>
              <View style={styles.history}>
                {exercise.history.slice(-5).map((record) => (
                  <View key={record.id} style={styles.record}>
                    <Text style={styles.recordWeight}>{record.weight} kg</Text>
                    <View style={styles.track}>
                      <View
                        style={[
                          styles.fill,
                          {
                            width: `${Math.max(8, (record.weight / maxWeight) * 100)}%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.date}>
                      {formatShortDate(record.recordedAt)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })
      ) : (
        <EmptyState
          title="Sem histórico disponível"
          description="Adicione exercícios e altere suas cargas para acompanhar a evolução."
        />
      )}
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  grid: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.md },
  totalCard: {
    backgroundColor: "#15241C",
    borderColor: "#284936",
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  totalLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  totalValue: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900",
    marginTop: spacing.xs,
  },
  totalText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  name: { color: colors.text, fontSize: 16, fontWeight: "800" },
  workout: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  badge: {
    backgroundColor: `${colors.primary}20`,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: { color: colors.primary, fontSize: 12, fontWeight: "800" },
  history: { gap: spacing.sm },
  record: { alignItems: "center", flexDirection: "row", gap: spacing.sm },
  recordWeight: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
    width: 45,
  },
  track: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.pill,
    flex: 1,
    height: 6,
    overflow: "hidden",
  },
  fill: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: "100%",
  },
  date: { color: colors.textMuted, fontSize: 10, width: 35 },
});
