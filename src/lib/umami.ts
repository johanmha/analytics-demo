declare global {
  interface Window {
    umami?: {
      track: (eventName: string | { url?: string; referrer?: string }, eventData?: Record<string, unknown>) => void;
    };
  }
}

export const trackPageView = (url?: string, referrer?: string) => {
  if (globalThis.window?.umami) {
    try {
      globalThis.window.umami.track({ url, referrer });
    } catch (error) {
      console.debug('Analytics tracking unavailable:', error);
    }
  } else {
    console.debug('Umami not loaded - page view:', url);
  }
};

export const trackEvent = (eventName: string, eventData?: Record<string, unknown>) => {
  if (globalThis.window?.umami) {
    try {
      globalThis.window.umami.track(eventName, eventData);
    } catch (error) {
      console.debug('Analytics tracking unavailable:', error);
    }
  } else {
    console.debug('Umami not loaded - event:', eventName, eventData);
  }
};
