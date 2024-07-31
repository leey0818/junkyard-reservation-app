/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI ? 'standalone' : undefined,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
