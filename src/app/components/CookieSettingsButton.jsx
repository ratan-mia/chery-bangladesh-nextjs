'use client';

import { useEffect, useState } from 'react';

// This component can be used anywhere in your application to open cookie settings
const CookieSettingsButton = ({ className = '', children }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined' && window.openCookiePreferences) {
      window.openCookiePreferences();
    }
  };
  
  // Only render the button on the client-side to avoid hydration errors
  if (!isClient) return null;
  
  return (
    <button 
      onClick={handleOpenCookieSettings}
      className={`${className}`}
    >
      {children || 'Cookie Settings'}
    </button>
  );
};

export default CookieSettingsButton;