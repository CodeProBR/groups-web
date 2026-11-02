import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Groups from '@/components/Groups';
import Pagination from '@/components/Pagination';
import Posts from '@/components/Posts';
import Guides from '@/components/Guides';
import { getPages, getBoosts, getCategoriesFeatured, getPosts, getGroups, getProducts, getGuides } from "@/utils/database";
import style from '@template/page.module.scss';
import AsideBoosts from '@/components/AsideBoosts';
import AsideCategories from '@/components/AsideCategories'
import metadata from "@/utils/metadata";
import CollectionPage from '@/snippets/CollectionPage';
import ItemList from '@/snippets/ItemList';
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
    return (
        <>

            <Navigation
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
                texts={data.texts}
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
                        items={data.results.items} texts={data.texts}
                    />
                    <Pagination
                        page={data.results.page}
                        totalPages={data.results.totalPages}
                        baseUrl={search ? `/${slug[0]}?q=${encodeURIComponent(search)}` : `/${slug[0]}`}
                        texts={data.texts}
                    />
                </div>

                {/* FAQ */}
                {data.faq.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.faq.title}</strong></h2>
                                <p>{data.texts.faq.description}</p>
                            </div>
                            <Faq items={data.faq} />
                        </div>
                    </>
                )}

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideBoosts items={data.boosts} texts={data.texts} />

                    {/* CATEGORIES */}
                    <AsideCategories items={data.categoriesFeatured} texts={data.texts} />

                </div>
            </section>
            <div className={style.w100}>

                {/* PRODUCTS */}
                {data.products.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.products.title}</strong></h2>
                                <p>{data.texts.products.description}</p>
                            </div>
                            <Products
                                items={data.products}
                                texts={data.texts}
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
                                <h2><strong>{data.texts.guides.title.replaceAll('[PLATFORM]', process.env.NEXT_PUBLIC_PLATFORM.replace('/', data.texts.and))}</strong></h2>
                                <p>{data.texts.guides.description.replaceAll('[PLATFORM]', process.env.NEXT_PUBLIC_PLATFORM.replace('/', data.texts.and))}</p>
                            </div>
                            <Guides
                                items={data.guides.items} texts={data.texts}
                            />
                            <Link className={style.link} href={`/${data.texts.guides.slug}`}>{data.texts.guides.button}</Link>
                        </div>
                    </>
                )}

                {/* POSTS */}
                {data.posts.items.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.blog.title}</strong></h2>
                                <p>{data.texts.blog.description.replaceAll('[PLATFORM]', process.env.NEXT_PUBLIC_PLATFORM.replace('/', data.texts.and))}</p>
                            </div>
                            <Posts
                                items={data.posts.items} texts={data.texts}
                            />
                            <Link className={style.link} href={`/${data.texts.blog.slug}`}>{data.texts.blog.button}</Link>
                        </div>
                    </>
                )}

            </div>

            <CollectionPage name={data.title} url={`/${slug[0]}`} description={data.description} />
            {data.groups?.items?.length > 0 && (
                <ItemList data={data.groups.items} name={data.title} type="group" slug={slug[0]} />
            )}
        </>
    );
}

export const dataCache = cache(async (slug, currentPage = 1, search = '') => {
    const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
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
    return { ...page, title, description, seo, breadcrumb, results, boosts, categoriesFeatured, posts, products, guides, texts };
});