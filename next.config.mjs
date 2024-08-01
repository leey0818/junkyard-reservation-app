/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI ? 'standalone' : undefined,
  experimental: {
    instrumentationHook: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
