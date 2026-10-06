import React, { useState, useEffect, useRef } from 'react';

export default function Menu({ onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    if (action === 'logout') {
      if (onLogout) onLogout();
    } else if (onNavigate) {
      onNavigate(action);
    }
  };

  return (
    <div className="hamburger-menu-container" ref={menuRef} style={{ position: 'relative' }}>
      <button
        type="button"
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        style={{
          background: 'transparent',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ☰
      </button>

      {isOpen && (
        <div
          className="menu-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            padding: '0.5rem 0',
            minWidth: '150px',
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <button
                type="button"
                onClick={() => handleAction('home')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  color: '#333',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleAction('profile')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  color: '#333',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Profile
              </button>
            </li>
            <li style={{ borderTop: '1px solid #eee', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
              <button
                type="button"
                onClick={() => handleAction('logout')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  color: '#d9534f',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}