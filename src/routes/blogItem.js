import Layout from '@/layout';
import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Posts from '@/components/Posts';
import { getBoosts, getCategoriesFeatured, getPosts, getPages, getProducts } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideBoosts from '@/components/Aside/Boosts';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import { formatData } from '@/utils';
import Content from '@/components/Content';
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import { permanentRedirect } from "next/navigation";
import Image from 'next/image';
import Article from '@/components/Snippet/Article';
import Products from '@/components/Products';

export async function generateMetadata({ slug }) {
    const data = await dataCache(slug);
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

export default async function Page({ slug }) {
    const data = await dataCache(slug);
    if (!data) return <NotFound slug={slug} />;
    if (data.slug && slug[1] !== data.slug) {
        permanentRedirect(`/${slug[0]}/${data.slug}`);
    }
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    return (
        <Layout>

            <Navigation
                items={data.breadcrumb}
                title={data.name}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>
                <div className={style.title}>
                    <span>{`${data.category ? data.category + '   ●   ' : ''}${data.readingTime} ${texts.blog.read}   ●   ${texts.blog.update} ${formatData(data.updatedAt)}`}</span>
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
                </div>

                {/* FAQ */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{data.faq.title}</strong></h2>
                        <p>{data.faq.description}</p>
                    </div>
                    <Faq items={data.faq.items} width={'100%'} />
                </div>

                {/* AUTHOR */}
                {data.author && data.author.name && (
                    <div className={style.author}>
                        {data.author.image && (
                            <figure>
                                <Image
                                    src={data.author.image}
                                    alt={data.author.name}
                                    width={90}
                                    height={90}
                                />
                            </figure>
                        )}
                        <div>
                            {data.author.role && <span>{data.author.role}</span>}
                            <h3>{data.author.name}</h3>
                            {data.author.description && <p>{data.author.description}</p>}
                        </div>
                    </div>
                )}

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideBoosts items={data.boosts} texts={texts} />

                    {/* CATEGORIES */}
                    <AsideCategories items={data.categoriesFeatured} texts={texts} />

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

            </div>

            <Article data={data} />
        </Layout>
    );
}

export const dataCache = cache(async (slug) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const item = await getPosts({ slug: slug[1] });
    if (!item) {
        return;
    }
    const [
        page,
        boosts,
        categoriesFeatured,
        posts,
        products,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getBoosts({ adult: false }),
        getCategoriesFeatured(),
        getPosts({ limit: 4 }),
        getProducts(),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
        { name: item.title, url: `/${slug[0]}/${item.slug || slug[1]}` },
    ];
    return { ...item, breadcrumb, boosts, categoriesFeatured, posts, products };
});