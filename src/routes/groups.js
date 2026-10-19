import Layout from '@/layout';
import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Groups from '@/components/Groups';
import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import Guides from '@/components/Guides';
import { getPages, getBoosts, getCategoriesFeatured, getPosts, getGroups, getProducts, getGuides } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideBoosts from '@/components/Aside/Boosts';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import CollectionPage from '@/components/Snippet/CollectionPage';
import ItemList from '@/components/Snippet/ItemList';
import Products from '@/components/Products';

export async function generateMetadata({ slug, search, page }) {
    const data = await dataCache(slug, page, search);
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: null,
        url: search ? `/${slug[0]}?q=${search}` : `/${slug[0]}`
    });
}

export default async function Page({ slug, search, page }) {
    const data = await dataCache(slug, page, search);
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

                {/* GROUPS */}
                <div className={style.block}>
                    <Groups
                        items={data.results.items} texts={texts}
                    />
                    <Pagination
                        page={data.results.page}
                        totalPages={data.results.totalPages}
                        baseUrl={search ? `/${slug[0]}?q=${encodeURIComponent(search)}` : `/${slug[0]}`}
                        texts={texts}
                    />
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
            {data.groups?.items?.length > 0 && (
                <ItemList data={data.groups.items} name={data.title} type="group" slug={slug[0]} />
            )}
        </Layout>
    );
}

export const dataCache = cache(async (slug, currentPage = 1, search = '') => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const [
        page,
        results,
        boosts,
        categoriesFeatured,
        posts,
        guides,
        products,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getGroups({ limit: 12, page: currentPage, adult: false, q: search }),
        getBoosts({ adult: false }),
        getCategoriesFeatured(),
        getPosts({ limit: 4 }),
        getGuides({ limit: 4 }),
        getProducts(),
    ]);
    const title = search ? `${texts.search.title} "${search}"` : page.title;
    const description = search ? `${texts.search.description} "${search}"` : page.description;
    const seo = {
        title: search ? `${texts.search.title} "${search}"` : page.seo.title,
        description: search ? `${texts.search.description} "${search}"` : page.seo.description,
        index: search ? false : page.seo.index
    };
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
        ...(search ? [{ name: `${texts.search.name}: "${search}"`, url: `/${slug[0]}?q=${encodeURIComponent(search)}` }] : []),
    ];
    return { ...page, title, description, seo, breadcrumb, results, boosts, categoriesFeatured, posts, products, guides };
});