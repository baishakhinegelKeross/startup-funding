import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.icons8.com', 'res.cloudinary.com', 'assets.aceternity.com', 'bsmedia.business-standard.com', 'placehold.co'], // Allow images from both icons8 and cloudinary
  },
  // Other configuration options can go here
};

export default nextConfig;
