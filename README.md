Hello *__* ^__*
# Weather Dashboard (React)

Assignment 5: the Assignment 4 weather dashboard rebuilt as a React app (Vite).
Type a city name and see the current weather and a 5-day forecast. Switch between °C and °F, and click a recent search to load it again. The page colours change with the weather.

Data comes from [Open-Meteo](https://open-meteo.com), which is free and needs **no API key**, so there is nothing to configure.
## {*Attention*}: last assigment 4 i used an another database  and it needed an api key and more configures to run it so now i  have make it more practical to use it i also added smooth scroll to make more practical so we have new hook smooth scroll plus

## Install and run
i have push npm into the repo but in moodle i havnt put it cz the zip file will be 10 mb so no need and its easy to install node
You need Node.js 18 or newer.

```bash
npm install
npm run dev
```


Then open the address Vite prints (usually http://localhost:5173).

Other commands: `npm run build` (production build) and `npm run preview`.

## Components

| Component | Job |
|---|---|
| `App` | Holds the shared state, runs the effects, decides what to show |
| `SearchBar` | Controlled input; calls `onSearch` when submitted |
| `RecentSearches` | Buttons for the last 5 successful searches |
| `UnitToggle` | °C / °F switch |
| `LoadingSpinner` | Loading state |
| `ErrorMessage` | Error state with a "Try again" button |
| `WeatherCard` | Success state: city, temperature, description |
| `StatsGrid` | Feels like, humidity, wind, pressure |
| `ForecastList` | The next 5 days |
| `Footer` | Name and course ID |

Each component is in its own file in `src/components/`. Everything is a function component with hooks.

## State and effects

**`useState`** (in `App`): `city` (the submitted search), `unit`, `attempt` (the retry counter) and `searchError`. `SearchBar` also keeps its own `text` state for what is being typed, because nobody else needs it. `useWeather` keeps the request state (`status`, `data`, `error`).

**`useEffect`**
1. `useWeather` (`src/hooks/useWeather.js`) fetches the weather. Its dependency array is `[city, attempt]`, so it runs again when the city changes or when "Try again" is clicked. The cleanup function aborts the old request, so a slow earlier search can never overwrite a newer one.
2. `App` saves a city to the recent list after a successful load (`[status, data, addRecent]`).
3. `App` sets the page theme from the weather (`[status, data]`).

## Props and state lifting

- `App` → `SearchBar`: `onSearch`, `disabled`, `error`
- `App` → `RecentSearches`: `cities`, `onPick`
- `App` → `UnitToggle`: `unit`, `onChange`
- `App` → `ErrorMessage`: `message`, `onRetry`
- `App` → `WeatherCard` → `StatsGrid` / `ForecastList`: `weather` data and `unit`

State is lifted into `App` because the search, the unit toggle, the recent list and the card all depend on the same values. Data goes down at most **two levels** (`App` → `WeatherCard` → `StatsGrid`/`ForecastList`), and each level actually uses the props, so no prop drilling or Context was needed.

## Loading, error and success states

`App` shows exactly one of them based on `status`:
- **loading**: spinner, and the Search button is disabled
- **error**: plain-language message and a Try again button
- **success**: the weather card

Handled errors: empty search, city not found, service busy (429), service down, no internet, and a request taking more than 12 seconds.

## Project structure

```
src/
  main.jsx
  App.jsx
  styles.css
  api/weather.js          fetch calls (geocoding + forecast), error handling
  hooks/useWeather.js     fetching hook
  hooks/useRecentSearches.js
  utils/weatherCodes.js   weather code -> text, emoji, theme
  utils/units.js          °C -> °F
  components/             one file per component
```

## What changed from Assignment 4

- Plain HTML/JS and a Node proxy server became a React app run with `npm run dev`.
- OpenWeatherMap (needed a hidden key and `.env`) became Open-Meteo (no key).
- New: 5-day forecast, °C/°F toggle, recent searches.

## Author

Hussein Ezzeddine  232773
hussein.ezzeddine1@net.usj.edu.lb
