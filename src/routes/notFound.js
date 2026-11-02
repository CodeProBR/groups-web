import Link from 'next/link';
import metadata from "@/utils/metadata";

export async function generateMetadata({ slug }) {
    const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
    return metadata({
        title: texts.notFound.title,
        description: texts.notFound.description,
        index: false,
        image: null,
        url: Array.isArray(slug) ? `/${slug.join('/')}` : (slug ? `/${slug}` : '/')
    });
}

export default async function Page({ slug }) {
    const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
    return (
        <div className={'notFound'}>
            <h1>{texts.notFound.title}</h1>
            <p>{texts.notFound.description}</p>
            <Link href="/">{texts.notFound.link}</Link>
        </div>
    );
}