import React, { useCallback, useEffect, useState, useRef } from 'react';
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

  // Keep a stable reference to onSelectCity to prevent callback dependency loops
  const onSelectCityRef = useRef(onSelectCity);
  useEffect(() => {
    onSelectCityRef.current = onSelectCity;
  }, [onSelectCity]);

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

  const handleCurrentLocation = useCallback(
    (located) => {
      setCurrentCity(located);
      if (onCurrentLocationDetected) {
        onCurrentLocationDetected(located);
      }
      if (!selectedCity && onSelectCityRef.current) {
        onSelectCityRef.current(located);
      }
    },
    [selectedCity, onCurrentLocationDetected]
  );

  return (
    <div className="city-selection-container">
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