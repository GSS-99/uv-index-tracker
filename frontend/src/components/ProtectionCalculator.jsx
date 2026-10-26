import { useEffect, useState } from 'react';
import { calculateProtectionData } from '../utils/sunProtection';
import { getProfileApi } from '../api/profileApi';

export default function ProtectionCalculator({ currentUv }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return null;

  const userSkinType = profile?.fitzpatrick_type || 2;
  const activeUv = Number(currentUv) || 0;
  const { advice } = calculateProtectionData(
    userSkinType,
    activeUv
  );

  return (
    <div className='info'>
      <p><strong>Recommended:</strong> {advice}</p>
    </div>
  );
}