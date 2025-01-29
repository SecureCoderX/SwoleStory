import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegistrationScreen } from '../screens/auth/RegistrationScreen';
import { RegistrationSuccessScreen } from '../screens/auth/RegistrationSuccessScreen';
import type { RootStackParamList } from './types';
import { Platform } from 'react-native';

// Create our stack navigator with proper typing
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  // Define the navigation theme based on our app's theme
  const navigationTheme = {
    dark: true,
    colors: {
      primary: theme.colors.coral,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.textPrimary,
      border: theme.colors.surface,
      notification: theme.colors.coral,
    },
    fonts: {
      // These are the default fonts used by React Navigation
      regular: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto',
          default: 'System',
        }),
        fontWeight: '400' as '400',
      },
      medium: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto',
          default: 'System',
        }),
        fontWeight: '500' as '500',
      },
      bold: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto',
          default: 'System',
        }),
        fontWeight: '700' as '700',
      },
      heavy: {
        fontFamily: Platform.select({
          ios: 'System',
          android: 'Roboto',
          default: 'System',
        }),
        fontWeight: '900' as '900',
      },
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,  // Hide headers by default
          contentStyle: {
            backgroundColor: theme.colors.background,  // Consistent background color
          },
          // Add smooth transitions between screens
          animation: 'fade',
          animationDuration: 200,
        }}
      >
        {/* Authentication Flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen
          name="RegistrationSuccess"
          component={RegistrationSuccessScreen}
          options={{
            animation: 'slide_from_right',  // Special animation for success screen
          }}
        />

        {/* Main App Screen */}
        <Stack.Screen
          name="MainApp"
          component={MainAppNavigator}
          options={{
            animation: 'fade',  // Smooth transition to main app
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Placeholder for the main app navigator - you'll implement this later
function MainAppNavigator() {
  return null;  // This will be replaced with your main app navigation structure
}
