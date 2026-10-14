import Layout from '@/layout';
import { cache } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import metadata from "@/utils/metadata";
import style from '@site/styles/page.module.scss';
import { getPages, getGroups, getCategories, getPosts } from "@/utils/database";
import Groups from '@/components/Groups';
import Categories from '@/components/Categories';
import Posts from '@/components/Posts';
import Faq from '@/components/Faq';
import WebSite from '@/components/Snippet/WebSite';
import Link from 'next/link';

export async function generateMetadata() {
    const data = await dataCache();
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: null,
        url: `/`
    });
}

export default async function Page() {
    const data = await dataCache();
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    return (
        <Layout>

            <Breadcrumbs
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>

                {/* GROUPS */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h1><strong>{data.title}</strong></h1>
                        <p>{data.description}</p>
                    </div>
                    <Groups items={data.groups.items} texts={texts} />
                    <Link className={style.link} href={`/${texts.groups.slug}`}>{texts.groups.button}</Link>
                </div>

                <hr className={style.break} />

                {/* CATEGORIES */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.categories.title}</strong></h2>
                        <p>{texts.categories.description}</p>
                    </div>
                    <Categories items={data.categories} texts={texts} />
                    <Link className={style.link} href={`/${texts.categories.slug}`}>{texts.categories.button}</Link>
                </div>

                <hr className={style.break} />

                {/* POSTS */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.blog.title}</strong></h2>
                        <p>{texts.blog.description}</p>
                    </div>
                    <Posts
                        items={data.posts.items} texts={texts}
                    />
                    <Link className={style.link} href={`/${texts.blog.slug}`}>{texts.blog.button}</Link>
                </div>

                <hr className={style.break} />

                {/* FAQ */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.faq.title}</strong></h2>
                        <p>{texts.faq.description}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>

            <WebSite description={data.description} />
        </Layout>
    );
}


export const dataCache = cache(async () => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const [
        page,
        groups,
        categories,
        posts,
    ] = await Promise.all([
        getPages({ slug: '/' }),
        getGroups({ adult: false, limit: 12 }),
        getCategories({ limit: 8 }),
        getPosts({ limit: 4 }),
    ]);
    const breadcrumb = [
        { name: page.name, url: '/' },
    ];
    return { ...page, breadcrumb, groups, categories, posts };
});