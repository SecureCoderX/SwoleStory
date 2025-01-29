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
  },

  configuration: {
    async get(key: string) {
      const { data, error } = await supabase
        .from('program_configuration')
        .select()
        .eq('key', key)
        .single();

      if (error) {throw error;}
      return data;
    },

    async getAll() {
      const { data, error } = await supabase
        .from('program_configuration')
        .select();

      if (error) {throw error;}
      return data;
    },
  },
};

// Export types for use in components
export type { Database };
