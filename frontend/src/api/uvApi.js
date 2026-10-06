export async function getUvIndexApi(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=uv_index,uv_index_clear_sky&daily=uv_index_max&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch UV index data.');
  }

  const data = await response.json();

  return {
    currentUv: data.current?.uv_index ?? 0,
    clearSkyUv: data.current?.uv_index_clear_sky ?? 0,
    maxUvToday: data.daily?.uv_index_max?.[0] ?? 0,
    time: data.current?.time,
  };
}