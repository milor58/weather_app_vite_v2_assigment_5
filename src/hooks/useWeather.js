import { useState, useEffect } from 'react';
import { getWeather } from '../api/weather';

const IDLE = { status: 'idle', data: null, error: '' };

// Fetches weather whenever `city` (or `attempt`, used by "Try again") changes.
export default function useWeather(city, attempt) {
  const [state, setState] = useState(IDLE);

  useEffect(() => {
    if (!city) {
      setState(IDLE);
      return undefined;
    }

    // Lets us cancel an old request if the user searches again quickly.
    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: '' });

    getWeather(city, controller.signal)
      .then(data => setState({ status: 'success', data, error: '' }))
      .catch(err => {
        if (err.name === 'AbortError') return; // we cancelled it ourselves
        setState({
          status: 'error',
          data: null,
          error: err.type ? err.message : 'Something went wrong. Try again.',
        });
      });

    return () => controller.abort(); // cleanup: runs before the next effect
  }, [city, attempt]);

  return state;
}
