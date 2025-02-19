import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { TIMEFRAMES } from '../services/cryptoApi';

const TimeframeSelector = ({ selectedTimeframe, onTimeframeChange }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {Object.keys(TIMEFRAMES).map((timeframe) => (
        <TouchableOpacity
          key={timeframe}
          style={[
            styles.button,
            { backgroundColor: theme.cardBackground },
            selectedTimeframe === timeframe && { 
              backgroundColor: theme.primary + '20',
              borderColor: theme.primary,
            }
          ]}
          onPress={() => onTimeframeChange(timeframe)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: theme.text },
              selectedTimeframe === timeframe && { color: theme.primary }
            ]}
          >
            {timeframe}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default TimeframeSelector; 