import React, { useCallback, useEffect, useState } from 'react';
import SaveLocation from '../components/SaveLocation';
import CurrentLocation from '../components/CurrentLocation';
import { getLocationsApi } from '../api/locationApi';

export default function CitySelection() {
    const [selectedCity, setSelectedCity] = useState(null);
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

    const handleNewCity = (savedCity) => {
        setSelectedCity(savedCity);
        setSavedCities((prev) => [savedCity, ...prev]);
    };

    const handleCurrentLocation = useCallback((located) => {
        setSelectedCity((current) => current ?? located);
    }, []);

    return (
        <div className="dashboard-container">
            <SaveLocation newLocation={handleNewCity} />
            <CurrentLocation onLocated={handleCurrentLocation} />

            {selectedCity && (
                <div className="selected-city-display">
                    <h2>{selectedCity.city_name}</h2>
                </div>
            )}

            <section className="saved-cities">
                <h3>Saved cities</h3>
                {listError && <p className="error">{listError}</p>}
                {savedCities.length === 0 && !listError && (
                    <p>No saved cities yet. Search to add one.</p>
                )}
                <ul className="saved-cities-list">
                    {savedCities.map((city) => (
                        <li key={city.id ?? `${city.city_name}-${city.latitude}`}>
                            <button
                                type="button"
                                className="saved-city-button"
                                onClick={() => setSelectedCity(city)}
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