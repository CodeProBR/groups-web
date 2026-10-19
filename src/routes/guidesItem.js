import Layout from '@/layout';
import { cache } from 'react';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import { getBoosts, getCategoriesFeatured, getPosts, getGroups, getGuides, getPages, getProducts } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideBoosts from '@/components/Aside/Boosts';
import AsideCategories from '@/components/Aside/Categories'
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
import Article from '@/components/Snippet/Article';
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
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const updatedAt = new Date().toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',
    }).replace(/ de ([a-z])/i, (match, p1) => ` de ${p1.toUpperCase()}`);
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
                    <span><strong>{data.results.total}</strong> {texts.actives}   ●   {texts.updated} <strong>{updatedAt}</strong></span>
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
                        items={data.results.items} texts={texts}
                    />

                    <Pagination
                        page={data.results.page}
                        totalPages={data.results.totalPages}
                        baseUrl={`/${slug[0]}`}
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
                {data.faq.items.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.faq.title}</strong></h2>
                                <p>{data.faq.description}</p>
                            </div>
                            <Faq items={data.faq.items} />
                        </div>
                    </>
                )}

            </div>

            <Article data={data} />
        </Layout>
    );
}

export const dataCache = cache(async (slug, currentPage = 1) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
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
    return { ...item, breadcrumb, results, boosts, categoriesFeatured, posts, guides, products };
});