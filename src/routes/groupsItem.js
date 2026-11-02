import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import Guides from '@/components/Guides';
import { getBoosts, getCategoriesFeatured, getPosts, getGroups, getPages, getProducts, getGuides } from "@/utils/database";
import style from '@template/page.module.scss';
import AsideBoosts from '@/components/AsideBoosts';
import AsideCategories from '@/components/AsideCategories'
import metadata from "@/utils/metadata";
import { formatData } from '@/utils';
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import Image from 'next/image';
import Products from '@/components/Products';
import CopyButton from '@/components/CopyButton';
import { PiSealCheck, PiUsersThree, PiArrowsClockwise } from "react-icons/pi";

export async function generateMetadata({ slug }) {
    const data = await dataCache(slug);
    if (!data) return metadataNotFound({ slug });
    return metadata({
        title: data.category?.groups?.seo?.title?.replaceAll('[NAME]', data.name) || '',
        description: data.category?.groups?.seo?.description?.replaceAll('[NAME]', data.name) || '',
        index: data.category?.groups?.seo?.index || true,
        image: data.image,
        url: `/${slug[0]}/${slug[1]}`
    });
}

export default async function Page({ slug }) {
    const data = await dataCache(slug);
    if (!data) return <NotFound slug={slug} />;
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
                title={data.name}
                description={data.description}
                texts={data.texts}
            />

            <div className={style.w100}>
                <div className={style.title}>
                    <span><strong>{data.category.name}</strong>   ●   {data.texts.verifiedAt} <strong>{updatedAt}</strong></span>
                    <h1><strong>{data.texts.groups.item.replaceAll('[PLATFORM]', data.platform).replaceAll('[NAME]', data.name)}</strong></h1>
                </div>
            </div>

            <div className={style.w70}>
                <div className={style.block}>

                    <div className={style.group}>
                        <figure>
                            <Image src={data.image} alt={data.name} width={900} height={400} loading="lazy" />
                        </figure>
                        <div>
                            <h2>{data.name}</h2>
                            <span>
                                {data.members && <span>{data.members} {data.texts.members}</span>}
                                <span>{data.texts.updatedAt} {formatData(data.updatedAt)}</span>
                                <span className={style.green}><PiSealCheck />{data.texts.verified}</span>
                            </span>
                            <p><span>{data.description}</span></p>
                            <div>
                                <a href={data.link} target="_blank" rel="noopener noreferrer" className="goGroup" data-group={data.id}>{data.texts.enter}</a>
                                <CopyButton
                                    textToCopy={data.link}
                                    label={data.texts.copy}
                                    copiedLabel={data.texts.copied}
                                />
                            </div>
                            <button>{data.texts.report}</button>
                        </div>
                    </div>

                    <div className={style.alert}>
                        <div>
                            <h2>{data.texts.alert.title}</h2>
                            <hr />
                            <p>{data.texts.alert.description.replaceAll('[NAME]', data.name)}</p>
                        </div>
                    </div>

                    <div className={style.details}>
                        <h2>{data.texts.description}</h2>
                        <hr />
                        <p>{data.description}</p>
                    </div>

                    <div className={style.details}>
                        <h2>{data.texts.rules.title}</h2>
                        <hr />
                        <div>
                            {data.rules?.map((item, i) => (
                                <div key={i}><span>{i + 1}</span><p>{item}</p></div>
                            ))}
                        </div>
                        <blockquote>{data.texts.rules.description.replaceAll('[PLATFORM]', data.platform).replaceAll('[NAME]', data.name).replaceAll('[CATEGORY]', data.category.name)}</blockquote>
                    </div>

                    <div className={style.moderate}>
                        <div>
                            <p>{data.texts.moderate}</p>
                        </div>
                    </div>

                    {data.category?.groups?.texts?.about && <div className={style.details}>
                        <h2>{data.texts.about}</h2>
                        <hr />
                        <p>{data.category.groups.texts.about.replaceAll('[NAME]', data.name)}</p>
                    </div>}

                    {data.category?.groups?.texts?.content && <div className={style.details}>
                        <h2>{data.texts.find}</h2>
                        <hr />
                        <p>{data.category.groups.texts.content.replaceAll('[NAME]', data.name)}</p>
                    </div>}

                    {data.category?.groups?.texts?.useful && <div className={style.details}>
                        <h2>{data.texts.worth}</h2>
                        <hr />
                        <p>{data.category.groups.texts.useful.replaceAll('[NAME]', data.name)}</p>
                    </div>}
                </div>

                {/* SIMILAR GROUPS */}
                {data.results.items.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.similar.title}</strong></h2>
                                <span>{data.texts.similar.description.replaceAll('[CATEGORY]', data.category.name)}</span>
                            </div>
                            <Groups items={data.results.items} texts={data.texts} />
                            <Link className={style.link} href={`/${data.texts.categories.slug}/${data.category.slug}`}>{data.texts.groups.button}</Link>
                        </div>
                    </>
                )}

                {/* FAQ */}
                {data.category?.groups?.faq?.length > 0 && (
                    <>
                        <hr className={style.break} />
                        <div className={style.block}>
                            <div className={style.title}>
                                <h2><strong>{data.texts.faq.title}</strong></h2>
                                <p>{data.texts.faq.description}</p>
                            </div>
                            <Faq items={data.category.groups.faq.map(item => ({
                                question: item.question.replaceAll('[NAME]', data.name),
                                answer: item.answer.replaceAll('[NAME]', data.name)
                            }))} />
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
                            <Products items={data.products} texts={data.texts} />
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
                            <Guides items={data.guides.items} texts={data.texts} />
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
                            <Posts items={data.posts.items} texts={data.texts} />
                            <Link className={style.link} href={`/${data.texts.blog.slug}`}>{data.texts.blog.button}</Link>
                        </div>
                    </>
                )}

            </div>
        </>
    );
}

export const dataCache = cache(async (slug) => {
    //const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
    const texts = (await import(`@/utils/texts`)).default[process.env.NEXT_PUBLIC_LANG];
    const item = await getGroups({ id: slug[1] });
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
        getGroups({ limit: 6, adult: false, categoryId: item.category?.id ? item.category.id.toString() : null }),
        getBoosts({ adult: false }),
        getCategoriesFeatured(),
        getPosts({ limit: 4 }),
        getGuides({ limit: 4 }),
        getProducts(),
    ]);
    const platform = item.link.includes("t.me") ? "Telegram" : item.link.includes("telegram") ? "Telegram" : "WhatsApp";
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
        { name: item?.name, url: `/${slug[0]}/${slug[1]}` },
    ];
    return { ...item, platform, results, breadcrumb, boosts, categoriesFeatured, posts, guides, products, texts };
});