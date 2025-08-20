import { DailyWeather } from "@/contexts/weatherProviderContext";

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
export function weatherDataToImg(weatherData: DailyWeather, index: number): WeatherResult {
    // Fallback bei fehlenden oder unvollständigen Daten
    if (!weatherData || index >= (weatherData.temperature_2m_max?.length || 0)) {
        return {
            condition: "cloudy",
            image: weatherImages.cloudy,
            description: weatherDescriptions.cloudy,
        }; 
    }

    // Index für den spezifischen Tag mit sicheren Defaults
    const temperature = weatherData.temperature_2m_max?.[index] ?? 15;
    const precipitation = weatherData.precipitation_sum?.[index] ?? 0;
    const snowfall = weatherData.snowfall_sum?.[index] ?? 0;
    const rainSum = weatherData.rain_sum?.[index] ?? 0;




    // PRIORITÄTS-LOGIK (wichtigste Bedingungen zuerst):

    // 1. SCHNEE (höchste Priorität bei Winterwetter)
    if (snowfall >= 0.1 || (temperature <= 0 && (precipitation > 0.1 || rainSum > 0.1))) {
        return {
            condition: "snowy",
            image: weatherImages.snowy,
            description: weatherDescriptions.snowy,
        };
    }

    // 2. STURM (sehr viel Niederschlag)
    if (precipitation > 10 || rainSum > 10) {
        return {
            condition: "stormy",
            image: weatherImages.stormy,
            description: weatherDescriptions.stormy,
        };
    }

    // 3. REGEN (messbarer Niederschlag)
    if (precipitation > 0.1 || rainSum > 0.1) {
        return {
            condition: "rainy",
            image: weatherImages.rainy,
            description: weatherDescriptions.rainy,
        };
    }

    // 4. BEWÖLKT (niedrige Temperaturen oder moderate Bedingungen)
    if (temperature < 10) {
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
export function getWeatherCondition(weatherData: DailyWeather, index: number): WeatherCondition {
    return weatherDataToImg(weatherData, index).condition;
}

// funktion um bild zurückzugeben
export function getWeatherImage(weatherData: DailyWeather, index: number): string {
    return weatherDataToImg(weatherData, index).image;
}

// funktion um beschreibung zurückzugeben
export function getWeatherDescription(weatherData: DailyWeather, index: number): string {
    return weatherDataToImg(weatherData, index).description;
}

// export von den erstellten objekten damit zugriff auf die bilder und beschreibungen möglich ist
export const images = weatherImages;
export const descriptions = weatherDescriptions;