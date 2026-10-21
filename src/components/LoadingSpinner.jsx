export default function LoadingSpinner({ city }) {
  return (
    <section className="status" role="status" aria-live="polite">
      <div className="spinner" />
      <p className="status__text">Loading weather for {city}…</p>
    </section>
  );
}
