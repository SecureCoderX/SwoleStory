/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, supabase } from '../lib/supabase';
import type { Database } from '../types/database';

interface DatabaseContextValue {
  workoutSessions: Database['public']['Tables']['workout_sessions']['Row'][];
  exercises: Database['public']['Tables']['exercises']['Row'][];
  programConfiguration: Database['public']['Tables']['program_configuration']['Row'][];
  isLoading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextValue | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [exercises, setExercises] = useState<Database['public']['Tables']['exercises']['Row'][]>([]);
  const [programConfiguration, setProgramConfiguration] = useState<Database['public']['Tables']['program_configuration']['Row'][]>([]);
  const [workoutSessions, setWorkoutSessions] = useState<Database['public']['Tables']['workout_sessions']['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Starting to load initial data...');

      const [exercisesData, configData, sessionsData] = await Promise.all([
        db.exercises.getAll(),
        db.configuration.getAll(),
        db.workoutSessions.getRecent(),
      ]);

      console.log('Data loaded:', {
        exercisesCount: exercisesData?.length ?? 0,
        configCount: configData?.length ?? 0,
        sessionsCount: sessionsData?.length ?? 0,
      });

      setExercises(exercisesData);
      setProgramConfiguration(configData);
      setWorkoutSessions(sessionsData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err : new Error('Failed to load data'));
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial data when the component mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    const exercisesSubscription = supabase
      .channel('exercises-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'exercises' },
        _payload => {
          // Refresh exercises data when changes occur
          loadInitialData();
        }
      )
      .subscribe();

    const configSubscription = supabase
      .channel('config-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'program_configuration' },
        _payload => {
          // Refresh configuration data when changes occur
          loadInitialData();
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      exercisesSubscription.unsubscribe();
      configSubscription.unsubscribe();
    };
  }, []); // Add empty dependency array

  const fetchWorkoutSessions = async () => {
    const { data, error: fetchError } = await supabase
      .from('workout_sessions')
      .select(`
        *,
        exercise_sets (
          *,
          exercise:exercises (*)
        )
      `)
      .order('date', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }
    return data;
  };

  const contextValue: DatabaseContextValue = {
    exercises,
    programConfiguration,
    workoutSessions,
    isLoading,
    error,
    refreshData: loadInitialData,
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
}

// Custom hook for accessing the database context
export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
