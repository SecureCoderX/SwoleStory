import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

interface EnvironmentConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

function validateEnvironmentVariables(): EnvironmentConfig {
  if (!SUPABASE_URL) {
    throw new Error('SUPABASE_URL is not defined in environment variables');
  }
  if (!SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_ANON_KEY is not defined in environment variables');
  }

  return {
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
  };
}

export const env = validateEnvironmentVariables();
