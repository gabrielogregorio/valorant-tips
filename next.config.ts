import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://cdn.pixabay.com/**'),
      new URL('https://res.cloudinary.com/**'),
      new URL('http://localhost:3333/**'),
      new URL('http://127.0.0.1:3333/**'),
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry Build/CLI options
  org: 'valorant-tips',
  project: 'javascript-nextjs',
  silent: !process.env.CI,

  // Sentry SDK options
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
});
