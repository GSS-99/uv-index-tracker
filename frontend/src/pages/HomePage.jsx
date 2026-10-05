import React, { useState } from 'react';
import SaveLocation from '../components/SaveLocation';
import Dashboard from '../components/Dashboard';
import CitySelection from '../components/CitySelection';

export default function HomePage() {
  const [newlyAddedCity, setNewlyAddedCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleNewCity = (city) => {
    setSelectedCity(city);
    setNewlyAddedCity(city);
  };

  return (
    <div className="page-container">
      {/* 1. TOP: Search Bar */}
      <SaveLocation newLocation={handleNewCity} />

      {/* 2. TOP SUB-HEADER: Selected City Display */}
      {selectedCity && (
        <div className="selected-city-display">
          <h2>{selectedCity.city_name}</h2>
        </div>
      )}

      {/* 3. MIDDLE: Dashboard */}
      <Dashboard selectedCity={selectedCity} />

      {/* 4. BOTTOM: Saved Cities List & Current Location Button */}
      <CitySelection
        newlyAddedCity={newlyAddedCity}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />
    </div>
  );
}