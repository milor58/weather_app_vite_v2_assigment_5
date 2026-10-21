import { useState, useCallback } from 'react';

const KEY = 'weather:recent';
const MAX = 5;

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(saved) ? saved.filter(c => typeof c === 'string') : [];
  } catch {
    return [];
  }
}

// Remembers the last few successful searches in this browser.
export default function useRecentSearches() {
  const [recent, setRecent] = useState(load);

  const addRecent = useCallback(city => {
    setRecent(prev => {
      const next = [city, ...prev.filter(c => c.toLowerCase() !== city.toLowerCase())].slice(0, MAX);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage blocked: the list just won't be remembered */
      }
      return next;
    });
  }, []);

  return [recent, addRecent];
}
