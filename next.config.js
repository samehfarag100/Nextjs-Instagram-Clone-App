/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "upload.wikimedia.org", "1000logos.net"],
  },
};

module.exports = nextConfig;
