import { ReactElement, useContext } from "react";
import styles from "./compareTableCell.module.scss";
import { WeatherContext } from "@/contexts/weatherProviderContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Interface für die Wetterdaten
interface Weather {
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


const weatherTagNachtEmoji = (weather: Weather) => {
    return weather.is_day === 1 ? '☀️' : '🌙'
}

// Background style Objekt für die Seite
const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url('/assets/img/backgroundimg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };


  // generische Row-Componente statt 10+ separate
const weatherFields = [
  {label: 'Temperatur', field: 'temperature', unit: '°C'},
  {label: 'Windgeschwindigkeit', field: 'windspeed', unit: 'km/h'},
  {label: 'Windrichtung', field: 'winddirection', unit: '°'},
  {label: 'Zeit', field: 'time', unit: 'Uhrzeit'},
  {label: 'Nacht/Tag', field: 'is_day', unit: 'Nacht/Tag'},
  {label: 'Rel. Luftfeuchtigkeit', field: 'relative_humidity_2m', unit: '%'},
  {label: 'Niederschlagswahrscheinlichkeit', field: 'precipitation_sum', unit: 'mm'},
  {label: 'Wolkenbedeckung', field: 'cloudcover', unit: '%'},
  {label: 'Sichtweite', field: 'visibility', unit: 'km'},
  {label: 'Stadt', field: 'city', unit: 'Stadt'},
]

// automatische table row erstellung statt 10+ separate


// 1. erstellt eine reihe mit den temperaturen
const weatherValuesRow = ({ weathers }: { weathers: Weather[] }) => {
  return weatherFields.map((fieldInfo) => (
    <div key={fieldInfo.label} className={styles.tableRow}>
        <div className={styles.tableHeader}>{fieldInfo.label}</div>
        {weathers.map((weather, index) => (
            <div key={index} className={styles.tableCell}>
                {weather[fieldInfo.field]} {fieldInfo.unit || ''}
            </div>
        ))}
    </div>
))}


// ============================================================================
// Rendert eine Tabellenzeile für die Niederschlagswahrscheinlichkeit der städte
// main component

export default function CompareTableCell() {
    // hooks
    const cities = useContext(WeatherContext);
    const navigate = useNavigate();

    const { weathers } = {location.state as { weathers: Weather[] }} || {
        weathers: []
    }

    if (!cities) {
        return <div>No cities found</div>;
    }

// konstante für den zurück button
const handleGoBack = (): void => {
    navigate('/');
}

// error state
// fallback falls keine daten vorhanden sind

if (!cities || cities.length === 0 ) {
    return (
        <div className={styles.page} style={backgroundStyle}>
            <div className={styles.pageContainer}>
                <div className={styles.error}>
                    <h2>Keine Städte ausgewählt zum vergleichen</h2>
                    <p>Bitte wähle mindestens zwei Städte aus, um einen Vergleich zu starten.</p>
                    <button onClick={handleGoBack}>Zurück zur Startseite</button>
                </div>
            </div>
        </div>
    );
}

// ============================================================================
// Rendert eine Tabellenzeile für Nacht/Tag

const WeatherSelectionRow: React.FC<Weather> = ({ weathers }) => (
    <div className={styles.tableRow}>
      <div className={styles.tableHeader}>Nacht/Tag</div>
      {weathers.map((weather: Weather, index: number) => (
        <div key={index} className={styles.tableCell}>
          <div className={styles.featureItem}>
            <span>Nacht:</span> {weatherTagNachtEmoji(weather.is_day === 'night' ? 'y' : 'n')}
          </div>
          <div className={styles.featureItem}>
            <span>Tag:</span> {weatherTagNachtEmoji(weather.is_day === 'day' ? 'y' : 'n')}
          </div>
        </div>
      ))}
    </div>
  );
// ============================================================================



  // ============================================================================
  // MAIN Part der alle daten aufnimmt und anzeigt
  // ============================================================================

  return (
    <div className={styles.page} style={backgroundStyle}>
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <button onClick={handleGoBack} className={styles.backBtn}>
              <ArrowLeft size={20} />
              Zurück zur Übersicht
            </button>
            <h1>Vergleiche deine Städte und bekomme eine Übersicht über die Wetterdaten</h1>
          </div>

          {/* Comparison Table */}
          <div className={styles.comparisonTable}>
            <WeatherValuesRow weathers={weathers} />
            <WeatherSelectionRow weathers={weathers} />
          </div>
        </div>
      </div>
    </div>
  );
}