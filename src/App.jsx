import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import UnitToggle from './components/UnitToggle';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherCard from './components/WeatherCard';
import Footer from './components/Footer';
import useWeather from './hooks/useWeather';
import useRecentSearches from './hooks/useRecentSearches';
import useSmoothScroll from './hooks/useSmoothScroll';
import { themeFor } from './utils/weatherCodes';

const DEFAULT_CITY = 'Beirut';

export default function App() {
  useSmoothScroll();

  
  const [city, setCity] = useState(DEFAULT_CITY); 
  const [unit, setUnit] = useState('c'); 
  const [attempt, setAttempt] = useState(0); // bumped by "Try again"
  const [searchError, setSearchError] = useState(''); // empty-input mrun essage

  const { status, data, error } = useWeather(city, attempt);
  const [recent, addRecent] = useRecentSearches();

  // Side effect 2: remember the city once it loaded successfully.
  useEffect(() => {
    if (status === 'success') addRecent(data.city);
  }, [status, data, addRecent]);

  // Side effect 3: change the page colours to match the weather.
  useEffect(() => {
    const theme =
      status === 'success'
        ? themeFor(data.current.code, data.current.isDay)
        : 'default';
    document.body.dataset.theme = theme;
  }, [status, data]);

  function handleSearch(name) {
    const clean = name.trim();
    if (clean === '') {
      setSearchError('Enter a city name to search.');
      return;
    }
    setSearchError('');
    setCity(clean);
  }

  return (
    <>
      <main className="app">
        <header className="app__head">
          <h1 className="app__title">Weather</h1>
          <UnitToggle unit={unit} onChange={setUnit} />
        </header>

        <SearchBar
          onSearch={handleSearch}
          disabled={status === 'loading'}
          error={searchError}
        />
        <RecentSearches cities={recent} onPick={handleSearch} />

        {status === 'loading' && <LoadingSpinner city={city} />}
        {status === 'error' && (
          <ErrorMessage message={error} onRetry={() => setAttempt(a => a + 1)} />
        )}
        {status === 'success' && <WeatherCard weather={data} unit={unit} />}
      </main>

      <Footer />
    </>
  );
}