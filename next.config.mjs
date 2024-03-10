/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "armada-ais-files.s3.amazonaws.com",
        port: "",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "**"
      }
    ]
  },
  redirects: async () => {
    return [
      {
        source: "/recruitment",
        destination: "/student/recruitment",
        permanent: true
      }
    ]
  }
}

export default nextConfig
