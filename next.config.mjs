/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'www.newsnetcrestin.ro',
      'newsnetcrestin.ro', // Added without www. just in case
      'static.iabilet.ro',
      'instagram.ftsr1-2.fna.fbcdn.net',
      'scontent.ftsr1-1.fna.fbcdn.net',
      'facebook.com',
      'res.cloudinary.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
