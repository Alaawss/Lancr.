import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toast';
import { PostHogProvider } from '@/components/shared/posthog-provider';
import { Special_Gothic_Expanded_One, Red_Rose } from 'next/font/google';

const specialGothic = Special_Gothic_Expanded_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-special-gothic',
});

const redRose = Red_Rose({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-red-rose',
});

export const metadata: Metadata = {
  title: 'Lancr — Build Hype Before You Launch',
  description: 'Create referral-driven waitlists for your next product, event, or community. Collect emails, track referrals, and grow your audience before launch day.',
  keywords: ['waitlist', 'prelaunch', 'referral', 'email collection', 'launch'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${specialGothic.variable} ${redRose.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Clash Display';
              src: local('Space Grotesk'), local('Space Grotesk Medium');
              font-weight: 500 700;
              font-display: swap;
            }
            @font-face {
              font-family: 'NOHEMI';
              src: local('Inter'), local('Inter Medium');
              font-weight: 400 600;
              font-display: swap;
            }
            @font-face {
              font-family: 'Stack Sans Text';
              src: local('Inter'), local('Inter Regular');
              font-weight: 400 500;
              font-display: swap;
            }
          `
        }} />
      </head>
      <body className="font-body antialiased">
        <PostHogProvider>
          {children}
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
