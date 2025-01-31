export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      program_configuration: {
        Row: {
          id: string;
          key: string;
          value: Json;
          description: string | null;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          description?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          description?: string | null;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      exercises: {
        Row: {
          id: string;
          name: string;
          category: string;
          default_sets: number;
          rep_range: string;
          rest_period: number;
          target_rpe: number;
          progression_type: string;
          progression_scheme: Json;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          default_sets: number;
          rep_range: string;
          rest_period: number;
          target_rpe: number;
          progression_type: string;
          progression_scheme: Json;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          default_sets?: number;
          rep_range?: string;
          rest_period?: number;
          target_rpe?: number;
          progression_type?: string;
          progression_scheme?: Json;
          created_at?: string;
          updated_at?: string | null;
        };
      };
      exercise_alternatives: {
        Row: {
          id: string;
          main_exercise_id: string;
          alternative_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          main_exercise_id: string;
          alternative_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          main_exercise_id?: string;
          alternative_name?: string;
          created_at?: string;
        };
      };
      workout_sessions: {
        Row: {
          exercise_sets: any;
          id: string;
          date: string;
          program_day: string;
          readiness_score: number | null;
          sleep_quality: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string | null;
          created_by: string;
        };
        Insert: {
          id?: string;
          date?: string;
          program_day: string;
          readiness_score?: number | null;
          sleep_quality?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string | null;
          created_by: string;
        };
        Update: {
          id?: string;
          date?: string;
          program_day?: string;
          readiness_score?: number | null;
          sleep_quality?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string | null;
          created_by?: string;
        };
      };
    };
  };
}

// Domain-specific types that extend the database types
export type Exercise = Database['public']['Tables']['exercises']['Row'] & {
  alternatives?: ExerciseAlternative[];
}

export type ExerciseAlternative = Database['public']['Tables']['exercise_alternatives']['Row']

export type WorkoutSession = Database['public']['Tables']['workout_sessions']['Row'] & {
  exercises?: Exercise[];
}

export type ProgramConfiguration = Database['public']['Tables']['program_configuration']['Row']

// Progression scheme types for type safety
export interface ProgressionScheme {
  type: string;
  increment: number;
  conditions: {
    rpe_range: {
      min: number;
      max: number;
    };
    reps_required: number;
    sets_required: number;
    deload_trigger: {
      type: string;
      value: number;
      action: string;
    };
    failure_response: {
      type: string;
      percentage: number;
    };
  };
}
