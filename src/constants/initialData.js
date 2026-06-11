const createExercise = (id, name, sets, reps, weights, daysAgo) => {
  const history = weights.map((weight, index) => ({
    id: `${id}-record-${index}`,
    weight,
    recordedAt: new Date(Date.now() - daysAgo[index] * 86400000).toISOString(),
  }));
  const latest = history[history.length - 1];
  return {
    id,
    name,
    sets,
    reps,
    weight: latest.weight,
    history,
    updatedAt: latest.recordedAt,
  };
};
const createWorkout = (id, name, focus, color, exercises) => ({
  id,
  name,
  focus,
  color,
  exercises,
  createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
  updatedAt: exercises.reduce(
    (latest, exercise) =>
      exercise.updatedAt > latest ? exercise.updatedAt : latest,
    exercises[0]?.updatedAt ?? new Date().toISOString(),
  ),
});
export const initialData = {
  workouts: [
    createWorkout("workout-a", "Treino A", "Peito e Tríceps", "#8FE388", [
      createExercise(
        "supino-reto",
        "Supino reto",
        4,
        10,
        [50, 55, 60],
        [30, 15, 3],
      ),
      createExercise(
        "supino-inclinado",
        "Supino inclinado",
        3,
        12,
        [36, 40, 42],
        [28, 14, 3],
      ),
      createExercise(
        "triceps-corda",
        "Tríceps na corda",
        3,
        12,
        [25, 28, 30],
        [25, 12, 3],
      ),
    ]),
    createWorkout("workout-b", "Treino B", "Costas e Bíceps", "#67B7F7", [
      createExercise(
        "puxada-frontal",
        "Puxada frontal",
        4,
        10,
        [45, 50, 55],
        [24, 10, 2],
      ),
      createExercise(
        "remada-curvada",
        "Remada curvada",
        3,
        10,
        [40, 45, 50],
        [24, 10, 2],
      ),
      createExercise(
        "rosca-direta",
        "Rosca direta",
        3,
        12,
        [18, 20, 22],
        [22, 9, 2],
      ),
    ]),
    createWorkout("workout-c", "Treino C", "Pernas", "#B99AF4", [
      createExercise(
        "agachamento",
        "Agachamento livre",
        4,
        8,
        [70, 80, 90],
        [20, 8, 1],
      ),
      createExercise(
        "leg-press",
        "Leg press",
        4,
        12,
        [120, 140, 160],
        [20, 8, 1],
      ),
      createExercise(
        "cadeira-extensora",
        "Cadeira extensora",
        3,
        12,
        [40, 45, 50],
        [18, 7, 1],
      ),
    ]),
  ],
};
