import Layout from '@/layout';
import { cache } from 'react';
import Navigation from '@/components/Navigation';
import metadata from "@/utils/metadata";
import style from '@site/styles/page.module.scss';
import { getPages, getGroups, getCategoriesFeatured, getPosts, getGuides, getProducts } from "@/utils/database";
import Groups from '@/components/Groups';
import Categories from '@/components/Categories';
import Posts from '@/components/Posts';
import Guides from '@/components/Guides';
import Faq from '@/components/Faq';
import WebSite from '@/components/Snippet/WebSite';
import Link from 'next/link';
import Products from '@/components/Products';
import * as PiIcons from 'react-icons/pi';

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

            <Navigation
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>

                {/* GROUPS */}
                {data.groups.items.length > 0 && (
                    <>
                        <div className={style.block}>
                            <div className={style.title}>
                                <h1><strong>{data.title}</strong></h1>
                                <p>{data.description}</p>
                            </div>
                            <Groups items={data.groups.items} texts={texts} />
                            <Link className={style.link} href={`/${texts.groups.slug}`}>{texts.groups.button}</Link>
                        </div>
                    </>
                )}

                {/* CATEGORIES */}
                {data.categoriesFeatured.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{texts.categories.title}</strong></h2>
                                <p>{texts.categories.description}</p>
                            </div>
                            <Categories items={data.categoriesFeatured} texts={texts} />
                            <Link className={style.link} href={`/${texts.categories.slug}`}>{texts.categories.button}</Link>
                        </div>
                    </>
                )}

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

                {/* WHY */}
                {texts.why.items.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{texts.why.title}</strong></h2>
                                <p>{texts.why.description}</p>
                            </div>
                            <div className={style.why}>
                                {texts.why.items.map((item, i) => {
                                    const IconComponent = PiIcons[item.icon];
                                    return (
                                        <div key={i}>
                                            <IconComponent />
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    )
                                })}
                            </div>
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

            <WebSite description={data.description} />
        </Layout>
    );
}


export const dataCache = cache(async () => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const [
        page,
        groups,
        categoriesFeatured,
        posts,
        guides,
        products,
    ] = await Promise.all([
        getPages({ slug: '/' }),
        getGroups({ adult: false, limit: 12 }),
        getCategoriesFeatured(),
        getPosts({ limit: 4 }),
        getGuides({ limit: 4 }),
        getProducts(),
    ]);
    const breadcrumb = [
        { name: page.name, url: '/' },
    ];
    return { ...page, breadcrumb, groups, categoriesFeatured, posts, guides, products };
});