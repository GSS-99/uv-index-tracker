import React, { useCallback, useEffect, useState } from 'react';
import CurrentLocation from '../components/CurrentLocation';
import { getLocationsApi } from '../api/locationApi';

export default function CitySelection({
  newlyAddedCity,
  selectedCity,
  onSelectCity,
  onCurrentLocationDetected,
}) {
  const [currentCity, setCurrentCity] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [listError, setListError] = useState(null);

  useEffect(() => {
    const loadSavedCities = async () => {
      try {
        const locations = await getLocationsApi();
        setSavedCities(locations);
      } catch (err) {
        setListError(err.message);
      }
    };
    loadSavedCities();
  }, []);

  useEffect(() => {
    if (newlyAddedCity) {
      setSavedCities((prev) => [newlyAddedCity, ...prev]);
    }
  }, [newlyAddedCity]);

  // Memoized handler to avoid unnecessary re-triggers
  const handleCurrentLocation = useCallback(
    (located) => {
      setCurrentCity(located);
      if (onCurrentLocationDetected) {
        onCurrentLocationDetected(located);
      }
      // Set initial city only if no city is currently selected
      if (!selectedCity) {
        onSelectCity(located);
      }
    },
    [selectedCity, onSelectCity, onCurrentLocationDetected]
  );

  return (
    <div className="city-selection-container">
      {/* Run geolocation worker silently without status markup */}
      {!currentCity && <CurrentLocation onLocated={handleCurrentLocation} />}

      <section className="saved-cities">
        {listError && <p className="error">{listError}</p>}
        {savedCities.length === 0 && !listError && !currentCity && (
          <p>No saved cities yet. Search to add one.</p>
        )}
        <ul className="saved-cities-list">
          {currentCity && (
            <li>
              <button
                type="button"
                className="button current-location-btn"
                onClick={() => onSelectCity(currentCity)}
              >
                📍 {currentCity.city_name} (Current Location)
              </button>
            </li>
          )}

          {savedCities.map((city) => (
            <li key={city.id ?? `${city.city_name}-${city.latitude}`}>
              <button
                type="button"
                className="button"
                onClick={() => onSelectCity(city)}
              >
                {[city.city_name, city.country_name]
                  .filter(Boolean)
                  .join(', ')}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}