import { useEffect, useState } from 'react';
import { GrowthBook, GrowthBookProvider as GBProvider } from '@growthbook/growthbook-react';
import { createGrowthBookInstance, initGrowthBook } from '../lib/growthbook';

export const GrowthBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gb] = useState<GrowthBook>(() => {
    const instance = createGrowthBookInstance();

    // Generate a session-based anonymous ID (no persistence, GDPR/ekomloven compliant)
    // New ID on each page load - no tracking across sessions, no consent needed
    const sessionId = 'session_' + Math.random().toString(36).substring(2, 15);

    // Set minimal anonymous attributes for A/B test bucketing
    instance.setAttributes({
      id: sessionId,
    });

    return instance;
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initGrowthBook(gb).then(() => {
      setIsReady(true);
    });

    return () => {
      gb.destroy();
    };
  }, [gb]);

  if (!isReady) {
    return <div className="flex items-center justify-center min-h-screen">Loading experiments...</div>;
  }

  return <GBProvider growthbook={gb}>{children}</GBProvider>;
};
