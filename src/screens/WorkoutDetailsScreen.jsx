import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { EmptyState } from "../components/EmptyState";
import { ExerciseCard } from "../components/ExerciseCard";
import { ExerciseFormModal } from "../components/ExerciseFormModal";
import { ScreenContainer } from "../components/ScreenContainer";
import { WorkoutFormModal } from "../components/WorkoutFormModal";
import { colors, radius, spacing } from "../constants/theme";
import { useAppData } from "../hooks/useAppData";
import { formatDate } from "../utils/date";
export function WorkoutDetailsScreen({ route, navigation }) {
  const {
    workouts,
    updateWorkout,
    deleteWorkout,
    addExercise,
    updateExercise,
    deleteExercise,
  } = useAppData();
  const workout = workouts.find((item) => item.id === route.params.workoutId);
  const [isWorkoutFormOpen, setIsWorkoutFormOpen] = useState(false);
  const [isExerciseFormOpen, setIsExerciseFormOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState();
  if (!workout)
    return (
      <ScreenContainer>
        <EmptyState
          title="Treino não encontrado"
          description="Este treino pode ter sido removido."
        />
      </ScreenContainer>
    );
  const confirmDeleteWorkout = () =>
    Alert.alert(
      "Excluir treino?",
      "Todos os exercícios deste treino serão removidos.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            deleteWorkout(workout.id);
            navigation.goBack();
          },
        },
      ],
    );
  const confirmDeleteExercise = (exercise) =>
    Alert.alert("Remover exercício?", `Deseja remover ${exercise.name}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => deleteExercise(workout.id, exercise.id),
      },
    ]);
  const openNewExercise = () => {
    setSelectedExercise(undefined);
    setIsExerciseFormOpen(true);
  };
  const openEditExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsExerciseFormOpen(true);
  };
  return (
    <ScreenContainer>
      <View style={[styles.summary, { borderLeftColor: workout.color }]}>
        <Text style={styles.name}>{workout.name}</Text>
        <Text style={styles.focus}>{workout.focus}</Text>
        <View style={styles.meta}>
          <Text style={styles.metaText}>
            {workout.exercises.length} exercícios
          </Text>
          <Text style={styles.metaText}>
            Atualizado em {formatDate(workout.updatedAt)}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={styles.action}>
          <AppButton
            label="Editar treino"
            icon="pencil-outline"
            variant="secondary"
            onPress={() => setIsWorkoutFormOpen(true)}
          />
        </View>
        <View style={styles.action}>
          <AppButton
            label="Excluir"
            icon="trash-outline"
            variant="danger"
            onPress={confirmDeleteWorkout}
          />
        </View>
      </View>
      <View style={styles.add}>
        <AppButton
          label="Adicionar exercício"
          icon="add"
          onPress={openNewExercise}
        />
      </View>
      {workout.exercises.length ? (
        workout.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={() => openEditExercise(exercise)}
            onDelete={() => confirmDeleteExercise(exercise)}
          />
        ))
      ) : (
        <EmptyState
          title="Treino ainda vazio"
          description="Adicione exercícios para montar sua ficha de treino."
        />
      )}
      <WorkoutFormModal
        visible={isWorkoutFormOpen}
        workout={workout}
        onClose={() => setIsWorkoutFormOpen(false)}
        onSubmit={(input) => updateWorkout(workout.id, input)}
      />
      <ExerciseFormModal
        visible={isExerciseFormOpen}
        exercise={selectedExercise}
        onClose={() => setIsExerciseFormOpen(false)}
        onSubmit={(input) =>
          selectedExercise
            ? updateExercise(workout.id, selectedExercise.id, input)
            : addExercise(workout.id, input)
        }
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  summary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderLeftWidth: 5,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  name: { color: colors.text, fontSize: 26, fontWeight: "900" },
  focus: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  meta: { gap: 4, marginTop: spacing.lg },
  metaText: { color: colors.textMuted, fontSize: 12 },
  actions: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm },
  action: { flex: 1 },
  add: { marginBottom: spacing.lg },
});
