import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const BACKEND_API = 'http://localhost:3000/api';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// fetchWithRetry is an asynchronous function that attempts to fetch data.
// If the request fails due to a rate limit error, it will retry the request up to a 
// specified number of times (MAX_RETRIES), with a delay between

const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response?.status === 429) { 
      await wait(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

// getCryptoData is an asynchronous function that fetches the current market data for cryptocurrencies
// from the CoinGecko API. It retrieves data for the top 20 cryptocurrencies in USD. 

export const getCryptoData = async () => {
  try {
    const response = await axios.get(
      `${COINGECKO_API}/coins/markets`,
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 20,
          sparkline: false,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw new Error('Failed to fetch crypto data');
  }
};

export const storeHistoricalPrice = async (coinData) => {
  try {
    await axios.post(`${BACKEND_API}/crypto/price`, {
      coinId: coinData.id,
      symbol: coinData.symbol,
      name: coinData.name,
      price: coinData.current_price
    });
  } catch (error) {
    console.error('Error storing historical data:', error);
  }
};

export const TIMEFRAMES = {
  '1D': { days: '1', interval: 'hourly' },
  '1W': { days: '7', interval: 'daily' },
  '1M': { days: '30', interval: 'daily' },
  '3M': { days: '90', interval: 'daily' },
  '1Y': { days: '365', interval: 'daily' },
};

export const getHistoricalData = async (coinId, timeframe = '1W') => {
  try {
    const { days, interval } = TIMEFRAMES[timeframe];
    const data = await fetchWithRetry(
      `${COINGECKO_API}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days,
          interval
        }
      }
    );
    return data.prices.map(([timestamp, price]) => ({
      timestamp,
      price
    }));
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw new Error(
      error.response?.status === 429 
        ? 'Too many requests. Please try again in a moment.'
        : 'Failed to fetch crypto data. Please check your connection.'
    );
  }
}; 