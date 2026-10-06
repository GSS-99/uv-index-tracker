export async function getLocationsApi() {
  const response = await fetch('/api/locations');
  if (!response.ok) {
    throw new Error('Failed to load saved locations.');
  }
  return await response.json();
}

export async function saveLocationApi(locationInfo) {
  const response = await fetch('/api/locations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locationInfo),
  });
  if (!response.ok) {
    throw new Error('Failed to save location.');
  }
  return await response.json();
}

// Add this export so SaveLocation.jsx stops crashing:
export async function searchLocationApi(query) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query
    )}&count=5&language=en&format=json`
  );
  if (!response.ok) {
    throw new Error('Failed to search locations.');
  }
  const data = await response.json();
  return (data.results || []).map((item) => ({
    id: item.id,
    city_name: item.name,
    country_name: item.country || '',
    admin1_name: item.admin1 || '',
    latitude: item.latitude,
    longitude: item.longitude,
  }));
}