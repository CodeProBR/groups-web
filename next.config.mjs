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

const site = process.env.NEXT_PUBLIC_SITE || '';
const template = process.env.TEMPLATE || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.toptelegram.com.br',
            },
            {
                protocol: 'https',
                hostname: '**.linkstelegram.com',
            },
            {
                protocol: 'https',
                hostname: '**.mlstatic.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@site'] = path.resolve(process.cwd(), `src/sites/${site}`);
        config.resolve.alias['@template'] = path.resolve(process.cwd(), `src/templates/${template}`);
        return config;
    },
    turbopack: {
        resolveAlias: {
            '@site/*': `./src/sites/${site}/*`,
            '@template/*': `./src/templates/${template}/*`,
        },
    },
};

export default nextConfig;