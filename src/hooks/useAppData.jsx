import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { appStorage } from "../storage/appStorage";
import { workoutService } from "../services/workoutService";
const AppContext = createContext(undefined);
const emptyData = { workouts: [] };
export function AppProvider({ children }) {
  const [data, setData] = useState(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    appStorage
      .load()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);
  const changeData = (operation) => {
    setData((current) => {
      const next = operation(current);
      void appStorage.save(next);
      return next;
    });
  };
  const value = useMemo(
    () => ({
      ...data,
      isLoading,
      createWorkout: (input) =>
        changeData((current) => workoutService.createWorkout(current, input)),
      updateWorkout: (id, input) =>
        changeData((current) =>
          workoutService.updateWorkout(current, id, input),
        ),
      deleteWorkout: (id) =>
        changeData((current) => workoutService.deleteWorkout(current, id)),
      addExercise: (workoutId, input) =>
        changeData((current) =>
          workoutService.addExercise(current, workoutId, input),
        ),
      updateExercise: (workoutId, exerciseId, input) =>
        changeData((current) =>
          workoutService.updateExercise(current, workoutId, exerciseId, input),
        ),
      deleteExercise: (workoutId, exerciseId) =>
        changeData((current) =>
          workoutService.deleteExercise(current, workoutId, exerciseId),
        ),
    }),
    [data, isLoading],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppData() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppData deve ser usado dentro de AppProvider");
  return context;
}
