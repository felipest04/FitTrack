import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { LoadingScreen } from "../components/LoadingScreen";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { StatCard } from "../components/StatCard";
import { WorkoutCard } from "../components/WorkoutCard";
import { colors, radius, spacing } from "../constants/theme";
import { useAppData } from "../hooks/useAppData";
import { relativeDate } from "../utils/date";
import {
  getAllExercises,
  getHighestLoad,
  getLastUpdate,
} from "../utils/statistics";
export function DashboardScreen() {
  const navigation = useNavigation();
  const { workouts, isLoading } = useAppData();
  if (isLoading) return <LoadingScreen />;
  const exercises = getAllExercises(workouts);
  const highest = getHighestLoad(workouts);
  const lastUpdate = getLastUpdate(workouts);
  return (
    <ScreenContainer>
      <View style={styles.brandRow}>
        <View>
          <Text style={styles.eyebrow}>FITTRACK</Text>
          <Text style={styles.greeting}>
            Seu progresso,<Text style={styles.highlight}> em movimento.</Text>
          </Text>
        </View>
      </View>
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>FOCO DA SEMANA</Text>
        <Text style={styles.heroTitle}>Consistência supera intensidade.</Text>
        <Text style={styles.heroText}>
          {workouts.length} treinos organizados e prontos para a próxima sessão.
        </Text>
        <AppButton
          label="Ver meus treinos"
          icon="arrow-forward"
          onPress={() =>
            navigation.navigate("MainTabs", { screen: "Workouts" })
          }
        />
      </View>
      <SectionHeader
        title="Visão geral"
        subtitle="Resumo atualizado da sua rotina"
      />
      <View style={styles.grid}>
        <StatCard
          icon="barbell-outline"
          label="Treinos ativos"
          value={String(workouts.length)}
        />
        <StatCard
          icon="fitness-outline"
          label="Exercícios"
          value={String(exercises.length)}
          accent={colors.info}
        />
      </View>
      <View style={styles.grid}>
        <StatCard
          icon="trophy-outline"
          label={highest?.name ?? "Maior carga"}
          value={highest ? `${highest.weight} kg` : "0 kg"}
          accent={colors.warning}
        />
        <StatCard
          icon="time-outline"
          label="Última atualização"
          value={relativeDate(lastUpdate)}
          accent="#B99AF4"
        />
      </View>
      <SectionHeader
        title="Próximos treinos"
        subtitle="Acesse rapidamente sua ficha"
      />
      {workouts.slice(0, 3).map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onPress={() =>
            navigation.navigate("WorkoutDetails", { workoutId: workout.id })
          }
        />
      ))}
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  brandRow: { marginBottom: spacing.lg, marginTop: spacing.sm },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },
  greeting: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.7,
    marginTop: 5,
  },
  highlight: { color: colors.primary },
  hero: {
    backgroundColor: "#15241C",
    borderColor: "#284936",
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.xl,
    padding: spacing.lg,
  },
  heroLabel: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.8,
    lineHeight: 31,
    marginTop: spacing.sm,
  },
  heroText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  grid: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.md },
});
