/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'www.newsnetcrestin.ro',
      'newsnetcrestin.ro', // Added without www. just in case
    ],
  },
  typescript:{
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
