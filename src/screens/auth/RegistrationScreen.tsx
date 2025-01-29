import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { supabase } from '../../lib/supabase';
import { AuthHeader } from './components/AuthHeader';

type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  RegistrationSuccess: { email: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import {
  authStyles,
  inputTheme,
  RegistrationFormData,
  formatAuthError,
} from './components/AuthStyles';
import { theme } from '../../theme/theme';
import { AuthError } from '@supabase/supabase-js';

export function RegistrationScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleRegistration = async () => {
    setError(null);

    if (!validateForm()) {return;}

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          // You can add additional sign-up data here
          data: {
            joined_date: new Date().toISOString(),
          },
        },
      });

      if (authError) {throw authError;}

      // Navigate to a verification screen or main app depending on your flow
      navigation.navigate('RegistrationSuccess', { email: formData.email });
    } catch (err) {
      setError(formatAuthError(err as AuthError));
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={authStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader
                  title="SwoleStory"
                  subtitle="Sign in to continue your journey"
                />

        <View style={authStyles.formContainer}>
          <TextInput
            mode="outlined"
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={authStyles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            theme={inputTheme}
          />

          <TextInput
            mode="outlined"
            label="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            style={authStyles.input}
            theme={inputTheme}
          />

          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
            secureTextEntry
            style={authStyles.input}
            theme={inputTheme}
          />

          {error && <Text style={authStyles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={authStyles.button}
            onPress={handleRegistration}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.textPrimary} />
            ) : (
              <Text style={authStyles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={authStyles.linkButton}
            onPress={navigateToLogin}
          >
            <Text style={authStyles.linkText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
