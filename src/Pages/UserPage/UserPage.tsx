import { ReactElement } from 'react';
import { User, Shield, CreditCard, Bell, Star, FileText, X, Gift, Target, Users, MapPin, Building, Heart, Briefcase, Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, Eye } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import styles from './UserPage.module.scss';

export const UserPage = (): ReactElement => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${styles.weatherDashboard} ${darkMode ? styles.dark : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1>Weather Dashboard</h1>
        
        {/* Main Action Buttons */}
        <div className={styles.mainActions}>
          <button className={styles.actionButton}>
            <Users size={20} />
            Weather History
          </button>
          <button className={`${styles.actionButton} ${styles.active}`}>
            <Gift size={20} />
            Weather Alerts
          </button>
          <button className={styles.actionButton}>
            <Target size={20} />
            Weather Points
          </button>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className={styles.promoBanner}>
        <div className={styles.promoContent}>
          <h2>Discover Weather Features!</h2>
          <p>Get weather alerts, points and exclusive weather insights</p>
          <button className={styles.promoButton}>Sign Up</button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Account Section */}
        <div className={styles.section}>
          <h3>Account</h3>
          <ul className={styles.linkList}>
            <li><User size={16} /> Personal Weather Settings</li>
            <li><Shield size={16} /> Login & Security</li>
            <li><CreditCard size={16} /> Payment Methods</li>
            <li><Bell size={16} /> Weather Notifications</li>
            <li><Star size={16} /> My Weather Reviews</li>
          </ul>
        </div>

        {/* Weather Services Section */}
        <div className={styles.section}>
          <h3>Weather Services</h3>
          <ul className={styles.linkList}>
            <li><FileText size={16} /> Change Weather Preferences</li>
            <li><X size={16} /> Cancel Weather Subscription</li>
            <li><Bell size={16} /> Weather Alerts</li>
            <li><Users size={16} /> Weather Support</li>
            <li><Star size={16} /> Feedback to Weather App</li>
          </ul>
        </div>

        {/* Weather Features Section */}
        <div className={styles.section}>
          <h3>Weather Features</h3>
          <ul className={styles.linkList}>
            <li><Gift size={16} /> Weather Alerts</li>
            <li><Target size={16} /> Weather Points</li>
          </ul>
        </div>

        {/* Discover Section */}
        <div className={styles.section}>
          <h3>Discover</h3>
          <ul className={styles.linkList}>
            <li><Users size={16} /> Weather Community</li>
            <li><MapPin size={16} /> Weather Maps</li>
          </ul>
        </div>

        {/* Weather Centers Section */}
        <div className={styles.section}>
          <h3>Weather Centers</h3>
          <ul className={styles.linkList}>
            <li><Cloud size={16} /> Cloud Coverage Center</li>
            <li><Sun size={16} /> UV Index Center</li>
            <li><MapPin size={16} /> Location Center</li>
            <li><Thermometer size={16} /> Temperature Center</li>
            <li><Wind size={16} /> Wind Center</li>
          </ul>
          <button className={styles.showAllButton}>Show All</button>
        </div>
      </div>

      {/* Bottom Promotional Sections */}
      <div className={styles.bottomPromos}>
        {/* Weather Helps */}
        <div className={styles.promoCard}>
          <div className={styles.promoIcon}>
            <Heart size={48} />
          </div>
          <div className={styles.promoText}>
            <h3>Weather Helps</h3>
            <p>We provide weather data to help communities prepare for climate challenges.</p>
            <button className={styles.learnMoreButton}>Learn More</button>
          </div>
        </div>

        {/* Weather Careers */}
        <div className={styles.promoCard}>
          <div className={styles.promoIcon}>
            <Briefcase size={48} />
          </div>
          <div className={styles.promoText}>
            <h3>Weather Careers</h3>
            <p>Join our weather team and help shape the future of weather forecasting.</p>
            <button className={styles.learnMoreButton}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};
