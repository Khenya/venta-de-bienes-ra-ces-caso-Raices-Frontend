/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!apiUrl) {
      console.warn("⚠️ ADVERTENCIA: NEXT_PUBLIC_BACKEND_URL no está definida. Saltando rewrites.");
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`
      }
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'planos-raises.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;