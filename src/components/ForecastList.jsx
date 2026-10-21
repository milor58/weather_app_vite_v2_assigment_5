import { describeCode, emojiFor } from '../utils/weatherCodes';
import { formatTemp } from '../utils/units';

// "2026-10-22" -> "Thu". Noon avoids the date shifting across time zones.
const weekday = date =>
  new Date(`${date}T12:00:00`).toLocaleDateString('en', { weekday: 'short' });

export default function ForecastList({ days, unit }) {
  return (
    <section className="forecast" aria-label="Five day forecast">
      <h3 className="forecast__title">Next 5 days</h3>
      <ul className="forecast__list">
        {days.map(day => (
          <li key={day.date} className="forecast__day">
            <span className="forecast__name">{weekday(day.date)}</span>
            <span
              className="forecast__icon"
              role="img"
              aria-label={describeCode(day.code)}
            >
              {emojiFor(day.code)}
            </span>
            <span className="forecast__temps">
              <strong>{formatTemp(day.max, unit)}°</strong>
              <span>{formatTemp(day.min, unit)}°</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
