import React from 'react';
import { View } from 'react-native';
import { authStyles } from './AuthStyles';

// A simple functional component that renders the app logo
export const AuthLogo = () => {
  return (
    <View style={authStyles.logoContainer}>
      <View style={authStyles.logo}>
        <View style={authStyles.logoInner} />
      </View>
    </View>
  );
};

