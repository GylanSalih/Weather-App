import { CurrentWeather } from "@/contexts/weatherProviderContext";

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
export function weatherDataToImg(weatherData: CurrentWeather): WeatherResult {
    // Fallback bei fehlenden oder unvollständigen Daten
    if (!weatherData) {
        return {
            condition: "cloudy",
            image: weatherImages.cloudy,
            description: weatherDescriptions.cloudy,
        }; 
    }


    // Index 0 für aktuellen Wert
    const temperature = weatherData.temperature;
    const precipitation = weatherData.precipitation_sum;
    const windSpeed = weatherData.windspeed;
    const cloudcover = weatherData.cloudcover;
    const visibility = weatherData.visibility;
    const relative_humidity_2m = weatherData.relative_humidity_2m;

    // PRIORITÄTS-LOGIK (wichtigste Bedingungen zuerst):

    // 1. SCHNEE (höchste Priorität bei Winterwetter)
    if (temperature <= 0 && precipitation > 0.1) {
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
    if (visibility < 1000 && relative_humidity_2m > 90 || cloudcover >= 80) {
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
export function getWeatherCondition(weatherData: CurrentWeather): WeatherCondition {
    return weatherDataToImg(weatherData).condition;
}

// funktion um bild zurückzugeben
export function getWeatherImage(weatherData: CurrentWeather): string {
    return weatherDataToImg(weatherData).image;
}

// funktion um beschreibung zurückzugeben
export function getWeatherDescription(weatherData: CurrentWeather): string {
    return weatherDataToImg(weatherData).description;
}

// export von den erstellten objekten damit zugriff auf die bilder und beschreibungen möglich ist
export const images = weatherImages;
export const descriptions = weatherDescriptions;