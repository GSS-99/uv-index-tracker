import React, { useState } from 'react';
import SaveLocation from '../components/SaveLocation';
import Dashboard from '../components/Dashboard';
import CitySelection from '../components/CitySelection';

export default function HomePage() {
  const [newlyAddedCity, setNewlyAddedCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  const handleNewCity = (city) => {
    setSelectedCity(city);
    setNewlyAddedCity(city);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="page-container">
      <SaveLocation newLocation={handleNewCity} />

      {selectedCity && (
        <div className="selected-city-display">
          <h2>{selectedCity.city_name}</h2>
        </div>
      )}

      <Dashboard selectedCity={selectedCity} currentCity={currentCity} />

      <CitySelection
        newlyAddedCity={newlyAddedCity}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onCurrentLocationDetected={setCurrentCity}
      />
    </div>
  );
}