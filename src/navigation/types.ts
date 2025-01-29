import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// This type defines all the screens in our app and their parameter types
export type RootStackParamList = {
    // Authentication flow screens
    Splash: undefined;  // Splash screen doesn't accept any parameters
    Login: undefined;   // Login screen doesn't accept any parameters
    Registration: undefined;  // Registration screen doesn't accept any parameters
    RegistrationSuccess: {
      email: string;  // Registration success needs to know which email was registered
    };
    MainApp: undefined;  // Main app entry point doesn't accept parameters
  };

  // This type represents all possible screen names in our app
  export type RootScreens = keyof RootStackParamList;

  // Helper type to get navigation prop types for a specific screen
  export type RootStackScreenProps<T extends RootScreens> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
  };

  // We can also define specific navigation prop types for each screen
  export type SplashScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Splash'
  >;

  export type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;

  export type RegistrationScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Registration'
  >;

  export type MainAppScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'MainApp'
  >;
