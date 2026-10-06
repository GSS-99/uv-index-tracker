import React, { useState } from 'react';
import UVDisplay from './UVDisplay';
import ProtectionCalculator from './ProtectionCalculator';
import ReapplicationTimer from './ReapplicationTimer';

export default function Dashboard({ selectedCity, currentCity }) {
  const [currentUv, setCurrentUv] = useState(null);

  return (
    <div className="dashboard-container">
      <UVDisplay selectedCity={selectedCity} onUvLoaded={setCurrentUv} />
      <ProtectionCalculator currentUv={currentUv} />
      <ReapplicationTimer selectedCity={selectedCity} currentCity={currentCity} />
    </div>
  );
}