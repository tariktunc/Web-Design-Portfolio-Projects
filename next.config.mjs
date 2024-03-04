/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['skillicons.dev'],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;
