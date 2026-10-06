import React, { useState, useEffect, useRef } from 'react';

export default function Menu({ onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

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
    <div className="hamburger-menu-container" ref={menuRef}>
      <button
        type="button"
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            <li>
              <button type="button" className="button" onClick={() => handleAction('home')}>
                Home
              </button>
            </li>
            <li>
              <button type="button" className="button" onClick={() => handleAction('profile')}>
                Profile
              </button>
            </li>
            <li className="menu-logout-item">
              <button type="button" className="button logout-button" onClick={() => handleAction('logout')}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}