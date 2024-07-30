/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.CI ? 'standalone' : undefined,
};

export default nextConfig;
