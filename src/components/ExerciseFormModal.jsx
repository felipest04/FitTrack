import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { colors, spacing } from "../constants/theme";
import { AppButton } from "./AppButton";
import { FormField } from "./FormField";
import { FormModal } from "./FormModal";
export function ExerciseFormModal({ visible, exercise, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  useEffect(() => {
    setName(exercise?.name ?? "");
    setSets(exercise?.sets.toString() ?? "");
    setReps(exercise?.reps.toString() ?? "");
    setWeight(exercise?.weight.toString() ?? "");
  }, [exercise, visible]);
  const submit = () => {
    const input = {
      name: name.trim(),
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
    };
    if (!input.name || input.sets <= 0 || input.reps <= 0 || input.weight < 0)
      return;
    onSubmit(input);
    onClose();
  };
  return (
    <FormModal
      visible={visible}
      title={exercise ? "Editar exercício" : "Novo exercício"}
      onClose={onClose}
    >
      <FormField
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Elevação lateral"
      />
      <FormField
        label="Séries"
        value={sets}
        onChangeText={setSets}
        keyboardType="number-pad"
        placeholder="3"
      />
      <FormField
        label="Repetições"
        value={reps}
        onChangeText={setReps}
        keyboardType="number-pad"
        placeholder="12"
      />
      <FormField
        label="Carga (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="20"
      />
      {exercise && Number(weight) !== exercise.weight ? (
        <Text style={styles.hint}>
          A alteração da carga será registrada no histórico.
        </Text>
      ) : null}
      <AppButton
        label={exercise ? "Salvar e registrar" : "Adicionar exercício"}
        icon="checkmark"
        onPress={submit}
      />
    </FormModal>
  );
}
const styles = StyleSheet.create({
  hint: {
    color: colors.primary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
});
