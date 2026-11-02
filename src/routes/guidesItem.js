import { cache } from 'react';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import { getBoosts, getCategoriesFeatured, getPosts, getGroups, getGuides, getPages, getProducts } from "@/utils/database";
import style from '@template/page.module.scss';
import AsideBoosts from '@/components/AsideBoosts';
import AsideCategories from '@/components/AsideCategories'
import metadata from "@/utils/metadata";
import Link from "next/link";
import Groups from "@/components/Groups";
import Pagination from "@/components/Pagination";
import Posts from "@/components/Posts";
import Guides from '@/components/Guides';
import Content from "@/components/Content";
import Image from 'next/image';
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import { permanentRedirect } from "next/navigation";
import Article from '@/snippets/Article';
import Products from '@/components/Products';

export async function generateMetadata({ slug, page }) {
    const data = await dataCache(slug, page);
    if (!data) return metadataNotFound({ slug });
    if (data.slug && slug[1] !== data.slug) {
        permanentRedirect(`/${slug[0]}/${data.slug}`);
    }
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: data.image,
        url: `/${slug[0]}/${data.slug || slug[1]}`
    });
}

export default async function Page({ slug, page }) {
    const data = await dataCache(slug, page);
    if (!data) return <NotFound slug={slug} />;
    if (data.slug && slug[1] !== data.slug) {
        permanentRedirect(`/${slug[0]}/${data.slug}`);
    }
    const updatedAt = new Date().toLocaleDateString(process.env.NEXT_PUBLIC_LOCALE, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: process.env.NEXT_PUBLIC_TIMEZONE,
    }).replace(/ de ([a-z])/i, (match, p1) => ` de ${p1.toUpperCase()}`);
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
                    <span><strong>{data.results.total}</strong> {data.texts.actives}   ●   {data.texts.updatedAt} <strong>{updatedAt}</strong></span>
                    <h1><strong>{data.title}</strong></h1>
                    <p>{data.description}</p>
                </div>
            </div>

            <div className={style.w70}>

                <div className={style.block}>

                    <figure>
                        <Image src={data.image} alt={data.title} width={900} height={400} loading="lazy" />
                    </figure>

                    <Content content={data.content} />

                    <Groups
                        items={data.results.items} texts={data.texts}
                    />

                    <Pagination
                        page={data.results.page}
                        totalPages={data.results.totalPages}
                        baseUrl={`/${slug[0]}`}
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

            <Article data={data} />
        </>
    );
}

export const dataCache = cache(async (slug, currentPage = 1) => {
    const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
    const item = await getGuides({ slug: slug[1] });
    if (!item) {
        return;
    }
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
        getGroups({ limit: 12, page: currentPage, adult: false, tags: item.tags }),
        getBoosts({ adult: false }),
        getCategoriesFeatured(),
        getPosts({ limit: 4 }),
        getGuides({ limit: 4 }),
        getProducts(),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
        { name: item.title, url: `/${slug[0]}/${item.slug || slug[1]}` },
    ];
    return { ...item, breadcrumb, results, boosts, categoriesFeatured, posts, guides, products, texts };
});