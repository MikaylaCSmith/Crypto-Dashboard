import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';


// GlassCard is a functional component that renders a card with a glass-like effect.
const GlassCard = ({ children, style }) => {
  const { theme } = useTheme();
  const isWeb = Platform.OS === 'web';

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.cardBackground,
      borderColor: theme.glassBorder,
      shadowColor: theme.shadow,
    },
    isWeb && styles.webCard,
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  webCard: {
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
});

export default GlassCard; 