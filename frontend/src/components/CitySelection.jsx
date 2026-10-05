import React, { useCallback, useEffect, useState } from 'react';
import CurrentLocation from '../components/CurrentLocation';
import { getLocationsApi } from '../api/locationApi';

export default function CitySelection({ newlyAddedCity, selectedCity, onSelectCity }) {
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

  // Sync newly added city from top SaveLocation component
  useEffect(() => {
    if (newlyAddedCity) {
      setSavedCities((prev) => [newlyAddedCity, ...prev]);
    }
  }, [newlyAddedCity]);

  // Set initial selected city when current geolocation arrives
  const handleCurrentLocation = useCallback(
    (located) => {
      setCurrentCity(located);
      if (!selectedCity) {
        onSelectCity(located);
      }
    },
    [selectedCity, onSelectCity]
  );

  return (
    <div className="city-selection-container">
      {/* Location detection worker */}
      <CurrentLocation onLocated={handleCurrentLocation} />

      <section className="saved-cities">
        {listError && <p className="error">{listError}</p>}
        {savedCities.length === 0 && !listError && (
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
                {[city.city_name, city.admin1_name, city.country_name]
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