import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { getCryptoData } from '../services/cryptoApi';
import { useTheme } from '../contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const { theme } = useTheme();
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // fetchData is an asynchronous function that retrieves cryptocurrency data
  // from an API. It formats the data and sets it to the cryptoData state.
  const fetchData = async () => {
    try {
      const data = await getCryptoData();
      const formattedData = data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price.toLocaleString(),
        change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
      }));
      setCryptoData(formattedData);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch crypto data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ThemeToggle />
    });
  }, [navigation]);

  const AnimatedView = View;

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text }]}>
          Loading Market Data...
        </Text>
      </View>
    );
  }

  if (error && cryptoData.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={fetchData}
          >
            <Text style={[styles.retryButtonText, { color: theme.background }]}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={[
          styles.scrollView, 
          Platform.OS === 'web' && styles.webScrollView
        ]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        <LinearGradient
          colors={[theme.primary + '20', 'transparent']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              Market Overview
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Live Crypto Prices
            </Text>
          </View>

          {cryptoData.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CryptoDetail', { 
                  name: item.name,
                  id: item.id 
                })}
              >
                <GlassCard style={styles.cryptoCard}>
                  <View style={styles.cardHeader}>
                    <Text style={[styles.cryptoName, { color: theme.text }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.cryptoSymbol, { color: theme.textSecondary }]}>
                      {item.symbol}
                    </Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.price, { color: theme.text }]}>
                      ${item.price}
                    </Text>
                    <Text style={[
                      styles.priceChange,
                      { color: item.change.includes('-') ? theme.error : theme.primary }
                    ]}>
                      {item.change}
                    </Text>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            </View>
          ))}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: Platform.OS === 'web' ? '100vh' : '100%',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  webScrollView: {
    overflow: 'auto',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  cryptoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cryptoName: {
    fontSize: 20,
    fontWeight: '700',
  },
  cryptoSymbol: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  priceChange: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard; 