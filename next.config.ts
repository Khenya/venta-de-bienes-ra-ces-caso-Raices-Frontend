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
  }
};

module.exports = nextConfig;