import type { WeatherData } from '$lib/types/weather';

export const getWeatherDescription = (code: number): string => {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm'
  };
  return weatherCodes[code] || 'Unknown';
};

export const getActivityRecommendation = (data: WeatherData) => {
  const { temperature, windSpeed } = data;
  if (!temperature || !windSpeed) return null;

  const recommendations = {
    motorcycle: {
      good: temperature > 10 && temperature < 35 && windSpeed < 30,
      message: '🏍️ '
    },
    swimming: {
      good: temperature > 20 && windSpeed < 20,
      message: '🏊 '
    },
    bicycle: {
      good: temperature > 5 && temperature < 30 && windSpeed < 25,
      message: '🚲 '
    }
  };

  return Object.entries(recommendations).map(([activity, { good, message }]) => ({
    activity,
    good,
    message: message + (good ? 'Good' : 'Not recommended')
  }));
}; 