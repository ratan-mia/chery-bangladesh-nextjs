'use client';

import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Cookie management utility functions
const CookieUtils = {
  // Set a cookie with a given name, value and expiration days
  setCookie: (name, value, days = 365) => {
    if (typeof window === 'undefined') return;
    
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },
  
  // Get cookie value by name
  getCookie: (name) => {
    if (typeof window === 'undefined') return null;
    
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  
  // Delete a cookie by name
  deleteCookie: (name) => {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
  },
  
  // Apply cookie preferences based on user selection
  applyPreferences: (preferences) => {
    // Store preferences in a JSON cookie
    CookieUtils.setCookie('cheryCookiePreferences', JSON.stringify(preferences));
    
    // Apply actual cookie settings based on preferences
    // Necessary cookies are always enabled
    
    // Functional cookies
    if (preferences.functional.enabled) {
      // Enable functional cookies - this is where you'd set your actual functional cookies
      CookieUtils.setCookie('chery_functional_enabled', 'true');
    } else {
      // Disable functional cookies
      CookieUtils.deleteCookie('chery_functional_enabled');
      // Delete any functional cookies your site uses
      // Example: CookieUtils.deleteCookie('functional_cookie_name');
    }
    
    // Analytics cookies
    if (preferences.analytics.enabled) {
      // Enable analytics - this is where you'd initialize analytics services
      CookieUtils.setCookie('chery_analytics_enabled', 'true');
      // If using Google Analytics, you might re-initialize it here
      if (typeof window !== 'undefined' && window.gtag) {
        // Re-enable Google Analytics, for example
      }
    } else {
      // Disable analytics
      CookieUtils.deleteCookie('chery_analytics_enabled');
      // Block analytics cookies and scripts
      // If using Google Analytics, you might set GA to disabled here
    }
    
    // Advertising cookies
    if (preferences.advertising.enabled) {
      // Enable advertising cookies
      CookieUtils.setCookie('chery_advertising_enabled', 'true');
    } else {
      // Disable advertising cookies
      CookieUtils.deleteCookie('chery_advertising_enabled');
      // Delete any advertising cookies your site uses
    }
  },
  
  // Get stored preferences or return defaults
  getPreferences: () => {
    const defaultPreferences = {
      necessary: { enabled: true, required: true },
      functional: { enabled: false, required: false },
      analytics: { enabled: false, required: false },
      advertising: { enabled: false, required: false },
    };
    
    const storedPreferences = CookieUtils.getCookie('cheryCookiePreferences');
    if (!storedPreferences) return defaultPreferences;
    
    try {
      return JSON.parse(storedPreferences);
    } catch (e) {
      console.error('Error parsing cookie preferences', e);
      return defaultPreferences;
    }
  },
  
  // Check if consent has been given in any form
  hasConsent: () => {
    return CookieUtils.getCookie('cheryCookieConsent') === 'true';
  },
  
  // Set consent status
  setConsent: (hasConsent) => {
    CookieUtils.setCookie('cheryCookieConsent', hasConsent ? 'true' : 'false');
  }
};

const CookiesConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: { enabled: true, required: true },
    functional: { enabled: false, required: false },
    analytics: { enabled: false, required: false },
    advertising: { enabled: false, required: false },
  });

  // Check if user has already given consent when component mounts
  useEffect(() => {
    // Don't show banner if user already consented
    const hasConsent = CookieUtils.hasConsent();
    setIsVisible(!hasConsent);
    
    // Load saved preferences
    if (hasConsent) {
      const savedPreferences = CookieUtils.getPreferences();
      setCookiePreferences(savedPreferences);
    }
  }, []);

  const handleAccept = () => {
    // Accept all cookies
    const allAccepted = {
      necessary: { enabled: true, required: true },
      functional: { enabled: true, required: false },
      analytics: { enabled: true, required: false },
      advertising: { enabled: true, required: false },
    };
    
    // Update state
    setCookiePreferences(allAccepted);
    
    // Apply preferences to actual cookies
    CookieUtils.applyPreferences(allAccepted);
    
    // Set consent flag
    CookieUtils.setConsent(true);
    
    // Hide the banner
    setIsVisible(false);
  };

  const handleReject = () => {
    // Reject all except necessary cookies
    const allRejected = {
      necessary: { enabled: true, required: true },  // Always enabled
      functional: { enabled: false, required: false },
      analytics: { enabled: false, required: false },
      advertising: { enabled: false, required: false },
    };
    
    // Update state
    setCookiePreferences(allRejected);
    
    // Apply preferences to actual cookies
    CookieUtils.applyPreferences(allRejected);
    
    // Set consent flag
    CookieUtils.setConsent(true);
    
    // Hide the banner
    setIsVisible(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  const handleSavePreferences = () => {
    // Apply the selected preferences
    CookieUtils.applyPreferences(cookiePreferences);
    
    // Set consent flag
    CookieUtils.setConsent(true);
    
    // Hide the banner
    setIsVisible(false);
  };

  // Open cookie preferences dialog from anywhere in the app
  // You can call this function from other components
  const openPreferences = () => {
    setIsVisible(true);
    setShowSettings(true);
  };
  
  // Make the function globally available
  if (typeof window !== 'undefined') {
    window.openCookiePreferences = openPreferences;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {!showSettings ? (
        <div className="bg-[#b9aa97] text-gray-800 p-4 md:p-6 shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row md:items-center gap-4">
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              aria-label="Close cookie notice"
            >
              <X size={20} />
            </button>
            
            <div className="flex-1 pr-8">
              <h2 className="text-lg font-semibold mb-2">About Cookies On This Site</h2>
              <p className="text-sm mb-2">
                We use cookies to analyze site usage and improve our website and services. Click "Cookies Settings" to manage 
                yourpreferences. For more information, read our <Link href="/cookies-policy" className="underline">Cookies Policy</Link>.
              </p>
              
              <button 
                onClick={toggleSettings}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Cookie Settings
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <button
                onClick={handleAccept}
                className="bg-[#d7b997] hover:bg-[#c9aa87] text-gray-800 font-medium py-2 px-6 rounded"
              >
                Accept All
              </button>
              
              <button
                onClick={handleReject}
                className="bg-transparent hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded border border-gray-400"
              >
                Reject All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#b9aa97] text-gray-800 p-4 md:p-6 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={toggleSettings}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <ChevronRight size={16} className="transform rotate-180 mr-1" />
                Back
              </button>
              
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-700 hover:text-gray-900"
                aria-label="Close cookie settings"
              >
                <X size={20} />
              </button>
            </div>
            
            <h2 className="text-lg font-semibold mb-4">Cookie Settings</h2>
            
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="p-4 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Necessary Cookies</h3>
                  <div className="bg-gray-300 px-2 py-1 text-xs rounded text-gray-700">Required</div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies are necessary for the website to function and cannot be switched off in our systems.
                </p>
              </div>
              
              {/* Functional Cookies */}
              <div className="p-4 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Functional Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={cookiePreferences.functional.enabled}
                      onChange={() => setCookiePreferences({
                        ...cookiePreferences,
                        functional: {
                          ...cookiePreferences.functional,
                          enabled: !cookiePreferences.functional.enabled
                        }
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d7b997]"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies enable personalized features and functionality.
                </p>
              </div>
              
              {/* Analytics Cookies */}
              <div className="p-4 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Analytics Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={cookiePreferences.analytics.enabled}
                      onChange={() => setCookiePreferences({
                        ...cookiePreferences,
                        analytics: {
                          ...cookiePreferences.analytics,
                          enabled: !cookiePreferences.analytics.enabled
                        }
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d7b997]"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies help us to analyze how visitors use our website.
                </p>
              </div>
              
              {/* Advertising Cookies */}
              <div className="p-4 bg-white rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Advertising Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={cookiePreferences.advertising.enabled}
                      onChange={() => setCookiePreferences({
                        ...cookiePreferences,
                        advertising: {
                          ...cookiePreferences.advertising,
                          enabled: !cookiePreferences.advertising.enabled
                        }
                      })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d7b997]"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  These cookies are used to make advertising messages more relevant to you.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={toggleSettings}
                className="bg-transparent hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded border border-gray-400"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSavePreferences}
                className="bg-[#d7b997] hover:bg-[#c9aa87] text-gray-800 font-medium py-2 px-6 rounded"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer links - typically shown at the bottom of every page */}
      <div className="bg-white py-2 px-4 text-xs text-gray-500 border-t border-gray-200">
        <div className="container mx-auto flex justify-center md:justify-end items-center gap-4">
          <p>© Copyright 2025 Chery All Right Reserved.</p>
          <p>BPC# 0000584275</p>
          <div className="flex items-center gap-4">
            <Link href="/legal" className="hover:text-gray-700">Legal</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-gray-700">Privacy Statement</Link>
            <span>|</span>
            <Link href="/cookies-policy" className="hover:text-gray-700">Cookies Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export an additional function to manage cookie preferences from elsewhere in the app
export const openCookiePreferences = () => {
  if (typeof window !== 'undefined' && window.openCookiePreferences) {
    window.openCookiePreferences();
  }
};

export default CookiesConsent;