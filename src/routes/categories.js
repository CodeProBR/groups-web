import Layout from '@/layout';
import { cache } from 'react';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import { getPages, getBoosts, getCategoriesAll, getPosts, getProducts, getGuides, getCategoriesFeatured } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideBoosts from '@/components/Aside/Boosts';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import Link from "next/link";
import Categories from "@/components/Categories";
import Posts from "@/components/Posts";
import CollectionPage from '@/components/Snippet/CollectionPage';
import ItemList from '@/components/Snippet/ItemList';
import Products from '@/components/Products';
import Guides from "@/components/Guides";

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
                    <Categories items={data.results} texts={texts} subcategories={true} />
                </div>

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideBoosts items={data.boosts} texts={texts} />

                    {/* CATEGORIES */}
                    <AsideCategories items={data.categoriesFeatured} texts={texts} />

                </div>
            </section>
            <div className={style.w100}>

                {/* PRODUCTS */}
                {data.products.length > 0 && (
                    <>
                        <hr className={style.break} />
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
                    </>
                )}

                {/* GUIDES */}
                {data.guides.items.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{texts.guides.title}</strong></h2>
                                <p>{texts.guides.description}</p>
                            </div>
                            <Guides
                                items={data.guides.items} texts={texts}
                            />
                            <Link className={style.link} href={`/${texts.guides.slug}`}>{texts.guides.button}</Link>
                        </div>
                    </>
                )}

                {/* POSTS */}
                {data.posts.items.length > 0 && (
                    <>
                        <hr className={style.break} />
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
                    </>
                )}

                {/* FAQ */}
                {data.faq.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{texts.faq.title}</strong></h2>
                                <p>{texts.faq.description}</p>
                            </div>
                            <Faq items={data.faq} />
                        </div>
                    </>
                )}

            </div>

            <CollectionPage name={data.title} url={`/${slug[0]}`} description={data.description} />
            {data.categories?.length > 0 && (
                <ItemList data={data.categories} name={data.title} type="category" slug={slug[0]} />
            )}
        </Layout>
    );
}

export const dataCache = cache(async (slug) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const [
        page,
        boosts,
        results,
        posts,
        guides,
        products,
        categoriesFeatured
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getBoosts({ adult: false }),
        getCategoriesAll(),
        getPosts({ limit: 4 }),
        getGuides({ limit: 4 }),
        getProducts(),
        getCategoriesFeatured(),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
    ];
    return { ...page, breadcrumb, boosts, results, posts, guides, products, categoriesFeatured };
});