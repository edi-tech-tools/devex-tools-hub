/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/proposal',
        destination: '/api/proposal',
      },
    ];
  },
};
export default nextConfig;