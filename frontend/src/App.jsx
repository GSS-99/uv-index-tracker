import React, { useState, useEffect } from 'react';

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/locations');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLocations(data);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    
    <div className="container">
      <div >
        <h1 className="saved-locations">
          UV Index Tracker — Saved Locations
        </h1>

        {loading && <p className="loading">Loading locations...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && locations.length === 0 && (
          <p>No locations found.</p>
        )}

        <ul className="locations">
          {locations.map((loc) => (
            <li 
              key={loc.id} 
             >
              <span className="city-name">{loc.city_name}</span>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;