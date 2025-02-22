import React from 'react';
import { View, Text, Platform } from 'react-native';

// WebChart is a functional component that renders a simple chart for web platforms.
// It displays the latest data point from the provided data prop.

const WebChart = ({ data, width, height, chartConfig }) => {
  const color = chartConfig?.color?.(1) || '#4BFF4B';
  
  return (
    <View 
      style={{
        width, 
        height,
        backgroundColor: '#2A2A2A',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <View 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40%',
          backgroundColor: color,
          opacity: 0.1
        }}
      />
      <Text style={{ color: color, fontSize: 12 }}>
        {data?.points?.[data.points.length - 1]?.y?.toFixed(2) || '0.00'}
      </Text>
    </View>
  );
};

export default Platform.OS === 'web' ? WebChart : null; 