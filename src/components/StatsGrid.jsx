import { formatTemp } from '../utils/units';

export default function StatsGrid({ current, unit }) {
  const stats = [
    { label: 'Feels like', value: `${formatTemp(current.feelsLike, unit)}°${unit.toUpperCase()}` },
    { label: 'Humidity', value: `${current.humidity}%` },
    { label: 'Wind', value: `${Math.round(current.wind)} km/h` },
    { label: 'Pressure', value: `${Math.round(current.pressure)} hPa` },
  ];

  return (
    <dl className="stats">
      {stats.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
