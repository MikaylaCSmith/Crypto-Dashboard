import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './styles/global';

import Dashboard from './screens/Dashboard';
import CryptoDetail from './screens/CryptoDetail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: Platform.OS === 'web' ? 80 : 'auto',
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.text,
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        headerMode: 'float',
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            <ThemeToggle />
          </View>
        ),
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{ 
          title: 'Crypto Dashboard',
        }}
      />
      <Stack.Screen 
        name="CryptoDetail" 
        component={CryptoDetail}
        options={({ route }) => ({ 
          title: route.params?.name || 'Detail',
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <View style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webContainer: {
    height: '100vh',
  },
});

export default App;
