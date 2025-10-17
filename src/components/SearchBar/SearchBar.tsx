import { ReactElement, useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../../api/weather';
import { useDarkMode } from '../../contexts/DarkModeContext';

export const SearchBar = (): ReactElement => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = e.currentTarget.elements.namedItem('search') as HTMLInputElement;
    setSearchTerm(searchTerm.value);
    navigate(`/weather?city=${searchTerm.value}`);
  };

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    const weatherData = fetchWeatherData(searchTerm); 
    console.log(weatherData);
  }, [searchTerm]);


  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search City" className={`${styles.searchBarInput} ${darkMode ? styles.darkMode : ''}`} name="search" />
        </form>
      </div>
    </div>
  );
};