import { PostHog } from 'posthog-node';

export function getServerPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

  if (!key) {
    console.warn('PostHog server key is missing.');
    return {
      capture: () => {},
      identify: () => {},
      shutdown: () => {},
    };
  }

  return new PostHog(key, { host });
}
