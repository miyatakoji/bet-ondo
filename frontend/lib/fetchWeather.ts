import { WeatherData } from './weatherTypes';

export async function fetchWeather(city: string): Promise<WeatherData> {
  const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json() as WeatherData;
  return data;
}