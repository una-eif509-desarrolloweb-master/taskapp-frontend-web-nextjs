import dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_SUPPORT_DATA: process.env.API_SUPPORT_DATA,
        API_SETTINGS_DATA: process.env.API_SETTINGS_DATA,
    },
};

export default nextConfig;