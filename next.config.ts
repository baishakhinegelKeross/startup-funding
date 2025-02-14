import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.icons8.com', 'res.cloudinary.com', 'assets.aceternity.com', 'bsmedia.business-standard.com', 'images.unsplash.com', 'placehold.co', 'media.istockphoto.com',"192.168.3.7",'m.media-amazon.com'], // Allow images from both icons8 and cloudinary
  },
  basePath: '/quantmai',
  // Other configuration options can go here
};

export default nextConfig;
