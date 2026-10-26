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
    <div>
      {!isActive ? (
        <div className='reminder'>
          <p>
            Remember to reapply your sunscreen!
          </p>
          <button
            type="button"
            className="button"
            onClick={handleStartTimer}
          >
            <strong>Start timer.</strong>
          </button>
        </div>
      ) : (
        <div className='reminder'>
          <p className='info'>Next sunscreen reapplication in:  
            <strong> {formatTime(timeLeft)}</strong>
          </p>
          <button
            type="button"
            className="button"
            onClick={handleResetTimer}
          > <strong>Stop.</strong> </button>
        </div>  
      )}
    </div>
  );
}