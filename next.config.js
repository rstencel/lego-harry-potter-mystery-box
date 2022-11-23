/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["localhost"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.rebrickable.com",
    //     pathname: "/media/sets/**",
    //   },
    // ],
    domains: ["cdn.rebrickable.com"],
  },
}

module.exports = nextConfig
