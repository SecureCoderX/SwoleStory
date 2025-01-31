export type HomeStackParamList = {
  Dashboard: undefined;  // Dashboard doesn't need params
  WorkoutDetails: {
    workoutId: string;  // For viewing past workout details
  };
  StartWorkout: {
    programDay?: string;  // Optional parameter for pre-selecting workout type
  };
};

  export type WorkoutStackParamList = {
    Workouts: undefined;  // Main workouts list screen
  };

  export type ProgressStackParamList = {
    Progress: undefined;  // Main progress screen
  };

  export type ProfileStackParamList = {
    Profile: undefined;  // Main profile screen
  };

  export type MainTabParamList = {
    HomeTab: undefined;
    WorkoutsTab: undefined;
    ProgressTab: undefined;
    ProfileTab: undefined;
  };
