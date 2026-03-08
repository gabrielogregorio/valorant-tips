import type { NextConfig } from 'next';

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

export default nextConfig;
