import Layout from '@/layout';
import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Content from '@/components/Content';
import Posts from '@/components/Posts';
import { getPages, getBoosts, getCategories, getPosts, getProducts } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import Products from '@/components/Products';

export async function generateMetadata({ slug }) {
    const data = await dataCache(slug);
    if (!data) return metadataNotFound({ slug });
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

                {/* PRODUCTS */}
                {data.products.length > 0 && (
                    <div className={style.block}>
                        <div className={style.title}>
                            <h2><strong>{texts.products.title}</strong></h2>
                            <p>{texts.products.description}</p>
                        </div>
                        <Products
                            items={data.products}
                            texts={texts}
                        />
                    </div>
                )}

                {data.products.length > 0 && <hr className={style.break} />}

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
        boosts,
        categories,
        posts,
        products,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
        getProducts(),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
    ];
    return { ...page, breadcrumb, boosts, categories, posts, products };
});