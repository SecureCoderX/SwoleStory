import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { Database } from '../types/database';
import { env } from '../config/env';

const supabaseUrl = env.supabaseUrl;
const supabaseAnonKey = env.supabaseAnonKey;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
});

// Type-safe database query helpers
export const db = {
  exercises: {
    async getAll() {
      const { data, error } = await supabase
        .from('exercises')
        .select('*, exercise_alternatives(*)');

      if (error) {throw error;}
      return data;
    },

    async getByCategory(category: string) {
      const { data, error } = await supabase
        .from('exercises')
        .select('*, exercise_alternatives(*)')
        .eq('category', category);

      if (error) {throw error;}
      return data;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('exercises')
        .select('*, exercise_alternatives(*)')
        .eq('id', id)
        .single();

      if (error) {throw error;}
      return data;
    },
  },

  workoutSessions: {
    async create(session: Database['public']['Tables']['workout_sessions']['Insert']) {
      const { data, error } = await supabase
        .from('workout_sessions')
        .insert(session)
        .select()
        .single();

      if (error) {throw error;}
      return data;
    },

    async getRecent(limit: number = 10) {
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*, exercise_sets(*, exercises(*))')
        .order('date', { ascending: false })
        .limit(limit);

      if (error) {throw error;}
      return data;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('workout_sessions')
        .select('*, exercise_sets(*, exercises(*))')
        .eq('id', id)
        .single();

      if (error) {throw error;}
      return data;
    },

    // Start a new workout session
    async startSession(programDay: string, readinessScore?: number) {
      const { data: session, error } = await supabase
        .from('workout_sessions')
        .insert({
          program_day: programDay,
          date: new Date().toISOString(),
          readiness_score: readinessScore,
          // Note: created_by is handled by RLS policy
        })
        .select()
        .single();

      if (error) {
        console.error('Error starting workout session:', error);
        throw error;
      }

      return session;
    },

    // Add an exercise set to the current session
    async logSet(
      sessionId: string,
      exerciseId: string,
      setData: {
        setNumber: number;
        weight: number;
        reps: number;
        rpe?: number;
        notes?: string;
      }
    ) {
      // Validate the input data before sending to database
      if (setData.weight <= 0) {throw new Error('Weight must be greater than 0');}
      if (setData.reps <= 0) {throw new Error('Reps must be greater than 0');}
      if (setData.rpe && (setData.rpe < 1 || setData.rpe > 10)) {
        throw new Error('RPE must be between 1 and 10');
      }

      const { data: set, error } = await supabase
        .from('exercise_sets')
        .insert({
          session_id: sessionId,
          exercise_id: exerciseId,
          set_number: setData.setNumber,
          weight: setData.weight,
          reps: setData.reps,
          rpe: setData.rpe,
          set_notes: setData.notes,
        })
        .select('*, exercises(*)')
        .single();

      if (error) {
        console.error('Error logging exercise set:', error);
        throw error;
      }

      return set;
    },

    // Get all sets for a specific exercise in a session
    async getExerciseSets(sessionId: string, exerciseId: string) {
      const { data: sets, error } = await supabase
        .from('exercise_sets')
        .select('*')
        .eq('session_id', sessionId)
        .eq('exercise_id', exerciseId)
        .order('set_number', { ascending: true });

      if (error) {
        console.error('Error fetching exercise sets:', error);
        throw error;
      }

      return sets;
    },

    // Update session with completion details
    async completeSession(
      sessionId: string,
      completionData: {
        notes?: string;
        sleepQuality?: number;
      }
    ) {
      const { data: session, error } = await supabase
        .from('workout_sessions')
        .update({
          ...completionData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) {
        console.error('Error completing workout session:', error);
        throw error;
      }

      return session;
    },

    // Get the most recent incomplete session if it exists
    async getCurrentSession() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: sessions, error } = await supabase
        .from('workout_sessions')
        .select('*, exercise_sets(*, exercises(*))')
        .gte('date', today.toISOString())
        .order('date', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching current session:', error);
        throw error;
      }

      return sessions?.[0] || null;
    },
  },
};



// Export types for use in components
export type { Database };
