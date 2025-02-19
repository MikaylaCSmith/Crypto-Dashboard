import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeIn,
  Layout 
} from 'react-native-reanimated';
import PriceChart from '../components/PriceChart';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../contexts/ThemeContext';
import TimeframeSelector from '../components/TimeframeSelector';
import { getHistoricalData } from '../services/cryptoApi';

const { width } = Dimensions.get('window');

const CryptoDetail = ({ route }) => {
  const { theme } = useTheme();
  const { name, id } = route.params;
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1W');
  const [priceStats, setPriceStats] = useState({
    currentPrice: '45,000',
    priceChange: '+2.5%',
    high24h: '46,200',
    low24h: '44,300',
    volume: '1.2B',
  });

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const data = await getHistoricalData(id, timeframe);
        if (data && Array.isArray(data)) {
          setChartData(data);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [id, timeframe]);

  // Simplified animations for web
  const AnimatedView = Platform.OS === 'web' ? View : Animated.View;
  const enteringAnimation = Platform.OS === 'web' ? undefined : FadeIn.duration(600);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <LinearGradient
        colors={[theme.primary + '20', 'transparent']}
        style={styles.gradient}
      >
        <AnimatedView 
          entering={enteringAnimation}
          style={styles.header}
        >
          <GlassCard style={styles.priceCard}>
            <Text style={[styles.cryptoName, { color: theme.text }]}>{name}</Text>
            <Text style={[styles.price, { color: theme.text }]}>
              ${priceStats.currentPrice}
            </Text>
            <Text style={[
              styles.priceChange, 
              { color: priceStats.priceChange.includes('-') ? theme.error : theme.primary }
            ]}>
              {priceStats.priceChange}
            </Text>
          </GlassCard>
        </AnimatedView>

        <Animated.View 
          style={styles.timeframeContainer}
        >
          <TimeframeSelector 
            selectedTimeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </Animated.View>

        <Animated.View 
          style={styles.chartContainer}
        >
          <GlassCard>
            <PriceChart data={chartData} loading={loading} />
          </GlassCard>
        </Animated.View>

        <Animated.View 
          style={styles.statsContainer}
        >
          <GlassCard>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  24h High
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  ${priceStats.high24h}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  24h Low
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  ${priceStats.low24h}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Volume
                </Text>
                <Text style={[styles.statValue, { color: theme.text }]}>
                  ${priceStats.volume}
                </Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  priceCard: {
    alignItems: 'center',
    padding: 24,
  },
  cryptoName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  priceChange: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  timeframeContainer: {
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CryptoDetail; 
