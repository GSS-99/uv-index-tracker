import React, { useState, useEffect, useRef } from 'react';
import Menu from './Menu';
import { searchLocationApi, saveLocationApi } from '../api/locationApi';

export default function SaveLocation({ newLocation, onNavigate, onLogout }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Debounced auto-search as user types
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const searchResults = await searchLocationApi(query.trim());
        setResults(searchResults);
        if (searchResults.length === 0) {
          setError('No locations found matching your search.');
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch location data.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectCity = async (city) => {
    setQuery('');
    setResults([]);
    setError(null);

    try {
      const savedCity = await saveLocationApi(city);
      newLocation(savedCity);
    } catch (err) {
      console.warn('Backend save failed, falling back to local state:', err);
      newLocation(city);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-bar-container" ref={dropdownRef}>
      <div className="save-location-header">
        <input
          type="search"
          placeholder={loading ? 'Searching locations...' : 'Search location...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Menu onNavigate={onNavigate} onLogout={onLogout} />
      </div>

      {results.length > 0 && (
        <ul className="results-dropdown">
          {results.map((item) => (
            <li
              key={item.id ?? `${item.city_name}-${item.latitude}`}
              onClick={() => handleSelectCity(item)}
            >
              {[item.city_name, item.admin1_name, item.country_name]
                .filter(Boolean)
                .join(', ')}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}