import Layout from '@/layout';
import { cache } from 'react';
import Link from 'next/link';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Posts from '@/components/Posts';
import { getBoosts, getCategories, getPosts, getPages } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import { formatData } from '@/utils';
import { marked } from 'marked';
import Content from '@/components/Content';
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";

export async function generateMetadata({ slug }) {
    const data = await dataCache(slug);
    if (!data) return metadataNotFound({ slug });
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: data.image,
        url: `/${slug[0]}/${slug[1]}`
    });
}

export default async function Page({ slug }) {
    const data = await dataCache(slug);
    if (!data) return <NotFound slug={slug} />;
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const contentHtml = marked.parse(data.content || '');
    return (
        <Layout>

            <Breadcrumbs
                items={data.breadcrumb}
                title={data.name}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>
                <div className={style.title}>
                    <span>{`${data.category}   ●   ${data.readTime} ${texts.blog.read}   ●   ${texts.blog.update} ${formatData(data.updatedAt)}`}</span>
                    <h1><strong>{data.title}</strong></h1>
                    <p>{data.summary}</p>
                </div>
            </div>

            <div className={style.w70}>

                <div className={style.block}>
                    <figure>
                        <img src={`${process.env.NEXT_PUBLIC_IMG}${data.image}`} alt={data.title} />
                    </figure>
                    <Content html={contentHtml} />
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
    const item = await getPosts({ slug: slug[1] });
    if (!item) {
        return;
    }
    const [
        page,
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
        { name: item.title, url: `/${slug[0]}/${slug[1]}` },
    ];
    return { ...item, breadcrumb, boosts, categories, posts };
});