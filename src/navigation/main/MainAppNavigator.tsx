import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Dumbbell, LineChart, User } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import type {
  HomeStackParamList,
  WorkoutStackParamList,
  ProgressStackParamList,
  ProfileStackParamList,
  MainTabParamList,
} from '../types/mainTypes';
import DashboardScreen from '../../screens/home/DashboardScreen';

// Create our typed navigators
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();
const ProgressStack = createNativeStackNavigator<ProgressStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Placeholder components for our main screens
const WorkoutsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Workouts</Text>
  </View>
);

const ProgressScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Progress</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Profile</Text>
  </View>
);

// Stack navigators for each tab
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </HomeStack.Navigator>
  );
}

function WorkoutStackNavigator() {
  return (
    <WorkoutStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <WorkoutStack.Screen
        name="Workouts"
        component={WorkoutsScreen}
      />
    </WorkoutStack.Navigator>
  );
}

function ProgressStackNavigator() {
  return (
    <ProgressStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProgressStack.Screen
        name="Progress"
        component={ProgressScreen}
      />
    </ProgressStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}

const renderTabBarIcon = (route: any) => {
  return ({ color, size }: { color: string; size: number }) => {
    // Return the appropriate icon component based on the route
    switch (route.name) {
      case 'HomeTab':
        return <Home color={color} size={size} />;
      case 'WorkoutsTab':
        return <Dumbbell color={color} size={size} />;
      case 'ProgressTab':
        return <LineChart color={color} size={size} />;
      case 'ProfileTab':
        return <User color={color} size={size} />;
      default:
        return <Home color={color} size={size} />;
    }
  };
};

// Main tab navigator - Note: No NavigationContainer here since it's already provided by RootNavigator
const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route),
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          ...theme.typography.labelMedium,
          fontFamily: Platform.select({
            ios: 'System',
            android: 'Roboto',
          }),
        },
        tabBarActiveTintColor: theme.colors.coral,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="WorkoutsTab"
        component={WorkoutStackNavigator}
        options={{
          tabBarLabel: 'Workouts',
        }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressStackNavigator}
        options={{
          tabBarLabel: 'Progress',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  screenText: {
    ...theme.typography.headingLarge,
    color: theme.colors.textPrimary,
  },
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 0,
    height: 60,
    paddingBottom: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    ...theme.shadows.small,
  },
});

export default MainAppNavigator;
