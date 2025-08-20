import { ReactElement, useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchWeatherData } from '../../api/weather';

export const SearchBar = (): ReactElement => {
  const navigate = useNavigate();
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
          <input type="text" placeholder="Search City" className={styles.searchBarInput} name="search" />
        </form>
        <Search size={28} className={styles.searchBarIcon} />
      </div>
    </div>
  );
};