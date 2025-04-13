'use client';

import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const CookiesConsent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleAccept = () => {
    // Logic to accept all cookies
    setIsVisible(false);
    // Here you would normally set cookies or localStorage values
  };

  const handleReject = () => {
    // Logic to reject non-essential cookies
    setIsVisible(false);
    // Here you would normally set cookies or localStorage values
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

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
        <CookieSettings onBack={toggleSettings} onClose={() => setIsVisible(false)} />
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

// Cookie Settings Component for when settings are toggled
const CookieSettings = ({ onBack, onClose }) => {
  // Example cookie categories with their states
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: { enabled: true, required: true },
    functional: { enabled: true, required: false },
    analytics: { enabled: true, required: false },
    advertising: { enabled: false, required: false },
  });

  const handleToggle = (category) => {
    if (cookiePreferences[category].required) return;
    
    setCookiePreferences({
      ...cookiePreferences,
      [category]: {
        ...cookiePreferences[category],
        enabled: !cookiePreferences[category].enabled
      }
    });
  };

  const handleSave = () => {
    // Save cookie preferences logic
    // Then close the settings panel
    onClose();
  };

  return (
    <div className="bg-[#b9aa97] text-gray-800 p-4 md:p-6 shadow-lg max-h-[80vh] overflow-y-auto">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ChevronRight size={16} className="transform rotate-180 mr-1" />
            Back
          </button>
          
          <button 
            onClick={onClose}
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
                  onChange={() => handleToggle('functional')}
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
                  onChange={() => handleToggle('analytics')}
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
                  onChange={() => handleToggle('advertising')}
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
            onClick={onBack}
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded border border-gray-400"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="bg-[#d7b997] hover:bg-[#c9aa87] text-gray-800 font-medium py-2 px-6 rounded"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiesConsent;