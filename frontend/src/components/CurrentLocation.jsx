import React, { useEffect, useState } from 'react';

function formatPlaceName(place) {
  return [place.city_name, place.admin1_name, place.country_name]
    .filter(Boolean)
    .join(', ');
}

export default function CurrentLocation({ onLocated }) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (!response.ok) {
            throw new Error('Failed to resolve current location.');
          }
          const data = await response.json();
          const located = {
            city_name: data.city || data.locality || 'Current location',
            country_name: data.countryName || '',
            admin1_name: data.principalSubdivision || '',
            latitude,
            longitude,
          };
          setPlace(located);
          if (onLocated) {
            onLocated(located);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setError(geoError.message || 'Location permission denied.');
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, [onLocated, retryCount]);

  return (
    <section className="current-location">
      <h3>Current location</h3>
      {loading && <p>Detecting your location...</p>}
      {error && (
        <div>
          <p className="error">{error}</p>
          <button
            type="button"
            className="saved-city-button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Try again
          </button>
        </div>
      )}
      {place && <p>{formatPlaceName(place)}</p>}
    </section>
  );
}
