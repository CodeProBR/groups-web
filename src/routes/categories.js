import Layout from '@/layout';
import { cache } from 'react';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import { getPages, getBoosts, getCategories, getPosts, getGroups } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import Link from "next/link";
import Groups from "@/components/Groups";
import Categories from "@/components/Categories";
import Posts from "@/components/Posts";

export async function generateMetadata({ slug }) {
    const data = await dataCache(slug);
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: null,
        url: `/${slug[0]}`
    });
}

export default async function Page({ slug }) {
    const data = await dataCache(slug);
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    return (
        <Layout>

            <Navigation
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>
                <div className={style.title}>
                    <h1><strong>{data.title}</strong></h1>
                    <p>{data.description}</p>
                </div>
            </div>

            <div className={style.w70}>

                {/* CATEGORIES */}
                <div className={style.block}>
                    <Categories items={data.categories} texts={texts} />
                </div>

                <hr className={style.break} />

                {/* GROUPS */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.groups.title}</strong></h2>
                        <p>{texts.groups.description}</p>
                    </div>
                    <Groups
                        items={data.groups.items} texts={texts}
                    />
                    <Link className={style.link} href={`/${texts.groups.slug}`}>{texts.groups.button}</Link>
                </div>

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideGroups items={data.boosts} texts={texts} />

                    {/* CATEGORIES */}
                    <AsideCategories items={data.categories} texts={texts} />

                </div>
            </section>
            <hr className={style.break} />
            <div className={style.w100}>

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
        </Layout>
    );
}

export const dataCache = cache(async (slug) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const [
        page,
        groups,
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getGroups({ limit: 12, adult: false }),
        getBoosts({ adult: false }),
        getCategories(),
        getPosts({ limit: 4 }),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
    ];
    return { ...page, breadcrumb, groups, boosts, categories, posts };
});