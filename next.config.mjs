/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Use * to match any path after /api/
        destination: 'http://localhost:5000/api/:path*' // Forward the request to the backend
      }
    ]
  }
};

export default nextConfig;
