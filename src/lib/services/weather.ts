import { fetchWeatherApi } from 'openmeteo';
import type { WeatherData } from '$lib/types/weather';

const BUENOS_AIRES_COORDS = {
  latitude: -34.6131,
  longitude: -58.3772
};

export async function fetchWeatherData(): Promise<WeatherData> {
  const params = {
    ...BUENOS_AIRES_COORDS,
    hourly: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'weather_code'],
    timezone: 'auto'
  };

  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  const hourly = response.hourly()!;

  return {
    temperature: Math.round(hourly.variables(0)!.valuesArray()![0]),
    humidity: Math.round(hourly.variables(1)!.valuesArray()![0]),
    windSpeed: Math.round(hourly.variables(2)!.valuesArray()![0]),
    weatherCode: hourly.variables(3)!.valuesArray()![0]
  };
} 