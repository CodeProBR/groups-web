import { cache } from 'react';
import Navigation from '@/components/Navigation';
import metadata from "@/utils/metadata";
import style from '@template/page.module.scss';
import { getPages, getGroups, getCategoriesFeatured, getPosts, getGuides, getProducts } from "@/utils/database";
import Groups from '@/components/Groups';
import Categories from '@/components/Categories';
import Posts from '@/components/Posts';
import Guides from '@/components/Guides';
import Faq from '@/components/Faq';
import WebSite from '@/snippets/WebSite';
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
    return (
        <>

            <Navigation
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
                texts={data.texts}
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
                            <Groups items={data.groups.items} texts={data.texts} />
                            <Link className={style.link} href={`/${data.texts.groups.slug}`}>{data.texts.groups.button}</Link>
                        </div>
                    </>
                )}

                {/* CATEGORIES */}
                {data.categoriesFeatured.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.categories.title.replaceAll('[PLATFORM]', process.env.NEXT_PUBLIC_PLATFORM.replace('/', data.texts.and))}</strong></h2>
                                <p>{data.texts.categories.description.replaceAll('[PLATFORM]', process.env.NEXT_PUBLIC_PLATFORM.replace('/', data.texts.and))}</p>
                            </div>
                            <Categories items={data.categoriesFeatured} texts={data.texts} />
                            <Link className={style.link} href={`/${data.texts.categories.slug}`}>{data.texts.categories.button}</Link>
                        </div>
                    </>
                )}

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

                {/* WHY */}
                {data.texts.why.items.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.why.title.replaceAll('[SITE]', process.env.NEXT_PUBLIC_NAME)}</strong></h2>
                                <p>{data.texts.why.description}</p>
                            </div>
                            <div className={style.why}>
                                {data.texts.why.items.map((item, i) => {
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
                                <h2><strong>{data.texts.faq.title}</strong></h2>
                                <p>{data.texts.faq.description}</p>
                            </div>
                            <Faq items={data.faq} />
                        </div>
                    </>
                )}

            </div>

            <WebSite description={data.description} />
        </>
    );
}


export const dataCache = cache(async () => {
    const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
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
    return { ...page, breadcrumb, groups, categoriesFeatured, posts, guides, products, texts };
});