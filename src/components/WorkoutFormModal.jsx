import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, workoutColors } from "../constants/theme";
import { AppButton } from "./AppButton";
import { FormField } from "./FormField";
import { FormModal } from "./FormModal";
export function WorkoutFormModal({ visible, workout, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [color, setColor] = useState(workoutColors[0]);
  useEffect(() => {
    setName(workout?.name ?? "");
    setFocus(workout?.focus ?? "");
    setColor(workout?.color ?? workoutColors[0]);
  }, [workout, visible]);
  const submit = () => {
    if (!name.trim() || !focus.trim()) return;
    onSubmit({ name: name.trim(), focus: focus.trim(), color });
    onClose();
  };
  return (
    <FormModal
      visible={visible}
      title={workout ? "Editar treino" : "Novo treino"}
      onClose={onClose}
    >
      <FormField
        label="Nome"
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Treino D"
      />
      <FormField
        label="Foco muscular"
        value={focus}
        onChangeText={setFocus}
        placeholder="Ex.: Ombros e abdômen"
      />
      <Text style={styles.label}>COR DE DESTAQUE</Text>
      <View style={styles.colors}>
        {workoutColors.map((item) => (
          <Pressable
            key={item}
            onPress={() => setColor(item)}
            style={[
              styles.color,
              { backgroundColor: item },
              color === item && styles.selected,
            ]}
          />
        ))}
      </View>
      <AppButton
        label={workout ? "Salvar alterações" : "Criar treino"}
        icon="checkmark"
        onPress={submit}
      />
    </FormModal>
  );
}
const styles = StyleSheet.create({
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  colors: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.lg },
  color: { borderRadius: radius.pill, height: 34, width: 34 },
  selected: { borderColor: colors.white, borderWidth: 3 },
});
