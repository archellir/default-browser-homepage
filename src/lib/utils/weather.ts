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
  const { temperature, windSpeed, weatherCode } = data;
  if (!temperature || !windSpeed) return null;

  const isRainy = [51, 53, 55, 61, 63, 65, 95].includes(weatherCode || 0);
  const isSnowy = [71, 73, 75].includes(weatherCode || 0);
  const isFoggy = [45, 48].includes(weatherCode || 0);

  const recommendations = {
    motorcycle: {
      good: temperature > 10 && temperature < 35 && windSpeed < 30 && !isRainy && !isSnowy && !isFoggy,
      message: '🏍️ ',
      status: temperature < 10 || temperature > 35 ? 'Too extreme' : 
              windSpeed >= 30 ? 'Too windy' :
              isRainy || isSnowy || isFoggy ? 'Poor conditions' : 'Ideal'
    },
    swimming: {
      good: temperature > 23 && temperature < 32 && windSpeed < 20 && !isRainy && !isSnowy,
      message: '🏊 ',
      status: temperature <= 23 ? 'Too cold' :
              temperature >= 32 ? 'Too hot' :
              isRainy || isSnowy ? 'Poor conditions' : 'Perfect'
    },
    bicycle: {
      good: temperature > 10 && temperature < 30 && windSpeed < 25 && !isRainy && !isSnowy && !isFoggy,
      message: '🚲 ',
      status: temperature <= 10 || temperature >= 30 ? 'Too extreme' :
              windSpeed >= 25 ? 'Too windy' :
              isRainy || isSnowy || isFoggy ? 'Poor conditions' : 'Great'
    },
    running: {
      good: temperature > 5 && temperature < 25 && windSpeed < 20 && !isRainy && !isSnowy,
      message: '🏃 ',
      status: temperature <= 5 || temperature >= 25 ? 'Too extreme' :
              windSpeed >= 20 ? 'Too windy' :
              isRainy || isSnowy ? 'Poor conditions' : 'Perfect'
    }
  };

  return Object.entries(recommendations).map(([activity, { good, message, status }]) => ({
    activity,
    good,
    message: `${message} ${status}`
  }));
}; 