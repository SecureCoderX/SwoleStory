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
import { StackNavigationProp } from '@react-navigation/stack';
import { supabase } from '../../lib/supabase';
import {
  authStyles,
  inputTheme,
  AuthFormData,
  formatAuthError,
} from './components/AuthStyles';
import { theme } from '../../theme/theme';
import { AuthError } from '@supabase/supabase-js';
import { AuthHeader } from './components/AuthHeader';

type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  MainApp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const validateForm = (): boolean => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {return;}

    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (data.session) {
        navigation.replace('MainApp');
      } else {
        throw new Error('No session found');
      }
    } catch (err) {
      setError(formatAuthError(err as AuthError));
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegistration = () => {
    if (loading) {return;}
    navigation.navigate('Registration');
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

          {error && <Text style={authStyles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={authStyles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.textPrimary} />
            ) : (
              <Text style={authStyles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={authStyles.linkButton}
            onPress={navigateToRegistration}
          >
            <Text style={authStyles.linkText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
