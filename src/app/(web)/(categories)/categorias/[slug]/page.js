import Layout from '@/layout';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories';
import Pagination from '@/components/Pagination';
import { getBoosts, getCategories, getPosts, getGroups } from "@/utils/database";
import { cache } from 'react';
import styleSection from '@/styles/section';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params, searchParams }) {
    const { slug } = await params;
    const { page } = (await searchParams) || {};
    const currentPage = parseInt(page) || 1;
    const data = await dataCache(slug, currentPage);
    if (!data) {
        return;
    }
    return {
        title: data.seo.title,
        description: data.seo.description,
        image: data.seo.image,
    };
}

export default async function Page({ params, searchParams }) {
    const { slug } = await params;
    const { page } = (await searchParams) || {};
    const currentPage = parseInt(page) || 1;
    const data = await dataCache(slug, currentPage);

    if (!data) {
        notFound();
    }

    return (
        <Layout>

            <Breadcrumbs
                items={data.breadcrumb}
                title={data.name}
                description={data.description}
            />

            <div className={styleSection.w100}>
                <div className={styleSection.title}>
                    <h1><strong>{data.name}</strong></h1>
                    <p>{data.description}</p>
                </div>
            </div>

            <div className={styleSection.w70}>

                {/* GROUPS */}
                <div className={styleSection.block}>
                    <Groups
                        items={data.items}
                    />
                    <Pagination
                        page={data.page}
                        totalPages={data.totalPages}
                        baseUrl={`/categorias/${slug}`}
                    />
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

        </Layout >
    );
}

export const dataCache = cache(async (slug, page = 1) => {
    const item = await getCategories({ slug });
    if (!item) {
        return;
    }
    const [
        groups,
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getGroups({ limit: 12, page, adult: false, category: item.name }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
    ]);
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Categorias', url: '/categorias' },
        { name: item.name, url: `/categorias/${slug}` },
    ];
    return { ...item, ...groups, breadcrumb, boosts, categories, posts };
});