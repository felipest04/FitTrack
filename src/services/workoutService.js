import { createId } from "../utils/id";
export const workoutService = {
  createWorkout(data, input) {
    const now = new Date().toISOString();
    return {
      workouts: [
        ...data.workouts,
        {
          id: createId("workout"),
          ...input,
          exercises: [],
          createdAt: now,
          updatedAt: now,
        },
      ],
    };
  },
  updateWorkout(data, workoutId, input) {
    return {
      workouts: data.workouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, ...input, updatedAt: new Date().toISOString() }
          : workout,
      ),
    };
  },
  deleteWorkout(data, workoutId) {
    return {
      workouts: data.workouts.filter((workout) => workout.id !== workoutId),
    };
  },
  addExercise(data, workoutId, input) {
    const now = new Date().toISOString();
    const exercise = {
      id: createId("exercise"),
      ...input,
      updatedAt: now,
      history: [
        { id: createId("record"), weight: input.weight, recordedAt: now },
      ],
    };
    return {
      workouts: data.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: [...workout.exercises, exercise],
              updatedAt: now,
            }
          : workout,
      ),
    };
  },
  updateExercise(data, workoutId, exerciseId, input) {
    const now = new Date().toISOString();
    return {
      workouts: data.workouts.map((workout) => {
        if (workout.id !== workoutId) return workout;
        return {
          ...workout,
          updatedAt: now,
          exercises: workout.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) return exercise;
            const loadChanged = exercise.weight !== input.weight;
            return {
              ...exercise,
              ...input,
              updatedAt: now,
              history: loadChanged
                ? [
                    ...exercise.history,
                    {
                      id: createId("record"),
                      weight: input.weight,
                      recordedAt: now,
                    },
                  ]
                : exercise.history,
            };
          }),
        };
      }),
    };
  },
  deleteExercise(data, workoutId, exerciseId) {
    const now = new Date().toISOString();
    return {
      workouts: data.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              updatedAt: now,
              exercises: workout.exercises.filter(
                (exercise) => exercise.id !== exerciseId,
              ),
            }
          : workout,
      ),
    };
  },
};
