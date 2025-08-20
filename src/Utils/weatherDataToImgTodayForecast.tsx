import { HourlyWeather } from "@/contexts/weatherProviderContext";

// Wetter-Zustände definieren
export type WeatherCondition = 'sunny' | 'cloudy' |'rainy' | 'snowy' | 'stormy';

// Wetter-Objekt erstellen
export interface WeatherResult {
    condition: WeatherCondition;
    image: string;
    description: string;
    icon?: string;
}

// objekte als blueprint für die funktionen, objekte die ich später benutzen kann

// erstellen von einem objekt mit den zuständen und den beschreibungen die ich später benutzen kann
const weatherImages = {
    sunny: "/assets/weatherDataToImg/sunny.png",
    cloudy: "/assets/weatherDataToImg/cloudy.png",
    rainy: "/assets/weatherDataToImg/rainy.png",
    snowy: "/assets/weatherDataToImg/snowy.png",
    stormy: "/assets/weatherDataToImg/stormy.png",
}

// erstellen von einem objekt mit den zuständen und den beschreibungen die ich später benutzen kann
const weatherDescriptions = {
    sunny: "Sonnig",
    cloudy: "Bewölkt",
    rainy: "Regnerisch",
    snowy: "Schneefall",
    stormy: "Stürmisch",
}

// funktion um wetterdaten zu bildern und zuständen zu konvertieren
export function weatherDataToImg(weatherData: HourlyWeather, index: number): WeatherResult {
    // Fallback bei fehlenden oder unvollständigen Daten
    if (!weatherData || index >= (weatherData.temperature_2m_hourly?.length || 0)) {
        return {
            condition: "cloudy",
            image: weatherImages.cloudy,
            description: weatherDescriptions.cloudy,
        }; 
    }

    // arrays kann man nicht vergleichen die stündlichen daten sind in einem array
    // die daten von WeatherProviderContext zu einer konstanten zuordnen
    // Index für die spezifische Stunde mit sicheren Defaults
    const temperature = weatherData.temperature_2m_hourly?.[index] ?? 15;
    const precipitation = weatherData.precipitation?.[index] ?? 0;
    const windSpeed = weatherData.wind_speed_10m?.[index] ?? 0;
    const cloudcover = weatherData.cloud_cover?.[index] ?? 50;
    const snowfall = weatherData.snowfall?.[index] ?? 0;
    const visibility = weatherData.visibility?.[index] ?? 10000;
    const relative_humidity_2m = weatherData.relative_humidity_2m_hourly?.[index] ?? 50;
    // const dew_point_2m = weatherData.dew_point_2m[index];
    // const apparent_temperature = weatherData.apparent_temperature[index];
    // const precipitation_probability = weatherData.precipitation_probability[index];
    // const rain = weatherData.rain[index];
    // const snow_depth = weatherData.snow_depth[index];
    // const showers = weatherData.showers[index];
    // const vapour_pressure_deficit = weatherData.vapour_pressure_deficit[index];
    // const et0_fao_evapotranspiration = weatherData.et0_fao_evapotranspiration[index];
    // const evapotranspiration = weatherData.evapotranspiration[index];
    // const cloud_cover_high = weatherData.cloud_cover_high[index];
    // const cloud_cover_mid = weatherData.cloud_cover_mid[index];
    // const cloud_cover_low = weatherData.cloud_cover_low[index];
    // const cloud_cover = weatherData.cloud_cover[index];
    // const surface_pressure = weatherData.surface_pressure[index];
    // const pressure_msl = weatherData.pressure_msl[index];
    // const wind_speed_10m = weatherData.wind_speed_10m[index];
    // const wind_gusts_10m = weatherData.wind_gusts_10m[index];
    // const soil_temperature_0cm = weatherData.soil_temperature_0cm[index];
    // const soil_temperature_18cm = weatherData.soil_temperature_18cm[index];
    // const soil_moisture_3_to_9cm = weatherData.soil_moisture_3_to_9cm[index];
    // const soil_moisture_0_to_1cm = weatherData.soil_moisture_0_to_1cm[index];
    // const temperature_80m = weatherData.temperature_80m[index];

    // PRIORITÄTS-LOGIK (wichtigste Bedingungen zuerst):

    // 1. SCHNEE (höchste Priorität bei Winterwetter)
    if (snowfall >= 0.1 || (temperature <= 0 && precipitation > 0.1)) {
        return {
            condition: "snowy",
            image: weatherImages.snowy,
            description: weatherDescriptions.snowy,
        };
    }

    // 2. STURM (starker Wind oder sehr viel Niederschlag)
    if (windSpeed > 20 || precipitation > 5) {
        return {
            condition: "stormy",
            image: weatherImages.stormy,
            description: weatherDescriptions.stormy,
        };
    }

    // 3. REGEN (messbarer Niederschlag)
    if (precipitation > 0.1) {
        return {
            condition: "rainy",
            image: weatherImages.rainy,
            description: weatherDescriptions.rainy,
        };
    }

    // 4. BEWÖLKT (schlechte Sicht oder hohe Bewölkung)
    if ((visibility < 1000 && relative_humidity_2m > 90) || cloudcover >= 80) {
        return {
            condition: "cloudy",
            image: weatherImages.cloudy,
            description: weatherDescriptions.cloudy,
        };
    }

    // 5. SONNIG (Standard wenn nichts anderes zutrifft)
    return {
        condition: "sunny",
        image: weatherImages.sunny,
        description: weatherDescriptions.sunny,
    };
}

// funktion um zustand zurückzugeben
export function getWeatherCondition(weatherData: HourlyWeather, index: number): WeatherCondition {
    return weatherDataToImg(weatherData, index).condition;
}

// funktion um bild zurückzugeben
export function getWeatherImage(weatherData: HourlyWeather, index: number): string {
    return weatherDataToImg(weatherData, index).image;
}

// funktion um beschreibung zurückzugeben
export function getWeatherDescription(weatherData: HourlyWeather, index: number): string {
    return weatherDataToImg(weatherData, index).description;
}

// export von den erstellten objekten damit zugriff auf die bilder und beschreibungen möglich ist
export const images = weatherImages;
export const descriptions = weatherDescriptions;