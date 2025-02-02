export interface WeatherData {
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  weatherCode: number | null;
}

export interface ActivityRecommendation {
  activity: string;
  good: boolean;
  message: string;
} 