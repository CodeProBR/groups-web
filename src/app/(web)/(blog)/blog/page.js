import Layout from '@/layout';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Posts from '@/components/Posts';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories';
import Pagination from '@/components/Pagination';
import { getBoosts, getCategories, getPosts } from "@/utils/database";
import { cache } from 'react';
import styleSection from '@/styles/section';

export async function generateMetadata({ searchParams }) {
    const { page } = (await searchParams) || {};
    const currentPage = parseInt(page) || 1;
    const data = await dataCache(currentPage);
    return {
        title: data.seo.title,
        description: data.seo.description,
        image: data.seo.image,
    };
}

export default async function Page({ searchParams }) {
    const { page } = (await searchParams) || {};
    const currentPage = parseInt(page) || 1;
    const data = await dataCache(currentPage);

    return (
        <Layout>

            <Breadcrumbs
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
            />

            <div className={styleSection.w100}>
                <div className={styleSection.title}>
                    <h1><strong>{data.title}</strong></h1>
                    <p>{data.description}</p>
                </div>
            </div>

            <div className={styleSection.w70}>

                {/* POSTS */}
                <div className={styleSection.block}>
                    <Posts
                        items={data.items}
                    />
                    <Pagination
                        page={data.page}
                        totalPages={data.totalPages}
                        baseUrl={`/blog`}
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

                {/* FAQ */}
                <div className={styleSection.block}>
                    <div className={styleSection.title}>
                        <h2><strong>{`Perguntas Frequentes`}</strong></h2>
                        <p>{`Acompanhe nossas dicas, tutoriais e novidades para aproveitar ao máximo seus grupos e canais do Telegram e manter suas comunidades engajadas.`}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>
        </Layout >
    );
}

export const dataCache = cache(async (page = 1) => {
    const [
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 12, page }),
    ]);
    const title = `Blog`;
    const description = `Confira nossas dicas, tutoriais e artigos para aproveitar ao máximo seus grupos e canais do Telegram e gerenciar comunidades com sucesso.`;
    const seo = {
        title: `Blog – Dicas, Tutoriais e Novidades sobre Grupos de Telegram`,
        description: `Acompanhe os artigos do blog do ${process.env.NEXT_PUBLIC_NAME}. Guias práticos sobre como criar, gerenciar, engajar e divulgar grupos e canais do Telegram.`,
        image: null,
    };
    const faq = [
        {
            question: `Sobre o que são os artigos do Blog do ${process.env.NEXT_PUBLIC_NAME}?`,
            answer: `Nosso blog publica dicas práticas, tutoriais de gerenciamento de comunidades, regras de boa convivência, estratégias para divulgar grupos e novidades sobre o aplicativo Telegram.`
        },
        {
            question: `Com que frequência novos posts são publicados no blog?`,
            answer: `Publicamos novos artigos e tutoriais constantemente para manter os administradores e membros sempre atualizados com as melhores práticas.`
        },
        {
            question: `Como posso utilizar as dicas do blog para fazer meu grupo crescer?`,
            answer: `Nossos artigos ensinam desde a criação de boas descrições até o uso das ferramentas de divulgação do site para atrair novos membros engajados para seu grupo.`
        },
        {
            question: `Posso sugerir um tema ou tutorial para o blog?`,
            answer: `Sim! Se você tiver dúvidas ou sugestões de temas para novos artigos, entre em contato conosco pela página de <a href="/contato">Contato</a>.`
        },
        {
            question: `A leitura dos conteúdos do blog é gratuita?`,
            answer: `Sim, todos os artigos, guias e tutoriais publicados em nosso blog são 100% gratuitos.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Blog', url: '/blog' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, ...posts };
});