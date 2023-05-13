/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
})

module.exports = nextConfig
