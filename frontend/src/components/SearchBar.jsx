import { useState, useEffect } from 'react';

const SearchBar = ({ onSelect, endpoint = "https://geocoding-api.open-meteo.com/v1/search" }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = input.trim();

    // Reset results if input is empty
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // AbortController cancels outdated network requests
    const controller = new AbortController();

    // Debounce timer (waits 300ms after user stops typing)
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Adjust query parameters based on your API requirements
        const response = await fetch(`${endpoint}?name=${encodeURIComponent(query)}&count=10`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Open-Meteo returns items in data.results; adjust fallback as needed for your backend
        setResults(data.results || []); 
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch results');
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    // Cleanup function cancels both the timer and ongoing fetch if input changes
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [input, endpoint]);

  const handleSelect = (item) => {
    setInput(item.name);
    setResults([]);
    if (onSelect) {
      onSelect(item); // Pass selected item back to parent component or backend pipeline
    }
  };

  return (
    <div className="search-container">
      <div className="input-wrapper">
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search a location..."
          aria-label="Search location"
          aria-expanded={results.length > 0}
        />
        {isLoading && <span className="spinner">Loading...</span>}
      </div>

      {error && <div className="search-error">{error}</div>}

      {results.length > 0 && (
        <ul className="results-list" role="listbox">
          {results.map((item) => (
            <li
              key={item.id || item.name}
              onClick={() => handleSelect(item)}
              role="option"
              aria-selected="false"
            >
              {item.name}{item.country ? `, ${item.country}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;