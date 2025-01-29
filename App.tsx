// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { DatabaseProvider } from './src/contexts/DatabaseContext';
import { theme } from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"  // Always light content for our dark theme
        backgroundColor={theme.colors.background}
      />
      <DatabaseProvider>
        <RootNavigator />
      </DatabaseProvider>
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
