import { DailyWeather } from "@/contexts/weatherProviderContext";

export function dailyTemperatur(daily: DailyWeather) {
  const avgWeekTemp = daily.temperature_2m_max.reduce((sum, temp) => sum + temp, 0) / daily.temperature_2m_max.length; 


  console.log(`Durchschnittswert: ${avgWeekTemp.toFixed(1)}°C`); 
}

// dailyTemperatur(hourly);
// aufrufen den durchschnittswert der woche