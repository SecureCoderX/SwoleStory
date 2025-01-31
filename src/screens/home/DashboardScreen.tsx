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
import { ExerciseCard } from '../../components/workout/ExerciseCard';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/types/mainTypes';
import type { WorkoutSession, Exercise } from '../../types/database';

type DashboardScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Dashboard'
>;

// Define our workout types for the PPL program
type PPLWorkoutType = 'Push A' | 'Pull A' | 'Legs A' | 'Push B' | 'Pull B' | 'Legs B';

// Types for exercise tracking
interface ExerciseSet {
  setNumber: number;
  weight: number;
  reps: number;
  rpe: number | null;
}

interface WorkoutExercise {
  id: string;
  name: string;
  targetSets: number;
  repRange: string;
  targetRPE: number;
  sets: ExerciseSet[];
  isComplete: boolean;
}

interface WorkoutSummary {
  id: string;
  date: string;
  programDay: string;
  exerciseCount: number;
  readinessScore?: number;
}

// Define the database context value interface
interface DatabaseContextValue {
  workoutSessions: WorkoutSession[];
  exercises: Exercise[];
  isLoading: boolean;
  error: Error | null;
}

// Helper function to get next workout in sequence
const getNextWorkoutInSequence = (currentWorkout: string): PPLWorkoutType => {
  const sequence: PPLWorkoutType[] = [
    'Push A', 'Pull A', 'Legs A',
    'Push B', 'Pull B', 'Legs B',
  ];

  const currentIndex = sequence.indexOf(currentWorkout as PPLWorkoutType);
  if (currentIndex === -1) {return sequence[0];}
  return sequence[(currentIndex + 1) % sequence.length];
};

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { workoutSessions, exercises, isLoading, error }: DatabaseContextValue = useDatabase();

  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutSummary[]>([]);
  const [nextWorkout, setNextWorkout] = useState<PPLWorkoutType>('Push A');
  const [lastWorkout, setLastWorkout] = useState<WorkoutSummary | null>(null);
  const [currentExercises, setCurrentExercises] = useState<WorkoutExercise[]>([]);
  const [averageReadiness, setAverageReadiness] = useState<number | null>(null);

  // Memoize the loadExercisesForWorkout function to prevent unnecessary re-renders
  const loadExercisesForWorkout = useCallback((workoutType: PPLWorkoutType) => {
    if (!exercises) {return;}

    const workoutExercises = exercises
      .filter(ex => ex.category === workoutType)
      .map(ex => ({
        id: ex.id,
        name: ex.name,
        targetSets: ex.default_sets,
        repRange: ex.rep_range,
        targetRPE: ex.target_rpe,
        sets: Array.from({ length: ex.default_sets }, (_, i) => ({
          setNumber: i + 1,
          weight: 0,
          reps: 0,
          rpe: null,
        })),
        isComplete: false,
      }));

    setCurrentExercises(workoutExercises);
  }, [exercises]);

  // Process workout data and load exercises
  useEffect(() => {
    const processWorkoutData = () => {
      if (!workoutSessions?.length) {
        loadExercisesForWorkout('Push A');
        return;
      }

      // Process recent workouts
      const recent = workoutSessions
        .slice(0, 5)
        .map(session => ({
          id: session.id,
          date: new Date(session.date).toLocaleDateString(),
          programDay: session.program_day,
          exerciseCount: session.exercise_sets?.length ?? 0,
          readinessScore: session.readiness_score ?? undefined,
        }));

      setRecentWorkouts(recent);

      // Set the last completed workout and determine next in sequence
      const mostRecent = recent[0];
      setLastWorkout(mostRecent);
      const nextInSequence = getNextWorkoutInSequence(mostRecent.programDay);
      setNextWorkout(nextInSequence);

      // Load exercises for the next workout
      loadExercisesForWorkout(nextInSequence);

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
  }, [workoutSessions, exercises, isLoading, loadExercisesForWorkout]);

  const handleStartExercise = useCallback((exercise: WorkoutExercise) => {
    // Handle starting the exercise - we'll implement the modal next
    console.log('Starting exercise:', exercise.name);
  }, []);

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

          {lastWorkout && (
            <View style={styles.previousWorkout}>
              <Text style={styles.previousWorkoutLabel}>
                Previous: {lastWorkout.programDay}
              </Text>
              <Text style={styles.previousWorkoutDate}>
                {lastWorkout.date}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Today's Exercises Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Exercises</Text>
        {currentExercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            {...exercise}
            onStartExercise={() => handleStartExercise(exercise)}
          />
        ))}
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
  sectionTitle: {
    ...theme.typography.headingMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  workoutType: {
    ...theme.typography.headingLarge,
    color: theme.colors.coral,
    marginBottom: theme.spacing.md,
  },
  previousWorkout: {
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.textSecondary,
  },
  previousWorkoutLabel: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
  },
  previousWorkoutDate: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
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
