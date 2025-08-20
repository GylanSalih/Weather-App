import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  time: string;
  is_day: number;
  relative_humidity_2m: number;
  precipitation_sum: number;
  cloudcover: number;
  visibility: number;
  city: string;
}

// ARRAYS mit allen stündlichen daten arrays nicht vergleichbar
// index 0 für aktuellen Wert
// die Stündlichen Werte von Open-Meteo für den Todays Forecast
export interface HourlyWeather {
  temperature_2m_hourly: number[];
  relative_humidity_2m_hourly: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  snowfall: number[];
  showers: number[];
  snow_depth: number[];
  vapour_pressure_deficit: number[];
  et0_fao_evapotranspiration: number[];
  evapotranspiration: number[];
  visibility: number[];
  cloud_cover_high: number[];
  cloud_cover_mid: number[];
  cloud_cover_low: number[];
  cloud_cover: number[];
  surface_pressure: number[];
  pressure_msl: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  soil_temperature_0cm: number[];
  soil_temperature_18cm: number[];
  soil_moisture_3_to_9cm: number[];
  soil_moisture_0_to_1cm: number[];
  temperature_80m: number[];
}

export interface DailyWeather {
  time: string[];
  temperature_daily: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  rain_sum: number[];
  weathercode: number[];
  precipitation_sum: number[];
  windspeed: number[];
  cloudcover: number[];
  snowfall_sum: number[];
  visibility: number[];
  relative_humidity_2m: number[];
}

export interface AirConditions {
  rain_sum: number;
  temperature: number;
  windspeed: number;
  sunrise: number;
  sunset: number;
}

// die daten mappen der api-daten auf einzelne werte
// sollte dieser interface alles beeinhalten also die daten von den anderen interfaces auch?
interface WeatherProvider {
  current: CurrentWeather | null;
  hourly: HourlyWeather | null;
  daily: DailyWeather | null;
  airConditions: AirConditions | null;

  city: string;
  loading: boolean;
  error: string | null;
}

// erstellt eine constante für den context später wird diese in der app verwendet
export const WeatherContext = createContext<WeatherProvider | undefined>(
  undefined
);

// beeinhaltet alle daten die wir benötigen
export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "Köln";
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [hourly, setHourly] = useState<HourlyWeather | null>(null);
  const [daily, setDaily] = useState<DailyWeather | null>(null);
  const [airConditions, setAirConditions] = useState<AirConditions | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Stadt in Koordinaten umwandeln
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Stadt nicht gefunden");
        }

        const { latitude, longitude } = geoData.results[0];

        // 2. Wetterdaten mit diesen Koordinaten abrufen
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,cloudcover,visibility,windspeed_10m,winddirection_10m,is_day&hourly=temperature_2m,precipitation_probability,precipitation,wind_speed_10m,cloud_cover,snowfall,visibility&daily=temperature_2m_max,temperature_2m_min,rain_sum,weathercode,precipitation_sum,snowfall_sum&timezone=Europe/Berlin`
        );
        // api response in weatherData speichern habe die datei umbenannt damit man keine fehler bekommt
        const apiResponse = await weatherRes.json();

        const weatherData = {
          currentWeather: {
            temperature: apiResponse.current?.temperature_2m || 0,
            windspeed: apiResponse.current?.windspeed_10m || 0,
            winddirection: apiResponse.current?.winddirection_10m || 0,
            time: apiResponse.current?.time || "",
            is_day: apiResponse.current?.is_day || 0,
            relative_humidity_2m:
              apiResponse.current?.relative_humidity_2m || 0,
            precipitation_sum: apiResponse.current?.precipitation || 0,
            cloudcover: apiResponse.current?.cloudcover || 0,
            visibility: apiResponse.current?.visibility || 0,
            city: city,
          },
          hourlyWeather: {
            temperature_2m_hourly: apiResponse.hourly?.temperature_2m || [],
            relative_humidity_2m_hourly:
              apiResponse.hourly?.relative_humidity_2m || [],
            dew_point_2m: apiResponse.hourly?.dew_point_2m || [],
            apparent_temperature:
              apiResponse.hourly?.apparent_temperature || [],
            precipitation_probability:
              apiResponse.hourly?.precipitation_probability || [],
            precipitation: apiResponse.hourly?.precipitation || [],
            rain: apiResponse.hourly?.rain || [],
            snowfall: apiResponse.hourly?.snowfall || [],
            showers: apiResponse.hourly?.showers || [],
            snow_depth: apiResponse.hourly?.snow_depth || [],
            vapour_pressure_deficit:
              apiResponse.hourly?.vapour_pressure_deficit || [],
            et0_fao_evapotranspiration:
              apiResponse.hourly?.et0_fao_evapotranspiration || [],
            evapotranspiration: apiResponse.hourly?.evapotranspiration || [],
            visibility: apiResponse.hourly?.visibility || [],
            cloud_cover_high: apiResponse.hourly?.cloud_cover_high || [],
            cloud_cover_mid: apiResponse.hourly?.cloud_cover_mid || [],
            cloud_cover_low: apiResponse.hourly?.cloud_cover_low || [],
            cloud_cover: apiResponse.hourly?.cloud_cover || [],
            surface_pressure: apiResponse.hourly?.surface_pressure || [],
            pressure_msl: apiResponse.hourly?.pressure_msl || [],
            wind_speed_10m: apiResponse.hourly?.wind_speed_10m || [],
            wind_gusts_10m: apiResponse.hourly?.wind_gusts_10m || [],
            soil_temperature_0cm:
              apiResponse.hourly?.soil_temperature_0cm || [],
            soil_temperature_18cm:
              apiResponse.hourly?.soil_temperature_18cm || [],
            soil_moisture_3_to_9cm:
              apiResponse.hourly?.soil_moisture_3_to_9cm || [],
            soil_moisture_0_to_1cm:
              apiResponse.hourly?.soil_moisture_0_to_1cm || [],
            temperature_80m: apiResponse.hourly?.temperature_80m || [],
          },
          dailyWeather: {
            time: apiResponse.daily?.time,
            temperature_daily: apiResponse.daily?.temperature,
            temperature_2m_max: apiResponse.daily?.temperature_2m_max,
            temperature_2m_min: apiResponse.daily?.temperature_2m_min,
            rain_sum: apiResponse.daily?.rain_sum,
            weathercode: apiResponse.daily?.weathercode,
            precipitation_sum: apiResponse.daily?.precipitation_sum,
            windspeed: [], // Not available in daily data
            cloudcover: [], // Not available in daily data  
            snowfall_sum: apiResponse.daily?.snowfall_sum,
            visibility: [], // Not available in daily data
            relative_humidity_2m: [], // Not available in daily data
          },
          airconditions: {
            rain_sum: apiResponse.airconditions?.rain_sum || 0,
            temperature: apiResponse.airconditions?.temperature || 0,
            windspeed: apiResponse.airconditions?.windspeed || 0,
            sunrise: apiResponse.airconditions?.sunrise || 0,
            sunset: apiResponse.airconditions?.sunset || 0,
          },
        };

        setCurrent(weatherData.currentWeather);
        setHourly(weatherData.hourlyWeather);
        setDaily(weatherData.dailyWeather);
        setAirConditions(weatherData.airconditions);
      } catch (error) {
        console.error("Fehler beim Laden der Wetterdaten:", error);
        setError(error instanceof Error ? error.message : "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const value: WeatherProvider = {
    current,
    hourly,
    daily,
    airConditions,
    city,
    loading,
    error,
  };

  // liefert den gesamten Context an die App
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
