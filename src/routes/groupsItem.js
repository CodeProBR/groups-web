import Layout from '@/layout';
import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import { getBoosts, getCategories, getPosts, getGroups, getPages, getProducts } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import { formatData } from '@/utils';
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import Image from 'next/image';
import Products from '@/components/Products';

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
                            <p>{data.description}</p>
                            <a href={data.link} target="_blank" rel="noopener noreferrer" className="goGroup" data-group={data.id}>{texts.groups.action}</a>
                        </div>
                    </div>
                    <div className={style.alert}>
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

                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.groups.similar.title}</strong></h2>
                        <span>{texts.groups.similar.description.replaceAll('[CATEGORY]', data.category.name)}</span>
                    </div>
                    <Groups items={data.groups.items} texts={texts} />
                    <Link className={style.link} href={`/${texts.groups.slug}`}>{texts.groups.button}</Link>
                </div>

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideGroups items={data.boosts} texts={texts} />

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

                <hr className={style.break} />

                {/* FAQ */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.faq.title}</strong></h2>
                        <p>{texts.faq.description}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>
        </Layout>
    );
}

export const dataCache = cache(async (slug) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const item = await getGroups({ id: slug[1] });
    if (!item) {
        return;
    }
    const [
        page,
        groups,
        boosts,
        categories,
        posts,
        category,
        products,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getGroups({ limit: 12, adult: false, categoryId: item.categoryId ? item.categoryId.toString() : null }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
        getCategories({ name: item.category }),
        getProducts(),
    ]);
    const groupName = item?.name;
    const categoryName = item?.category;
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
    return { ...item, platform, category, groups, seo, faq, breadcrumb, boosts, categories, posts, products };
});