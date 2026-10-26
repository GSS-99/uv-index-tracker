import React from 'react';
import { getUvCategory } from '../utils/uvColors';

export default function UVDisplay({ selectedCity, uvData, loading, error }) {
  if (!selectedCity) {
    return <p>Select or search for a location to view UV metrics.</p>;
  }
  if (loading) return <div className="loading">Fetching UV index...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!uvData) return null;

  const category = getUvCategory(uvData.currentUv);

  return (
    <div>
      <h1>{uvData.currentUv.toFixed(1)}</h1>
      <p>{category.level} risk</p>
      <p>Max today: <strong>{uvData.maxUvToday.toFixed(1)}</strong></p>
    </div>
  );
}