import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Dumbbell, CheckCircle } from 'lucide-react-native';
import { theme } from '../../theme/theme';

// Define the structure of an exercise set for type safety
interface ExerciseSet {
  setNumber: number;
  weight: number;
  reps: number;
  rpe: number | null;
}

// Define the props that our ExerciseCard component accepts
interface ExerciseCardProps {
  id: string;
  name: string;
  targetSets: number;
  repRange: string;
  targetRPE: number;
  sets: ExerciseSet[];
  isComplete: boolean;
  onStartExercise: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  name,
  targetSets,
  repRange,
  targetRPE,
  sets,
  isComplete,
  onStartExercise,
}) => {
  // Calculate how many sets have been completed for progress tracking
  const completedSets = sets.filter(set => set.reps > 0).length;

  return (
    <View style={styles.card}>
      {/* Header section with exercise name and completion status */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Dumbbell
            size={20}
            color={theme.colors.coral}
            style={styles.icon}
          />
          <Text style={styles.title}>{name}</Text>
        </View>
        {isComplete && (
          <CheckCircle
            size={20}
            color={theme.colors.success}
          />
        )}
      </View>

      {/* Content section with exercise details and progress */}
      <View style={styles.content}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>Sets: {completedSets}/{targetSets}</Text>
          <Text style={styles.detailText}>Reps: {repRange}</Text>
          <Text style={styles.detailText}>RPE: {targetRPE}</Text>
        </View>

        {/* Visual indicators for set completion status */}
        <View style={styles.setIndicators}>
          {sets.map((set, index) => (
            <View
              key={index}
              style={[
                styles.setIndicator,
                set.reps > 0 ? styles.setCompleted : styles.setIncomplete,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Action button that changes based on exercise status */}
      <TouchableOpacity
        onPress={onStartExercise}
        disabled={isComplete}
        style={[
          styles.button,
          isComplete ? styles.buttonCompleted : styles.buttonActive,
        ]}
      >
        <Text style={styles.buttonText}>
          {isComplete
            ? 'Completed'
            : completedSets > 0
              ? `Continue (${completedSets}/${targetSets} sets)`
              : 'Start Exercise'
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles are organized by component section for easier maintenance
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  title: {
    ...theme.typography.bodyLarge,
    color: theme.colors.textPrimary,
  },
  content: {
    marginBottom: theme.spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  detailText: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  setIndicators: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  setIndicator: {
    flex: 1,
    height: 4,
    borderRadius: theme.borderRadius.sm,
    marginHorizontal: 1,
  },
  setCompleted: {
    backgroundColor: theme.colors.coral,
  },
  setIncomplete: {
    backgroundColor: theme.colors.surfaceLight,
  },
  button: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: theme.colors.coral,
  },
  buttonCompleted: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.surfaceLight,
  },
  buttonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.textPrimary,
  },
});

export default ExerciseCard;
