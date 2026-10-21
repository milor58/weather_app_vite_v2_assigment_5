import StatsGrid from './StatsGrid';
import ForecastList from './ForecastList';
import { describeCode, emojiFor } from '../utils/weatherCodes';
import { formatTemp } from '../utils/units';

// Shows the headline weather, then hands the details to two child components.
export default function WeatherCard({ weather, unit }) {
  const { city, country, current, forecast } = weather;

  return (
    <article className="weather">
      <header className="weather__head">
        <h2 className="weather__city">
          {city}
          {country && `, ${country}`}
        </h2>
        <p className="weather__desc">{describeCode(current.code)}</p>
      </header>

      <div className="weather__main">
        <span className="weather__icon" role="img" aria-label={describeCode(current.code)}>
          {emojiFor(current.code, current.isDay)}
        </span>
        <p className="weather__temp">
          {formatTemp(current.temp, unit)}
          <span className="weather__unit">°{unit.toUpperCase()}</span>
        </p>
      </div>

      <StatsGrid current={current} unit={unit} />
      <ForecastList days={forecast} unit={unit} />
    </article>
  );
}
