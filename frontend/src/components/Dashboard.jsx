import React, { useEffect } from 'react';
import UVDisplay from './UVDisplay';
import ProtectionCalculator from './ProtectionCalculator';
import ReapplicationTimer from './ReapplicationTimer';
import useUvIndex from '../hooks/useUvIndex';
import { getUvColorVariable } from '../utils/uvColors';

export default function Dashboard({ selectedCity, currentCity }) {
  const { uvData, loading, error } = useUvIndex(selectedCity);

  useEffect(() => {
  document.documentElement.style.setProperty(
    '--bg-current',
    getUvColorVariable(uvData?.currentUv)
  );
}, [uvData]);

  return (
    <div className="dashboard-container">
      <div className="uv-info">
        <UVDisplay
          selectedCity={selectedCity}
          uvData={uvData}
          loading={loading}
          error={error}
        />
        <ProtectionCalculator currentUv={uvData?.currentUv} />
      </div>
      <ReapplicationTimer selectedCity={selectedCity} currentCity={currentCity} />
    </div>
  );
}