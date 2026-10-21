// Temperatures arrive in °C. Converting happens here, in the browser,
// so switching °C/°F needs no new request.

export function formatTemp(celsius, unit) {
  const value = unit === 'f' ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(value);
}
