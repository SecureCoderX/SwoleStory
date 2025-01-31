import { Database, Exercise } from '../../types/database';

export interface ExerciseSet {
  id: string;
  session_id: string;
  exercise_id: string;
  set_number: number;
  weight: number;
  reps: number;
  rpe: number | null;
  set_notes: string | null;
  created_at: string;
  exercise?: Exercise;  // Optional reference to the related exercise
}

export type WorkoutSession = Database['public']['Tables']['workout_sessions']['Row'] & {
    id: string;
    date: string;
    program_day: string;
    readiness_score: number | null;
    sleep_quality: number | null;
    notes: string | null;
    created_at: string;
    updated_at: string | null;
    created_by: string;
    exercise_sets?: ExerciseSet[];
    exercises?: Exercise[]; // Add this line to include the relationship
  }
