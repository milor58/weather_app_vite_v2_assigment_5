import { useState } from 'react';

// Owns only the text being typed. Tells the parent when the user submits.
export default function SearchBar({ onSearch, disabled, error }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(text);
  }

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label className="visually-hidden" htmlFor="city-input">
        City name
      </label>
      <input
        id="city-input"
        className="search__input"
        type="text"
        placeholder="Search for a city, e.g. Beirut"
        autoComplete="off"
        value={text}
        onChange={e => setText(e.target.value)}
        aria-invalid={error !== ''}
        aria-describedby="search-error"
      />
      <button className="search__btn" type="submit" disabled={disabled}>
        Search
      </button>
      <p id="search-error" className="search__error" role="alert">
        {error}
      </p>
    </form>
  );
}
