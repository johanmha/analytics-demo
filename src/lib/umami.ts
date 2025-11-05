// Umami tracking utilities
export const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID;
export const UMAMI_URL = import.meta.env.VITE_UMAMI_URL;

// Declare Umami on window
declare global {
  interface Window {
    umami?: {
      track: (eventName: string | { url?: string; referrer?: string }, eventData?: Record<string, unknown>) => void;
    };
  }
}

// Track page view
export const trackPageView = (url?: string, referrer?: string) => {
  if (globalThis.window?.umami) {
    try {
      globalThis.window.umami.track({ url, referrer });
    } catch (error) {
      // Silently fail if tracking is not available
      console.debug('Analytics tracking unavailable:', error);
    }
  } else {
    console.debug('Umami not loaded - page view:', url);
  }
};

// Track custom event
export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  if (globalThis.window?.umami) {
    try {
      globalThis.window.umami.track(eventName, eventData);
    } catch (error) {
      // Silently fail if tracking is not available
      console.debug('Analytics tracking unavailable:', error);
    }
  } else {
    console.debug('Umami not loaded - event:', eventName, eventData);
  }
};
