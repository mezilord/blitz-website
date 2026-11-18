/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build to plain static HTML/CSS/JS in ./out so Hostinger (Apache) can serve it.
  output: 'export',
  // Every route gets its own folder/index.html, which Apache serves without rewrites.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
