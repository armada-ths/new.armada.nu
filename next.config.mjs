/** @type {import('next').NextConfig} */
import toolbar from "@vercel/toolbar/plugins/next"

const withVercelToolbar = toolbar()
const nextConfig = {
  images: {
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
  },
  redirects: async () => {
    return [
      {
        source: "/team",
        destination: "/about/team",
        permanent: true
      }
    ]
  }
}

export default withVercelToolbar(nextConfig)
