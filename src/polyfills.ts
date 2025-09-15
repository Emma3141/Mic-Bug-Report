// Polyfills for GitHub Pages compatibility
// Disable service workers and web workers

// Override Worker constructor to prevent CSP violations
if (typeof Worker !== 'undefined') {
  (window as any).Worker = class {
    constructor() {
      throw new Error('Workers disabled for GitHub Pages CSP compatibility');
    }
  };
}

// Disable service worker registration
if ('serviceWorker' in navigator) {
  // Clear any existing service workers
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
  
  // Override registration to prevent new ones
  (navigator.serviceWorker as any).register = () => Promise.reject('Service workers disabled');
}

// Disable SharedArrayBuffer and other worker-related APIs that might trigger CSP
if (typeof SharedArrayBuffer !== 'undefined') {
  (window as any).SharedArrayBuffer = undefined;
}