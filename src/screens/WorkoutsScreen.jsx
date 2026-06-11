import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingScreen } from "../components/LoadingScreen";
import { ScreenContainer } from "../components/ScreenContainer";
import { SectionHeader } from "../components/SectionHeader";
import { WorkoutCard } from "../components/WorkoutCard";
import { WorkoutFormModal } from "../components/WorkoutFormModal";
import { spacing } from "../constants/theme";
import { useAppData } from "../hooks/useAppData";
export function WorkoutsScreen() {
  const navigation = useNavigation();
  const { workouts, createWorkout, isLoading } = useAppData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (isLoading) return <LoadingScreen />;
  return (
    <ScreenContainer>
      <SectionHeader
        title="Meus treinos"
        subtitle="Organize suas fichas e acompanhe cada exercício."
      />
      <View style={styles.button}>
        <AppButton
          label="Criar novo treino"
          icon="add"
          onPress={() => setIsFormOpen(true)}
        />
      </View>
      {workouts.length ? (
        workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onPress={() =>
              navigation.navigate("WorkoutDetails", { workoutId: workout.id })
            }
          />
        ))
      ) : (
        <EmptyState
          title="Nenhum treino cadastrado"
          description="Crie seu primeiro treino para começar a organizar sua rotina."
        />
      )}
      <WorkoutFormModal
        visible={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={createWorkout}
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({ button: { marginBottom: spacing.lg } });
