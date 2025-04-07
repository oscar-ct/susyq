/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/cleaning_services_austin/:slug',
                destination: '/',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
