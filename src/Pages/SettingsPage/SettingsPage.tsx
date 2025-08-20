import { ReactElement } from 'react';
import { Settings, Sun, Moon, MapPin, Bell, Globe, Thermometer, Eye, Shield, Database, Accessibility, Cloud, Wind, Droplets, Clock, Heart, Star } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import styles from './SettingsPage.module.scss';

export const SettingsPage = (): ReactElement => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`${styles.weatherSettings} ${darkMode ? styles.dark : ''}`}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1>Weather Settings</h1>
        <p>Customize your weather experience and preferences</p>
      </div>

      {/* Main Settings Grid */}
      <div className={styles.settingsGrid}>
        {/* Display & Units Section */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <Thermometer size={24} />
            <h3>Display & Units</h3>
          </div>
          <ul className={styles.settingsList}>
            <li>
              <span>Temperature Units:</span>
              <div className={styles.settingControl}>
                <button className={styles.unitButton}>Celsius</button>
                <button className={`${styles.unitButton} ${styles.active}`}>Fahrenheit</button>
              </div>
            </li>
            <li>
              <span>Wind Speed:</span>
              <div className={styles.settingControl}>
                <button className={styles.unitButton}>km/h</button>
                <button className={`${styles.unitButton} ${styles.active}`}>mph</button>
              </div>
            </li>
            <li>
              <span>Time Zone:</span>
              <select className={styles.settingSelect}>
                <option>Auto-detect</option>
                <option>Manual selection</option>
              </select>
            </li>
          </ul>
        </div>

        {/* Location Settings Section */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <MapPin size={24} />
            <h3>Location Settings</h3>
          </div>
          <ul className={styles.settingsList}>
            <li>
              <span>Favorite Cities:</span>
              <button className={styles.manageButton}>Manage Favorites</button>
            </li>
            <li>
              <span>Auto Location:</span>
              <div className={styles.settingControl}>
                <button className={styles.toggleButton}>GPS</button>
                <button className={`${styles.toggleButton} ${styles.active}`}>IP-based</button>
              </div>
            </li>
            <li>
              <span>Default City:</span>
              <input type="text" placeholder="Enter city name" className={styles.settingInput} />
            </li>
          </ul>
        </div>

        {/* Notifications Section */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <Bell size={24} />
            <h3>Notifications</h3>
          </div>
          <ul className={styles.settingsList}>
            <li>
              <span>Weather Alerts:</span>
              <button className={`${styles.toggleButton} ${styles.active}`}>Enabled</button>
            </li>
            <li>
              <span>Daily Updates:</span>
              <button className={styles.toggleButton}>Disabled</button>
            </li>
            <li>
              <span>Push Notifications:</span>
              <button className={`${styles.toggleButton} ${styles.active}`}>Enabled</button>
            </li>
          </ul>
        </div>

        {/* Map & View Section */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <Globe size={24} />
            <h3>Map & View</h3>
          </div>
          <ul className={styles.settingsList}>
            <li>
              <span>Map Type:</span>
              <select className={styles.settingSelect}>
                <option>Satellite</option>
                <option>Street Map</option>
                <option>Temperature</option>
                <option>Rain Radar</option>
              </select>
            </li>
            <li>
              <span>Widget Display:</span>
              <button className={`${styles.toggleButton} ${styles.active}`}>Enabled</button>
            </li>
          </ul>
        </div>

        {/* Data & API Section */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <Database size={24} />
            <h3>Data & API</h3>
          </div>
          <ul className={styles.settingsList}>
            <li>
              <span>Update Interval:</span>
              <select className={styles.settingSelect}>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
              </select>
            </li>
            <li>
              <span>Data Source:</span>
              <button className={styles.manageButton}>Configure</button>
            </li>
          </ul>
        </div>

        {/* Accessibility Section */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionHeader}>
            <Accessibility size={24} />
            <h3>Accessibility</h3>
          </div>
          <ul className={styles.settingsList}>
            <li>
              <span>Font Size:</span>
              <div className={styles.settingControl}>
                <button className={styles.sizeButton}>A-</button>
                <button className={`${styles.sizeButton} ${styles.active}`}>A</button>
                <button className={styles.sizeButton}>A+</button>
              </div>
            </li>
            <li>
              <span>High Contrast:</span>
              <button className={styles.toggleButton}>Disabled</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.saveButton}>
          <Settings size={20} />
          Save Settings
        </button>
        <button className={styles.resetButton}>
          <Cloud size={20} />
          Reset to Default
        </button>
      </div>

      {/* Theme Toggle Section */}
      <div className={styles.themeSection}>
        <div className={styles.themeToggle}>
          <Sun size={20} />
          <span>Light Mode</span>
          <div className={styles.toggleSwitch}>
            <input type="checkbox" id="themeToggle" className={styles.toggleInput} />
            <label htmlFor="themeToggle" className={styles.toggleLabel}></label>
          </div>
          <span>Dark Mode</span>
          <Moon size={20} />
        </div>
      </div>
    </div>
  );
};


