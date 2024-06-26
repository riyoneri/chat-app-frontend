/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d1rs0zetdhsbnl.cloudfront.net" },
    ],
  },
};

export default nextConfig;
