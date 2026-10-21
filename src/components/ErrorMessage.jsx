export default function ErrorMessage({ message, onRetry }) {
  return (
    <section className="status status--error" role="alert">
      <p className="status__text">{message}</p>
      <button className="retry" type="button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}
