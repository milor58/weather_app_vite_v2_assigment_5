export default function RecentSearches({ cities, onPick }) {
  if (cities.length === 0) return null;

  return (
    <nav className="recent" aria-label="Recent searches">
      <span className="recent__label">Recent</span>
      {cities.map(name => (
        <button
          key={name}
          type="button"
          className="recent__chip"
          onClick={() => onPick(name)}
        >
          {name}
        </button>
      ))}
    </nav>
  );
}
