import Layout from '@/layout';
import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import { getBoosts, getCategoriesFeatured, getPosts, getGroups, getPages, getProducts, getCategoriesItem } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideBoosts from '@/components/Aside/Boosts';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import { formatData } from '@/utils';
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import Image from 'next/image';
import Products from '@/components/Products';
import { PiSealCheck, PiUsersThree, PiArrowsClockwise } from "react-icons/pi";

export async function generateMetadata({ slug }) {
    const data = await dataCache(slug);
    if (!data) return metadataNotFound({ slug });
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: data.seo?.image,
        url: `/${slug[0]}/${slug[1]}`
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
                title={data.name}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>
                <div className={style.title}>
                    <h1><strong>{texts.groups.group.replaceAll('[PLATFORM]', data.platform).replaceAll('[GROUP]', data.name)}</strong></h1>
                    <span>{`${data.category.name}   ●   ${texts.groups.verified} ${formatData(data.updatedAt)}`}</span>
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
                                <span>1.048 membros</span>
                                <span>Atualizado em {formatData(data.updatedAt)}</span>
                                <span className={style.green}><PiSealCheck />Verificado</span>
                            </span>
                            <p><span>{data.description}</span></p>
                            <div>
                                <a href={data.link} target="_blank" rel="noopener noreferrer" className="goGroup" data-group={data.id}>{texts.groups.action}</a>
                                <button>{texts.share.copy}</button>
                            </div>
                            <button>{texts.report}</button>
                        </div>
                    </div>
                    <div className={style.alert}>
                        <div>
                            <h2>{texts.groups.alert.title}</h2>
                            <hr />
                            <p>{texts.groups.alert.description.replaceAll('[GROUP]', data.name)}</p>
                        </div>
                    </div>
                    <div className={style.details}>
                        <h2>{texts.groups.description}</h2>
                        <hr />
                        <p>{data.description}</p>
                    </div>
                    <div className={style.moderate}>
                        <div>
                            <p>{texts.groups.moderate}</p>
                        </div>
                    </div>
                    <div className={style.details}>
                        <h2>{texts.groups.rules.title}</h2>
                        <hr />
                        <div>
                            {data.rules?.map((item, i) => (
                                <div key={i}><span>{i + 1}</span><p>{item}</p></div>
                            ))}
                        </div>
                        <blockquote>{texts.groups.rules.description.replaceAll('[PLATFORM]', data.platform).replaceAll('[GROUP]', data.name).replaceAll('[CATEGORY]', data.category.name)}</blockquote>
                    </div>
                    <div className={style.details}>
                        <h2>{texts.groups.about.replaceAll('[PLATFORM]', data.platform).replaceAll('[CATEGORY]', data.category.name)}</h2>
                        <hr />
                        <p>{data.category.description}</p>
                    </div>
                </div>

                <hr className={style.break} />

                {/* SIMILAR GROUPS */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.groups.similar.title}</strong></h2>
                        <span>{texts.groups.similar.description.replaceAll('[CATEGORY]', data.category.name)}</span>
                    </div>
                    <Groups items={data.groups.items} texts={texts} />
                    <Link className={style.link} href={`/${texts.categories.slug}/${data.category.slug}`}>{texts.groups.button}</Link>
                </div>

                <hr className={style.break} />

                {/* FAQ */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.faq.title}</strong></h2>
                        <p>{texts.faq.description}</p>
                    </div>
                    <Faq items={data.faq} width={'100%'} />
                </div>

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideBoosts items={data.boosts} texts={texts} />

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

            </div>
        </Layout>
    );
}

export const dataCache = cache(async (slug) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const item = await getGroups({ id: slug[1] });
    console.log(item)
    if (!item) {
        return;
    }
    const [
        page,
        groups,
        boosts,
        categories,
        posts,
        products,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getGroups({ limit: 6, adult: false, categoryId: item.category?.id ? item.category.id.toString() : null }),
        getBoosts({ adult: false }),
        getCategoriesFeatured(),
        getPosts({ limit: 4 }),
        getProducts(),
    ]);
    const groupName = item?.name;
    const categoryName = item?.category?.name;
    const platform = item.link.includes("t.me") ? "Telegram" : item.link.includes("telegram") ? "Telegram" : "WhatsApp";
    const seo = {
        title: texts.groups.seo.title.replaceAll('[PLATFORM]', platform).replaceAll('[GROUP]', groupName).replaceAll('[CATEGORY]', categoryName),
        description: texts.groups.seo.description.replaceAll('[PLATFORM]', platform).replaceAll('[GROUP]', groupName).replaceAll('[CATEGORY]', categoryName),
        image: item?.image ? item.image : null,
        index: true,
    };
    const faq = texts.groups.faq.map(item => ({
        question: item.question.replaceAll('[PLATFORM]', platform).replaceAll('[GROUP]', groupName).replaceAll('[CATEGORY]', categoryName).replaceAll('[SITE]', process.env.NEXT_PUBLIC_NAME),
        answer: item.answer.replaceAll('[PLATFORM]', platform).replaceAll('[GROUP]', groupName).replaceAll('[CATEGORY]', categoryName).replaceAll('[SITE]', process.env.NEXT_PUBLIC_NAME),
    }));
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
        { name: groupName, url: `/${slug[0]}/${slug[1]}` },
    ];
    return { ...item, platform, groups, seo, faq, breadcrumb, boosts, categories, posts, products };
});