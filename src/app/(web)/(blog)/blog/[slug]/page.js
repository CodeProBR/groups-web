import { marked } from 'marked';
import { notFound } from 'next/navigation';
import Layout from '@/layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Content from '@/components/Content';
import Faq from '@/components/Faq';
import styleSection from '@/styles/section';
import { cache } from 'react';
import { getBoosts, getCategories, getPosts } from "@/utils/database";
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories';
import Posts from '@/components/Posts';
import Link from 'next/link';
import { formatarData } from '@/utils';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await dataCache(slug);
    if (!data) {
        return;
    }
    return {
        title: data.seo.title,
        description: data.seo.description,
        image: data.seo.image,
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const data = await dataCache(slug);

    if (!data) {
        notFound();
    }

    const contentHtml = marked.parse(data.content?.body?.description || '');

    return (
        <Layout>

            <Breadcrumbs
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
            />

            <div className={styleSection.w100}>
                <div className={styleSection.title}>
                    <span>{`${data.category}   ●   ${data.readTime} min de leitura   ●   Atualizado em ${formatarData(data.updatedAt)}`}</span>
                    <h1><strong>{data.title}</strong></h1>
                    <p>{data.summary}</p>
                </div>
            </div>

            <div className={styleSection.w70}>

                <div className={styleSection.block}>
                    <figure>
                        <img src={`${process.env.NEXT_PUBLIC_IMG}${data.image}`} alt={data.title} />
                    </figure>
                    <Content html={contentHtml} />
                </div>

            </div>
            <section className={styleSection.w30}>
                <div className={styleSection.block}>

                    {/* BOOSTS */}
                    <AsideGroups
                        title={'Grupos em Destaque'}
                        items={data.boosts}
                    />

                    {/* CATEGORIES */}
                    <AsideCategories
                        title={'Categorias em Destaque'}
                        items={data.categories}
                    />

                </div>
            </section>
            <hr className={styleSection.break} />
            <div className={styleSection.w100}>

                {/* POSTS */}
                <div className={styleSection.block}>
                    <div className={styleSection.title}>
                        <h2><strong>{`Dicas e Artigos do Blog`}</strong></h2>
                        <p>{`Acompanhe nossas dicas, tutoriais e novidades para aproveitar ao máximo seus grupos e canais do Telegram e manter suas comunidades engajadas.`}</p>
                    </div>
                    <Posts
                        items={data.posts.items}
                    />
                    <Link className={styleSection.link} href={'/blog'}>{'ver todos os posts'}</Link>
                </div>

                <hr className={styleSection.break} />

                {/* FAQ */}
                <div className={styleSection.block}>
                    <div className={styleSection.title}>
                        <h2><strong>{`Perguntas Frequentes`}</strong></h2>
                        <p>{`Tire suas dúvidas sobre como encontrar, entrar e divulgar links de grupos do Telegram por categoria na nossa plataforma.`}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>
        </Layout>
    );
}

export const dataCache = cache(async (slug) => {
    const item = await getPosts({ slug });
    if (!item) {
        return;
    }
    const [
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
    ]);
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: item.title, url: `/blog/${slug}` },
    ];
    return { ...item, breadcrumb, boosts, categories, posts };
});