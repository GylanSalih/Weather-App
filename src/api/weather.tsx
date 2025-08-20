// api/weather.ts

export async function fetchWeatherData(cityName: string) {
  try {
    // 1. Geocoding (Stadt -> Koordinaten)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=de&format=json`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Wetterdaten holen
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,visibility,pressure_msl`
    );
    const weatherData = await weatherRes.json();

    const current = weatherData.current_weather;

    // Mapping für dein WeatherData-Interface
    return {
      name: `${name}, ${country}`,
      main: {
        temp: current.temperature,
        feels_like: weatherData.hourly.apparent_temperature[0], // Gefühlte Temp (erste Stunde)
        humidity: weatherData.hourly.relativehumidity_2m[0],
        pressure: weatherData.hourly.pressure_msl[0],
      },
      weather: [
        {
          description: current.weathercode.toString(), // Open-Meteo nutzt Codes
          // speichert den icon in weaatherData.icon
          icon: mapWeatherCodeToIcon(current.weathercode), // eigene Mapping-Funktion
        },
      ],
      wind: {
        speed: current.windspeed,
      },
      visibility: weatherData.hourly.visibility[0],
    };
  } catch (err) {
    throw err;
  }
}

// weather.tsx bekommt von der api codes und konvertiert diese zahlen zu einer nummer
// Das ist Standardisiert - alle Wetter-APIs nutzen diese WMO-Codes
// konvertiert den Code zu Icon-String (z.B. "01d" -> "sun")
// Wettercode -> Icon
function mapWeatherCodeToIcon(code: number): string {
  // Open-Meteo Codes siehe: https://open-meteo.com/en/docs#latitude=52.52&longitude=13.41
  if (code === 0) return "01d"; // Klarer Himmel
  if ([1, 2, 3].includes(code)) return "02d"; // Wolkig
  if ([45, 48].includes(code)) return "50d"; // Nebel
  if ([51, 53, 55, 56, 57].includes(code)) return "09d"; // Nieselregen
  if ([61, 63, 65, 66, 67].includes(code)) return "10d"; // Regen
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "13d"; // Schnee
  if ([95, 96, 99].includes(code)) return "11d"; // Gewitter
  return "01d"; // Fallback
}
