const UNITS = [
  { value: 'c', label: '°C' },
  { value: 'f', label: '°F' },
];

export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="units" role="group" aria-label="Temperature unit">
      {UNITS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={unit === value ? 'units__btn units__btn--active' : 'units__btn'}
          aria-pressed={unit === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
