import React from 'react';
import { Platform, View, Text, Dimensions } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Web version using Chart.js
const WebChart = ({ data, loading }) => {
  const { theme } = useTheme();
  
  if (loading) {
    return (
      <View style={{ 
        height: 220, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.cardBackground,
        borderRadius: 16,
      }}>
        <Text style={{ color: theme.textSecondary }}>Loading chart...</Text>
      </View>
    );
  }

  if (!data || !Array.isArray(data)) {
    return (
      <View style={{ 
        height: 220, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.cardBackground,
        borderRadius: 16,
      }}>
        <Text style={{ color: theme.textSecondary }}>No data available</Text>
      </View>
    );
  }

  const { Line } = require('react-chartjs-2');
  const {
    Chart: ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } = require('chart.js');

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const chartData = {
    labels: data.map(() => ''),
    datasets: [
      {
        label: 'Price',
        data: data.map(point => point.price),
        borderColor: theme.primary,
        backgroundColor: theme.primary,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: theme.cardBackground,
        titleColor: theme.text,
        bodyColor: theme.text,
        borderColor: theme.textSecondary,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        grid: {
          color: theme.textSecondary + '20',
        },
        ticks: {
          color: theme.textSecondary,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: 220 }}>
      <Line data={chartData} options={options} />
    </div>
  );
};


const NativeChart = ({ data, loading }) => {
  const { theme } = useTheme();
  return (
    <View style={{ 
      height: 220, 
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ color: theme.textSecondary }}>
        {loading ? 'Loading chart...' : 'Chart coming soon for mobile...'}
      </Text>
    </View>
  );
};

const PriceChart = Platform.select({
  web: WebChart,
  default: NativeChart,
});

export default PriceChart; 