import { ReactElement, useState } from 'react';
import { MapPin, Heart, Star, Plus, X, Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, Eye, Search, Bookmark, Trash2, Edit3, Clock } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import styles from './favoritesPage.module.scss';

interface FavoriteCity {
  id: string;
  name: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  isBookmarked: boolean;
  lastUpdated: string;
}

export const FavoritesPage = (): ReactElement => {
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<FavoriteCity[]>([
    {
      id: '1',
      name: 'Berlin',
      country: 'Germany',
      temperature: 22,
      description: 'Partly cloudy',
      icon: '02d',
      isBookmarked: true,
      lastUpdated: '2 min ago'
    },
    {
      id: '2',
      name: 'Munich',
      country: 'Germany',
      temperature: 18,
      description: 'Light rain',
      icon: '10d',
      isBookmarked: true,
      lastUpdated: '5 min ago'
    },
    {
      id: '3',
      name: 'Hamburg',
      country: 'Germany',
      temperature: 20,
      description: 'Sunny',
      icon: '01d',
      isBookmarked: false,
      lastUpdated: '1 min ago'
    }
  ]);

  const toggleBookmark = (id: string) => {
    setFavorites(favorites.map(city => 
      city.id === id ? { ...city, isBookmarked: !city.isBookmarked } : city
    ));
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(city => city.id !== id));
  };

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return <Sun size={24} className={styles.weatherIcon} />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return <Cloud size={24} className={styles.weatherIcon} />;
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return <CloudRain size={24} className={styles.weatherIcon} />;
    return <Sun size={24} className={styles.weatherIcon} />;
  };

  const filteredFavorites = favorites.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${styles.weatherFavorites} ${darkMode ? styles.dark : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1>Weather Favorites</h1>
        <p>Track and manage your favorite cities</p>
      </div>

      {/* Search and Add Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search your favorite cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          Add New City
        </button>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <Bookmark size={24} />
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{favorites.length}</span>
            <span className={styles.statLabel}>Total Cities</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <Heart size={24} />
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{favorites.filter(c => c.isBookmarked).length}</span>
            <span className={styles.statLabel}>Bookmarked</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <Cloud size={24} />
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{favorites.filter(c => c.description.includes('rain')).length}</span>
            <span className={styles.statLabel}>Rainy Cities</span>
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className={styles.favoritesGrid}>
        {filteredFavorites.map((city) => (
          <div key={city.id} className={styles.favoriteCard}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div className={styles.cityInfo}>
                <MapPin size={16} />
                <div>
                  <h3>{city.name}</h3>
                  <span className={styles.country}>{city.country}</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <button 
                  className={`${styles.bookmarkButton} ${city.isBookmarked ? styles.bookmarked : ''}`}
                  onClick={() => toggleBookmark(city.id)}
                >
                  <Heart size={16} />
                </button>
                <button className={styles.editButton}>
                  <Edit3 size={16} />
                </button>
                <button 
                  className={styles.removeButton}
                  onClick={() => removeFavorite(city.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Weather Info */}
            <div className={styles.weatherInfo}>
              <div className={styles.weatherIcon}>
                {getWeatherIcon(city.icon)}
              </div>
              <div className={styles.temperature}>
                <span className={styles.tempValue}>{city.temperature}°C</span>
                <span className={styles.description}>{city.description}</span>
              </div>
            </div>

            {/* Weather Details */}
            <div className={styles.weatherDetails}>
              <div className={styles.detailItem}>
                <Thermometer size={14} />
                <span>Feels like {city.temperature + 2}°C</span>
              </div>
              <div className={styles.detailItem}>
                <Wind size={14} />
                <span>12 km/h</span>
              </div>
              <div className={styles.detailItem}>
                <Droplets size={14} />
                <span>65%</span>
              </div>
            </div>

            {/* Last Updated */}
            <div className={styles.lastUpdated}>
              <Clock size={14} />
              <span>Updated {city.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFavorites.length === 0 && (
        <div className={styles.emptyState}>
          <Bookmark size={64} />
          <h3>No favorites found</h3>
          <p>Start adding cities to your favorites to track their weather</p>
          <button className={styles.addFirstButton}>
            <Plus size={20} />
            Add Your First City
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <button className={styles.actionButton}>
          <Star size={20} />
          Sort by Temperature
        </button>
        <button className={styles.actionButton}>
          <MapPin size={20} />
          Sort by Distance
        </button>
        <button className={styles.actionButton}>
          <Cloud size={20} />
          Sort by Weather
        </button>
      </div>
    </div>
  );
};


