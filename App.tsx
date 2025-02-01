// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { theme } from './src/utils/theme/theme';
import RegistrationPage from './src/screens/auth/RegisterScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"  // Always light content for our dark theme
        backgroundColor={theme.colors.background}
      />
      <RegistrationPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
