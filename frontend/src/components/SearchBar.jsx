import React, { useState, useEffect } from 'react';

export default function SearchBar ({onAddLocation}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (searchTerm) => { //Fetches data from the open meteo api.
    if (!searchTerm.trim()) {
      setResults([]); return;}
      setLoading(true);
      setError(null);
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        searchTerm)}&count=5&language=en&format=json`);
      
      if (!response.ok){
        throw new Error('Failed to fetch location data.')
      }

      const data = await response.json();
      console.log(data)
      setResults(data.results || []);

    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false)
    }
  };

  const handleSelect = (location) => {
    setQuery('');
    setResults([]);
    if (onAddLocation){
      onAddLocation(location);
    }
  };

  useEffect(()=>{
    if (!query.trim()) {
      setResults([]); return;
    } const timer = setTimeout(()=>{
      handleSearch(query);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return(
    <div className="searchBar">
      <input 
      type='search'
      value={query}
      onChange={handleChange}
      placeholder='Add new location...'
      />
      {loading && <div className='loading'>Searching...</div>}
      {error && <div className='error'>{error}</div>}

      {results.length > 0 && (
        <ul className='results-dropdown'>
          {results.map((item) => (
            <li key={item.id} onClick={()=>handleSelect(item)}>
              {item.name}
              {item.admin1 ? `, ${item.admin1}`:''}
              {item.country ? `, ${item.country}`:''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};