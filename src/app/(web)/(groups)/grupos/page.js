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

export async function generateMetadata({ searchParams }) {
    const { page, q } = (await searchParams) || {};
    const currentPage = parseInt(page) || 1;
    const data = await dataCache(currentPage, q);
    return {
        title: data.seo.title,
        description: data.seo.description,
        image: data.seo.image,
    };
}

export default async function Page({ searchParams }) {
    const { page, q } = (await searchParams) || {};
    const currentPage = parseInt(page) || 1;
    const data = await dataCache(currentPage, q);

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

                {/* GROUPS */}
                <div className={styleSection.block}>
                    <Groups
                        items={data.items}
                    />
                    <Pagination
                        page={data.page}
                        totalPages={data.totalPages}
                        baseUrl={q ? `/grupos?q=${encodeURIComponent(q)}` : `/grupos`}
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
                        <p>{`Acompanhe nossas dicas, tutoriais e novidades para aproveitar ao máximo seus grupos de Telegram e manter suas comunidades engajadas.`}</p>
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
                        <p>{`Tire suas dúvidas sobre como encontrar, entrar e divulgar links de grupos de Telegram por categoria na nossa plataforma.`}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>
        </Layout >
    );
}

export const dataCache = cache(async (page = 1, q = '') => {
    const [
        groups,
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getGroups({ limit: 12, page, adult: false, q }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
    ]);
    const title = q ? `Resultados da busca por "${q}"` : `Grupos e Canais de Telegram`;
    const description = q
        ? `Navegue pelos grupos e canais de Telegram encontrados para a busca "${q}".`
        : `Explore nossa lista completa de grupos de Telegram ativos e atualizados. Encontre comunidades de diversos temas como amizade, figurinhas, entretenimento, oportunidades e muito mais. Conecte-se com pessoas de todo o Brasil!`;
    const seo = {
        title: q ? `Grupos de Telegram: "${q}" – Links Atualizados` : `Grupos de Telegram – Links de Convite Atualizados`,
        description: q ? `Encontre grupos de Telegram relacionados a "${q}". Links de convite verificados e ativos.` : `Encontre e entre nos melhores grupos e canais de Telegram ativos. Navegue por centenas de links de convite atualizados sobre amizade, empregos, jogos, tecnologia e mais.`,
        image: null,
    };
    const faq = [
        {
            question: `Como encontrar um grupo de Telegram do meu interesse?`,
            answer: `Navegue pela lista de grupos ativos nesta página ou utilize o campo de busca para pesquisar por termos e temas do seu interesse. Você também pode utilizar o menu de categorias para filtrar grupos por assunto.`
        },
        {
            question: `Como entrar em um grupo de Telegram listado no site?`,
            answer: `Ao escolher o grupo desejado, clique nele para ver mais detalhes e em seguida no botão de acesso. Você será direcionado para o link oficial de convite do Telegram para confirmar sua entrada pelo próprio aplicativo.`
        },
        {
            question: `O ${process.env.NEXT_PUBLIC_NAME} é gratuito?`,
            answer: `Sim, o <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é 100% gratuito. Você pode navegar pelos grupos, acessar links e entrar em qualquer comunidade sem pagar nada.`
        },
        {
            question: `Como posso divulgar meu próprio grupo de Telegram?`,
            answer: `Para cadastrar seu grupo, clique em "Enviar Grupo", preencha o nome, escolha a categoria adequada, adicione uma boa descrição e informe o link de convite oficial. Seu grupo ficará disponível para milhares de usuários.`
        },
        {
            question: `Os grupos de Telegram listados são oficiais do aplicativo?`,
            answer: `Não, os grupos listados <strong>não pertencem ao Telegram</strong> e não possuem vínculo com o aplicativo oficial. Todos os grupos são criados e administrados por usuários independentes que divulgam seus links em nossa plataforma.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Grupos', url: '/grupos' },
        ...(q ? [{ name: `Busca: ${q}`, url: `/grupos?q=${encodeURIComponent(q)}` }] : []),
    ];
    return { title, description, ...groups, seo, faq, breadcrumb, boosts, categories, posts };
});