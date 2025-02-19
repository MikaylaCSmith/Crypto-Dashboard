import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: theme.cardBackground },
        Platform.OS === 'web' && styles.webButton
      ]} 
      onPress={toggleTheme}
    >
      <Ionicons 
        name={isDark ? 'sunny' : 'moon'} 
        size={24} 
        color={theme.primary} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    marginRight: 16,
    position: Platform.OS === 'web' ? 'relative' : 'absolute',
    right: Platform.OS === 'web' ? 0 : 16,
  },
  webButton: {
    position: 'relative',
    zIndex: 1000,
  }
});

export default ThemeToggle; 