// Open-Meteo returns a WMO weather code (a number). This file turns it into
// words, an emoji and a colour theme for the page background.

const CODES = {
  0: ['Clear sky', 'clear'],
  1: ['Mainly clear', 'clear'],
  2: ['Partly cloudy', 'clouds'],
  3: ['Overcast', 'clouds'],
  45: ['Fog', 'mist'],
  48: ['Freezing fog', 'mist'],
  51: ['Light drizzle', 'rain'],
  53: ['Drizzle', 'rain'],
  55: ['Heavy drizzle', 'rain'],
  56: ['Freezing drizzle', 'rain'],
  57: ['Heavy freezing drizzle', 'rain'],
  61: ['Light rain', 'rain'],
  63: ['Rain', 'rain'],
  65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'rain'],
  67: ['Heavy freezing rain', 'rain'],
  71: ['Light snow', 'snow'],
  73: ['Snow', 'snow'],
  75: ['Heavy snow', 'snow'],
  77: ['Snow grains', 'snow'],
  80: ['Light showers', 'rain'],
  81: ['Showers', 'rain'],
  82: ['Violent showers', 'rain'],
  85: ['Snow showers', 'snow'],
  86: ['Heavy snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'],
  96: ['Thunderstorm with hail', 'storm'],
  99: ['Severe thunderstorm with hail', 'storm'],
};

const FALLBACK = ['Unknown conditions', 'mist'];

export function describeCode(code) {
  return (CODES[code] ?? FALLBACK)[0];
}

export function themeFor(code, isDay = true) {
  const theme = (CODES[code] ?? FALLBACK)[1];
  if (!isDay && theme === 'clear') return 'night';
  if (!isDay && theme === 'clouds') return 'night-clouds';
  return theme;
}

export function emojiFor(code, isDay = true) {
  const theme = (CODES[code] ?? FALLBACK)[1];
  if (theme === 'clear') return isDay ? '☀️' : '🌙';
  if (code === 2) return isDay ? '⛅' : '☁️';
  if (theme === 'clouds') return '☁️';
  if (theme === 'rain') return '🌧️';
  if (theme === 'snow') return '❄️';
  if (theme === 'storm') return '⛈️';
  return '🌫️';
}
