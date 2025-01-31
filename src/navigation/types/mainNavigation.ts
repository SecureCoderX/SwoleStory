export type HomeStackParamList = {
    Dashboard: undefined;
    WorkoutDetails: {
      workoutId: string;
    };
    ExerciseDetails: {
      exerciseId: string;
    };
  };

  // Types for the Workouts stack
  export type WorkoutStackParamList = {
    Workouts: undefined;
    StartWorkout: undefined;
    ActiveWorkout: {
      workoutId: string;
    };
    ExerciseSelection: {
      workoutId: string;
    };
    ExerciseLogging: {
      workoutId: string;
      exerciseId: string;
    };
  };

  // Types for the Progress stack
  export type ProgressStackParamList = {
    Progress: undefined;
    ExerciseProgress: {
      exerciseId: string;
    };
    BodyMetrics: undefined;
    ProgressPhotos: undefined;
  };

  // Types for the Profile stack
  export type ProfileStackParamList = {
    Profile: undefined;
    Settings: undefined;
    EditProfile: undefined;
    ProgramSettings: undefined;
  };

  // Combined type for the bottom tab navigator
  export type MainTabParamList = {
    HomeTab: undefined;
    WorkoutsTab: undefined;
    ProgressTab: undefined;
    ProfileTab: undefined;
  };

  // Helper type to extract screen names
  export type HomeScreens = keyof HomeStackParamList;
  export type WorkoutScreens = keyof WorkoutStackParamList;
  export type ProgressScreens = keyof ProgressStackParamList;
  export type ProfileScreens = keyof ProfileStackParamList;
  export type MainTabScreens = keyof MainTabParamList;
