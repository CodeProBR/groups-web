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

const site = process.env.NEXT_PUBLIC_SITE || 'toptelegram.com.br';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias['@site'] = path.resolve(process.cwd(), `src/sites/${site}`);
        return config;
    },
    turbopack: {
        resolveAlias: {
            '@site/*': `./src/sites/${site}/*`,
        },
    },
};

export default nextConfig;