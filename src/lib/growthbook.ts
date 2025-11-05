import { GrowthBook } from '@growthbook/growthbook-react';

export const GROWTHBOOK_API_HOST = import.meta.env.VITE_GROWTHBOOK_API_HOST;
export const GROWTHBOOK_CLIENT_KEY = import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY;

// Create GrowthBook instance
export const createGrowthBookInstance = () => {
  const gb = new GrowthBook({
    apiHost: GROWTHBOOK_API_HOST || 'http://localhost:3101',
    clientKey: GROWTHBOOK_CLIENT_KEY || '',
    enableDevMode: true,
    subscribeToChanges: true,
    trackingCallback: (experiment, result) => {
      // Track experiment views to Umami
      if (globalThis.window?.umami) {
        globalThis.window.umami.track('experiment_view', {
          experiment_id: experiment.key,
          variation_id: result.key,
          variation_value: result.value,
        });
      }
    },
  });

  return gb;
};

// Initialize GrowthBook with features
export const initGrowthBook = async (gb: GrowthBook) => {
  try {
    await gb.init({ timeout: 5000 });
  } catch (error) {
    console.error('GrowthBook: Failed to initialize:', error);
  }
};
