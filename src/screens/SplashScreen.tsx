import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Logo } from '../components/common/Logo';
import { theme } from '../utils/theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { supabase } from '../api/supabase';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

export function SplashScreen({ navigation }: Props) {
  // We create two separate animation values for the logo and text
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence the animations - logo first, then text
    Animated.sequence([
      // Logo animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Text animation starts after logo
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    checkAuthAndNavigate();
  },);

  const checkAuthAndNavigate = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {throw error;}

      // Increased delay slightly to accommodate text animation
      setTimeout(() => {
        if (session) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    } catch (error) {
      console.error('Authentication error:', error);
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Logo size={120} />
        </Animated.View>

        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: textFadeAnim,
              transform: [
                {
                  translateY: textFadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          SwoleStory
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  appName: {
    ...theme.typography.displayLarge,
    color: theme.colors.textPrimary,
    fontWeight: '600',
    letterSpacing: 1, // Adds a bit of spacing between letters for style
    marginTop: theme.spacing.sm,
  },
});
