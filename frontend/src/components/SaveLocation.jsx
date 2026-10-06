import React, { useState } from 'react';
import Menu from './Menu';

export default function SaveLocation({ newLocation }) {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Trigger city search / add logic here
    setQuery('');
  };

  return (
    <div
      className="save-location-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        width: '100%',
        marginBottom: '1rem',
      }}
    >
      <form
        onSubmit={handleSearchSubmit}
        style={{ flex: 1, display: 'flex', alignItems: 'center' }}
      >
        <input
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 1rem',
            borderRadius: '20px',
            border: '1px solid #ccc',
            fontSize: '0.95rem',
          }}
        />
      </form>

      <Menu />
    </div>
  );
}