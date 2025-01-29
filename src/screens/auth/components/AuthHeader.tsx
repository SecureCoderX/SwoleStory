import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../../../components/common/Logo';
import { theme } from '../../../theme/theme';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={100} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  appName: {
    ...theme.typography.headingLarge,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  title: {
    ...theme.typography.displayMedium,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.bodyLarge,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
