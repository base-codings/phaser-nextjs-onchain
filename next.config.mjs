/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const configWithPwa = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === "development",
}); // other config options});

const nextConfig = {
    ...configWithPwa,
};

export default withBundleAnalyzer(nextConfig);
