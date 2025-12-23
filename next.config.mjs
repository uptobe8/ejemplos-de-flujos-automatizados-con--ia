/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
  output: 'export',
  basePath: '/ejemplos-de-flujos-automatizados-con--ia',
    unoptimized: true,
  },
}

export default nextConfig
