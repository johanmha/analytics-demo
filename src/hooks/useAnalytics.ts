import { useEffect } from 'react';
import { trackEvent } from '../lib/umami';

// Hook to track page views automatically
export const usePageTracking = (pageName: string) => {
  useEffect(() => {
    // Use trackEvent for page views as it includes all required metadata
    trackEvent('page_view', { page: pageName });
  }, [pageName]);
};

// Hook to track custom events
export const useEventTracking = () => {
  return {
    track: (eventName: string, data?: Record<string, unknown>) => {
      trackEvent(eventName, data);
    },
  };
};
