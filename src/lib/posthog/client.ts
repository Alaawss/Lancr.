import posthog from 'posthog-js';

export function initPostHog() {
  if (typeof window !== 'undefined') {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
    
    console.log('[PostHog] Initializing...', { key: key ? 'present' : 'missing', host });
    
    if (key) {
      console.log('[PostHog] Calling posthog.init()');
      posthog.init(key, {
        api_host: host,
        loaded: (posthog) => {
          console.log('[PostHog] Loaded successfully');
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
      });
    } else {
      console.warn('[PostHog] Key is missing. Analytics will not be tracked.');
    }
  }
}
