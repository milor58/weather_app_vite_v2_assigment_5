// All network code lives here. Components never call fetch directly.
// Open-Meteo is free and needs no API key: https://open-meteo.com

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const TIMEOUT_MS = 12000;

export class WeatherError extends Error {
  constructor(type, message) {
    super(message);
    this.name = 'WeatherError';
    this.type = type;
  }
}

// fetch + timeout + friendly errors. `signal` lets React cancel the request.
async function fetchJson(url, signal) {
  const timeout = new AbortController();
  const timer = setTimeout(() => timeout.abort(), TIMEOUT_MS);
  const forwardAbort = () => timeout.abort();
  signal?.addEventListener('abort', forwardAbort);

  try {
    const response = await fetch(url, { signal: timeout.signal });

    if (response.status === 429) {
      throw new WeatherError('rate-limit', 'The weather service is busy. Wait a minute, then try again.');
    }
    if (!response.ok) {
      throw new WeatherError('server', `The weather service had a problem (HTTP ${response.status}). Try again.`);
    }
    return await response.json();
  } catch (err) {
    if (err instanceof WeatherError) throw err;
    if (err.name === 'AbortError') {
      if (signal?.aborted) throw err; // cancelled by React, not an error to show
      throw new WeatherError('timeout', 'The request took too long. Check your connection and try again.');
    }
    throw new WeatherError('network', "Couldn't reach the weather service. Check that you are online.");
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', forwardAbort);
  }
}

// Step 1: city name -> coordinates
async function findCity(city, signal) {
  const params = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
  const data = await fetchJson(`${GEOCODING_URL}?${params}`, signal);

  const place = data.results?.[0];
  if (!place) {
    throw new WeatherError('not-found', "We couldn't find that city. Check the spelling and try again.");
  }
  return place;
}

// Step 2: coordinates -> current weather + 5-day forecast
export async function getWeather(city, signal) {
  const place = await findCity(city, signal);

  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,pressure_msl,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '6',
  });
  const data = await fetchJson(`${FORECAST_URL}?${params}`, signal);

  if (!data.current || !data.daily) {
    throw new WeatherError('bad-data', 'The weather service sent a response we could not read.');
  }

  const { current, daily } = data;

  return {
    city: place.name,
    country: place.country_code ?? place.country ?? '',
    current: {
      temp: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      wind: current.wind_speed_10m, // km/h
      pressure: current.pressure_msl, // hPa
      code: current.weather_code,
      isDay: current.is_day === 1,
    },
    // Skip index 0 (today) so the list shows the next 5 days.
    forecast: daily.time.slice(1).map((date, i) => ({
      date,
      code: daily.weather_code[i + 1],
      max: daily.temperature_2m_max[i + 1],
      min: daily.temperature_2m_min[i + 1],
    })),
  };
}
