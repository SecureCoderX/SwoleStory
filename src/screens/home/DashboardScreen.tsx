import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDatabase } from '../../contexts/DatabaseContext';
import { theme } from '../../theme/theme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/types/mainTypes';

// Define the navigation type for type safety with React Navigation
type DashboardScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Dashboard'
>;

// Define the possible workout types in our PPL program
type PPLWorkoutType = 'Push A' | 'Pull A' | 'Legs A' | 'Push B' | 'Pull B' | 'Legs B';

// Type definitions for workout summaries and program details
interface WorkoutSummary {
  id: string;
  date: string;
  programDay: PPLWorkoutType;
  exerciseCount: number;
  readinessScore?: number;
}

interface ProgramExercise {
  id: string;
  name: string;
  category: string;
  defaultSets: number;
  repRange: string;
  restPeriod: number;
  targetRPE: number;
}

interface WorkoutProgram {
  type: PPLWorkoutType;
  exercises: ProgramExercise[];
}

// Helper function to determine the next workout in the PPL sequence
function getNextWorkoutInSequence(currentWorkout: string): PPLWorkoutType {
  const sequence: PPLWorkoutType[] = [
    'Push A', 'Pull A', 'Legs A',
    'Push B', 'Pull B', 'Legs B',
  ];

  const currentIndex = sequence.indexOf(currentWorkout as PPLWorkoutType);
  if (currentIndex === -1) {return sequence[0];}

  return sequence[(currentIndex + 1) % sequence.length];
}

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  // Get all necessary data from DatabaseContext
  const { workoutSessions, exercises, isLoading, error } = useDatabase();

  // State management for the dashboard
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSummary[]>([]);
  const [nextWorkout, setNextWorkout] = useState<PPLWorkoutType>('Push A');
  const [_lastWorkout, setLastWorkout] = useState<WorkoutSummary | null>(null);
  const [currentProgram, setCurrentProgram] = useState<WorkoutProgram | null>(null);
  const [averageReadiness, setAverageReadiness] = useState<number | null>(null);

  // Helper function to format rest periods into human-readable format
  const formatRestPeriod = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0
      ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
      : `${minutes} min`;
  };

  // Function to get exercises for a specific workout type from the database
  const getExercisesForWorkout = useCallback((workoutType: PPLWorkoutType): ProgramExercise[] => {
    if (!exercises) {return [];}

    // Extract the movement pattern (Push/Pull/Legs) and variant (A/B)
    const [pattern, variant] = workoutType.split(' ');

    // Filter exercises based on category and transform to program format
    return exercises
      .filter(exercise => {
        // Match both the movement pattern and workout variant
        const matchesPattern = exercise.category.toLowerCase().includes(pattern.toLowerCase());
        const matchesVariant = exercise.progression_type.includes(variant) ||
                             exercise.progression_type === 'both';
        return matchesPattern && matchesVariant;
      })
      .map(exercise => ({
        id: exercise.id,
        name: exercise.name,
        category: exercise.category,
        defaultSets: exercise.default_sets,
        repRange: exercise.rep_range,
        restPeriod: exercise.rest_period,
        targetRPE: exercise.target_rpe,
      }));
  }, [exercises]);

  useEffect(() => {
    const processWorkoutData = () => {
      if (!workoutSessions?.length) {
        // No previous workouts - set up initial program
        const initialExercises = getExercisesForWorkout('Push A');
        setCurrentProgram({
          type: 'Push A',
          exercises: initialExercises,
        });
        return;
      }

      // Process recent workouts
      const recent = workoutSessions
        .slice(0, 5)
        .map(session => ({
          id: session.id,
          date: new Date(session.date).toLocaleDateString(),
          programDay: session.program_day as PPLWorkoutType,
          exerciseCount: session.exercise_sets?.length ?? 0,
          readinessScore: session.readiness_score ?? undefined,
        }));

      setRecentWorkouts(recent);

      // Determine next workout based on most recent
      const mostRecent = recent[0];
      setLastWorkout(mostRecent);
      const nextInSequence = getNextWorkoutInSequence(mostRecent.programDay);
      setNextWorkout(nextInSequence);

      // Get exercises for next workout
      const programExercises = getExercisesForWorkout(nextInSequence);
      setCurrentProgram({
        type: nextInSequence,
        exercises: programExercises,
      });

      // Calculate average readiness
      const readinessScores = recent
        .map(w => w.readinessScore)
        .filter((score): score is number => score != null);

      if (readinessScores.length > 0) {
        const avg = readinessScores.reduce((a, b) => a + b, 0) / readinessScores.length;
        setAverageReadiness(Math.round(avg));
      }
    };

    if (!isLoading && workoutSessions && exercises) {
      processWorkoutData();
    }
  }, [workoutSessions, exercises, isLoading, getExercisesForWorkout]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.coral} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Failed to load dashboard data. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Next Workout Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Workout</Text>
        <View style={styles.workoutPreview}>
          <Text style={styles.workoutType}>{nextWorkout}</Text>

          {currentProgram && (
            <View style={styles.programContainer}>
              {/* Exercise List */}
              <View style={styles.exerciseList}>
                {currentProgram.exercises.map((exercise) => (
                  <View key={exercise.id} style={styles.exerciseItem}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <View style={styles.exerciseDetails}>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Sets</Text>
                        <Text style={styles.detailValue}>{exercise.defaultSets}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Reps</Text>
                        <Text style={styles.detailValue}>{exercise.repRange}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>RPE</Text>
                        <Text style={styles.detailValue}>{exercise.targetRPE}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Rest</Text>
                        <Text style={styles.detailValue}>
                          {formatRestPeriod(exercise.restPeriod)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('StartWorkout', {
                  programDay: nextWorkout,
                })}
              >
                <Text style={styles.actionButtonText}>
                  Start {nextWorkout}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Readiness Score Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Readiness</Text>
        <View style={styles.readinessContainer}>
          <Text style={styles.readinessScore}>
            {averageReadiness ? `${averageReadiness}%` : 'N/A'}
          </Text>
          <Text style={styles.readinessLabel}>
            Based on recent workouts
          </Text>
        </View>
      </View>

      {/* Recent Workouts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Workouts</Text>
        {recentWorkouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}
            onPress={() => navigation.navigate('WorkoutDetails', {
              workoutId: workout.id,
            })}
          >
            <View>
              <Text style={styles.workoutTitle}>{workout.programDay}</Text>
              <Text style={styles.workoutSubtitle}>
                {workout.exerciseCount} exercises
              </Text>
            </View>
            <Text style={styles.workoutDate}>{workout.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  section: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  workoutPreview: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
  },
  workoutType: {
    ...theme.typography.headingLarge,
    color: theme.colors.coral,
    marginBottom: theme.spacing.md,
  },
  programContainer: {
    marginTop: theme.spacing.md,
  },
  exerciseList: {
    gap: theme.spacing.md,
  },
  exerciseItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.coral,
  },
  exerciseName: {
    ...theme.typography.bodyLarge,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  exerciseDetails: {
    gap: theme.spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  detailLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  detailValue: {
    ...theme.typography.bodyMedium,
    color: theme.colors.coral,
  },
  sectionTitle: {
    ...theme.typography.headingMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  actionButton: {
    backgroundColor: theme.colors.coral,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  actionButtonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.textPrimary,
  },
  readinessContainer: {
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  readinessScore: {
    ...theme.typography.displayLarge,
    color: theme.colors.coral,
    marginBottom: theme.spacing.sm,
  },
  readinessLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  workoutTitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.textPrimary,
  },
  workoutSubtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  workoutDate: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  errorText: {
    ...theme.typography.bodyLarge,
    color: theme.colors.error,
    textAlign: 'center',
  },
});

export default DashboardScreen;

