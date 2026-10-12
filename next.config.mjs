import path from 'path';
import dotenv from 'dotenv';

let envPath = '';
if (process.env.NEXT_PUBLIC_SITE) {
    envPath = path.resolve(`./src/sites/${process.env.NEXT_PUBLIC_SITE}/.env`);
} else {
    envPath = path.resolve('./.env');
}

dotenv.config({
    path: envPath
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
};

export default nextConfig;