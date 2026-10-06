import React, { useEffect, useState } from 'react';
import { getUvIndexApi } from '../api/uvApi';

// Get risk level details and corresponding CSS variable name
function getUvCategory(uvIndex) {
  if (uvIndex <= 2) {
    return { level: 'Low', colorVar: 'var(--color-low)' };
  }
  if (uvIndex <= 5) {
    return { level: 'Moderate', colorVar: 'var(--color-moderate)' };
  }
  if (uvIndex <= 7) {
    return { level: 'High', colorVar: 'var(--color-high)' };
  }
  if (uvIndex <= 10) {
    return { level: 'Very High', colorVar: 'var(--color-very-high)' };
  }
  return { level: 'Extreme', colorVar: 'var(--color-extreme)' };
}

export default function UVDisplay({ selectedCity }) {
  const [uvData, setUvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCity?.latitude || !selectedCity?.longitude) return;

    const fetchUvData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUvIndexApi(
          selectedCity.latitude,
          selectedCity.longitude
        );
        setUvData(data);

        // Dynamically update page background color matching index.css palette
        const category = getUvCategory(data.currentUv);
        document.documentElement.style.setProperty(
          '--bg-current',
          category.colorVar
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUvData();
  }, [selectedCity]);

  if (!selectedCity) {
    return <p>Select or search for a location to view UV metrics.</p>;
  }

  if (loading) return <div className="loading">Fetching UV index...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!uvData) return null;

  const category = getUvCategory(uvData.currentUv);

  return (
    <div className="uv-display-card" style={{ textAlign: 'center' }}>
      <div className="uv-primary">
        <span style={{ fontSize: '3.5rem', fontWeight: 'bold' }}>
          {uvData.currentUv.toFixed(1)}
        </span>
        <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>
          {category.level} Risk
        </div>
      </div>

      <div
        className="uv-details"
        style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          marginTop: '1rem',
          fontSize: '0.9rem',
        }}
      >
        <div>
          <strong>Max Today:</strong> {uvData.maxUvToday.toFixed(1)}
        </div>
        <div>
          <strong>Clear Sky UV:</strong> {uvData.clearSkyUv.toFixed(1)}
        </div>
      </div>
    </div>
  );
}