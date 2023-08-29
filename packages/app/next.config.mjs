/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['bcryptjs'],
    serverActions: true,
  },
  /** We run eslint as a separate task in CI */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
};

export default config;
