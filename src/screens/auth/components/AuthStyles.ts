import { Platform, StyleSheet } from 'react-native';
import { theme } from '../../../theme/theme';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
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
    marginBottom: theme.spacing.lg,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.md,
  },
  input: {
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },
  button: {
    backgroundColor: theme.colors.coral,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    height: 48, // Fixed height for consistency
  },
  buttonText: {
    ...theme.typography.labelLarge,
    color: theme.colors.textPrimary,
  },
linkButton: {
  alignItems: 'center',
  marginTop: theme.spacing.lg,
  padding: theme.spacing.sm,
},
linkText: {
  color: theme.colors.textPrimary,
},
errorText: {
  ...theme.typography.bodyMedium,
  color: theme.colors.error,
  textAlign: 'center',
  marginBottom: theme.spacing.md,
},
logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: theme.colors.coral,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.coral,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoInner: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.background,
  },
  // ... rest of your styles
});

// Shared input theme configuration
export const inputTheme = {
  colors: {
    primary: theme.colors.coral,
    text: theme.colors.textPrimary,
    background: theme.colors.surface,
  },
};

// Type definitions for authentication forms
export interface AuthFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData extends AuthFormData {
  confirmPassword: string;
}

// Error handling utilities
export function formatAuthError(error: any): string {
  const errorMessage = error?.message || 'An unexpected error occurred';
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
}
