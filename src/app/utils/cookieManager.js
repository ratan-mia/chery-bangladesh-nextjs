
/**
 * Utility functions for managing cookies across the application
 */
export const CookieManager = {
    // Check if a specific cookie category is enabled
    isEnabled: (category) => {
      if (typeof window === 'undefined') return false;
      
      try {
        const preferences = getCookie('cheryCookiePreferences');
        if (!preferences) return false;
        
        const parsedPreferences = JSON.parse(preferences);
        return parsedPreferences[category]?.enabled || false;
      } catch (e) {
        console.error('Error checking cookie preferences', e);
        return false;
      }
    },
    
    // Check if analytics cookies are enabled
    isAnalyticsEnabled: () => {
      return CookieManager.isEnabled('analytics');
    },
    
    // Check if functional cookies are enabled
    isFunctionalEnabled: () => {
      return CookieManager.isEnabled('functional');
    },
    
    // Check if advertising cookies are enabled
    isAdvertisingEnabled: () => {
      return CookieManager.isEnabled('advertising');
    },
    
    // Check if user has given consent (any form)
    hasConsent: () => {
      return getCookie('cheryCookieConsent') === 'true';
    },
    
    // Open cookie preferences dialog
    openPreferences: () => {
      if (typeof window !== 'undefined' && window.openCookiePreferences) {
        window.openCookiePreferences();
      }
    }
  };
  
  // Helper function to get cookie value
  function getCookie(name) {
    if (typeof window === 'undefined') return null;
    
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  export default CookieManager;