import React, { useEffect, useState } from 'react';
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
  const { recommendedSpf, advice } = calculateProtectionData(
    userSkinType,
    activeUv
  );

  return (
    <div
      className="protection-calculator"
      style={{
        marginTop: '1rem',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <p style={{ margin: '0.4rem 0', fontSize: '1.05rem' }}>
        <strong>Recommended Protection:</strong> {recommendedSpf}
      </p>
      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', opacity: 0.9 }}>
        {advice}
      </p>
    </div>
  );
}