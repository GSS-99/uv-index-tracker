import React, { useState, useEffect } from 'react';

export default function ReapplicationTimer({ selectedCity, currentCity }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // Check if the currently viewed city is the browser's physical geolocation
  const isCurrentLocation =
    selectedCity &&
    currentCity &&
    Number(selectedCity.latitude) === Number(currentCity.latitude) &&
    Number(selectedCity.longitude) === Number(currentCity.longitude);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const handleStartTimer = () => {
    requestNotificationPermission();
    setTimeLeft(120 * 60); // 2 hours
    setIsActive(true);
  };

  const handleResetTimer = () => {
    setIsActive(false);
    setTimeLeft(null);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Sunscreen Reapplication Time!', {
          body: 'It has been 2 hours! Time to reapply your SPF protection.',
          icon: '☀️',
        });
      } else {
        alert('☀️ Time to reapply your sunscreen!');
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Do not render anything if the user is looking at a searched/saved city
  if (!isCurrentLocation) return null;

  return (
    <div
      className="reapplication-timer"
      style={{
        marginTop: '1rem',
        padding: '0.75rem 1rem',
        textAlign: 'center',
        width: '100%',
      }}
    >
      {!isActive ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>
            Keep your skin protected!
          </p>
          <button
            type="button"
            className="button"
            onClick={handleStartTimer}
            style={{
              backgroundColor: 'var(--color-dark)',
              color: '#ffffff',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              fontWeight: '600',
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.1s ease, opacity 0.2s ease',
            }}
          >
            Remind me in two hours!
          </button>
        </div>
      ) : (
        <div>
          <p className='info'>
            Next sunscreen reapplication in:
          </p>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.25rem 0' }}>
            {formatTime(timeLeft)}
          </div>
          <button
            type="button"
            className="button info"
            onClick={handleResetTimer}
          >
            Stop timer
          </button>
        </div>
      )}
    </div>
  );
}