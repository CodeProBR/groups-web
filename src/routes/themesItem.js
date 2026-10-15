import Layout from '@/layout';
import { cache } from 'react';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import { getBoosts, getCategories, getPosts, getGroups, getThemes } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import Link from "next/link";
import Groups from "@/components/Groups";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import Content from "@/components/Content";
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";

export async function generateMetadata({ slug, page }) {
    const data = await dataCache(slug, page);
    if (!data) return metadataNotFound({ slug });
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: data.image,
        url: `/${slug[0]}`
    });
}

export default async function Page({ slug, page }) {
    const data = await dataCache(slug, page);
    if (!data) return <NotFound slug={slug} />;
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

                {/* CONTENT */}
                <div className={style.block}>
                    <Content content={data.content} />
                </div>

                {/* GROUPS */}
                <div className={style.block}>
                    <Groups
                        items={data.groups.items} texts={texts}
                    />
                    <Pagination
                        page={data.groups.page}
                        totalPages={data.groups.totalPages}
                        baseUrl={`/${slug[0]}`}
                        texts={texts}
                    />
                </div>

                {/* FAQ */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{data.faq.title}</strong></h2>
                        <p>{data.faq.description}</p>
                    </div>
                    <Faq items={data.faq.items} width={'100%'} />
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

            </div>
        </Layout>
    );
}

export const dataCache = cache(async (slug, currentPage = 1) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const item = await getThemes({ slug: slug[0] });
    if (!item) {
        return;
    }
    const [
        groups,
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getGroups({ limit: 12, page: currentPage, adult: false, tags: item.tags }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: item.title, url: `/${slug[0]}` },
    ];
    return { ...item, breadcrumb, groups, boosts, categories, posts };
});