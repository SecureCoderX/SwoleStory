import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import type { RootStackParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';

type RegistrationSuccessRouteProp = RouteProp<RootStackParamList, 'RegistrationSuccess'>;

export function RegistrationSuccessScreen() {
  const route = useRoute<RegistrationSuccessRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scaleAnim = new Animated.Value(0);

  // Get the email from navigation params
  const { email } = route.params;

  useEffect(() => {
    // Animate the success checkmark
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Navigate to login screen after a delay
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);

    return () => clearTimeout(timer);
  },);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
        <Icon name="check-circle" size={80} color={theme.colors.success} />
      </Animated.View>

      <Text style={styles.title}>Registration Successful!</Text>
      <Text style={styles.message}>
        We've sent a verification email to{'\n'}
        <Text style={styles.email}>{email}</Text>
      </Text>
      <Text style={styles.subtitle}>
        Please check your inbox and verify your email address to continue.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    ...theme.typography.displayMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  message: {
    ...theme.typography.bodyLarge,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  email: {
    color: theme.colors.coral,
    fontWeight: '600',
  },
  subtitle: {
    ...theme.typography.bodyMedium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
