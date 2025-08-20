import { useContext } from "react";
import { WeatherContext, WeatherProvider } from "../../contexts/weatherProviderContext";

export const useWeather = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }

  return context
};