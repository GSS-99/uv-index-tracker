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
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-sky-400 mb-4 text-center">
          UV Index Tracker — Saved Locations
        </h1>

        {loading && <p className="text-slate-400 text-center">Loading locations...</p>}
        {error && <p className="text-red-400 text-center">Error: {error}</p>}

        {!loading && !error && locations.length === 0 && (
          <p className="text-slate-400 text-center">No locations found.</p>
        )}

        <ul className="space-y-3">
          {locations.map((loc) => (
            <li 
              key={loc.id} 
              className="p-3 bg-slate-700 rounded-lg flex justify-between items-center"
            >
              <span className="font-medium text-slate-100">{loc.city_name}</span>
              <span className="text-xs text-slate-400">
                {Number(loc.latitude).toFixed(2)}, {Number(loc.longitude).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;