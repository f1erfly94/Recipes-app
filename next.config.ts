import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['www.themealdb.com'],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
