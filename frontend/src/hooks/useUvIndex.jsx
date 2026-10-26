import { useEffect, useState } from 'react';
import { getUvIndexApi } from '../api/uvApi';

export default function useUvIndex(selectedCity) {
  const [uvData, setUvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const latitude = selectedCity?.latitude;
  const longitude = selectedCity?.longitude;

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    let ignore = false; // guards against stale responses (race condition)

    const fetchUvData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUvIndexApi(latitude, longitude);
        if (!ignore) setUvData(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUvData();
    return () => { ignore = true; };
  }, [latitude, longitude]);

  return { uvData, loading, error };
}