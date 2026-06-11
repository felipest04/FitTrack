export const getAllExercises = (workouts) =>
  workouts.flatMap((workout) =>
    workout.exercises.map((exercise) => ({
      ...exercise,
      workoutName: workout.name,
    })),
  );
export const getHighestLoad = (workouts) =>
  getAllExercises(workouts).reduce(
    (highest, exercise) =>
      !highest || exercise.weight > highest.weight ? exercise : highest,
    undefined,
  );
export const getLastUpdate = (workouts) =>
  getAllExercises(workouts).reduce(
    (latest, exercise) =>
      !latest || exercise.updatedAt > latest ? exercise.updatedAt : latest,
    undefined,
  );
export const getExerciseProgress = (exercise) => {
  const first = exercise.history[0]?.weight ?? exercise.weight;
  const current = exercise.weight;
  const difference = current - first;
  const percentage = first > 0 ? Math.round((difference / first) * 100) : 0;
  return { first, current, difference, percentage };
};
