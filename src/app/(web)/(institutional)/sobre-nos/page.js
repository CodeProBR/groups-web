import Layout from '@/layout';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Posts from '@/components/Posts';
import Content from '@/components/Content';
import AsideGroups from '@/components/Aside/Groups';
import AsideCategories from '@/components/Aside/Categories';
import { getBoosts, getCategories, getPosts } from "@/utils/database";
import { cache } from 'react';
import styleSection from '@/styles/section';
import Link from 'next/link';

export async function generateMetadata() {
    const data = await dataCache();
    return {
        title: data.seo.title,
        description: data.seo.description,
        image: data.seo.image,
    };
}

export default async function Page() {
    const data = await dataCache();

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

                {/* CONTENT */}
                <div className={styleSection.block}>

                    <Content>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> é a sua plataforma completa para encontrar, explorar e divulgar links de grupos e canais de Telegram de todo o Brasil. Nosso objetivo é facilitar a conexão entre pessoas que compartilham dos mesmos interesses, ideias e paixões.
                        </p>
                        <p>
                            Sabemos que o Telegram vai muito além de conversas particulares: é o espaço onde nascem comunidades de aprendizado, empreendedorismo, amizade, jogos, figurinhas, cripto e entretenimento. Por isso, organizamos centenas de grupos ativos em categorias claras e objetivas.
                        </p>
                        <p>
                            <strong>Nossa Missão:</strong> Oferecer um diretório acessível, organizado e dinâmico, permitindo que usuários descubram novos grupos e canais com praticidade e segurança, enquanto administradores ganham visibilidade para expandir suas comunidades.
                        </p>
                        <p>
                            <strong>Nossa Visão:</strong> Ser a principal referência em catálogo e descoberta de comunidades digitais do país, reconhecida pela qualidade dos conteúdos listados e pela constante inovação em nossos serviços.
                        </p>
                        <p>
                            Desenvolvemos recursos pensados tanto para quem quer encontrar um novo grupo para participar quanto para quem quer fazer seu próprio grupo crescer:
                        </p>
                        <ul>
                            <li>
                                <strong>Categorias Variadas:</strong> Navegue por grupos divididos por áreas como Amizade, Figurinhas, Empregos, Estudos, Tecnologia, Promoções, Games e muito mais.
                            </li>
                            <li>
                                <strong>Busca Rápida e Eficiente:</strong> Encontre grupos específicos digitando o tema ou palavras-chave diretamente na nossa barra de pesquisa.
                            </li>
                            <li>
                                <strong>Divulgação 100% Gratuita:</strong> Cadastre seu grupo de forma simples e rápida para alcançar milhares de visitantes diariamente.
                            </li>
                            <li>
                                <strong>Links Verificados:</strong> Monitoramento contínuo para garantir links ativos e uma navegação livre de frustrações.
                            </li>
                        </ul>
                        <p>
                            Valorizamos a segurança e a transparência em nossa plataforma. Todos os grupos cadastrados passam por filtros de segurança e revisão de diretrizes para garantir um ambiente amigável e respeitoso.
                        </p>
                        <p>
                            Vale ressaltar que o <strong>{process.env.NEXT_PUBLIC_NAME}</strong> é um serviço independente de indexação de links públicos e não possui vínculo oficial com o Telegram FZ-LLC.
                        </p>
                    </Content>

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
                        <p>{`Tire suas dúvidas sobre o funcionamento da nossa plataforma de grupos de Telegram.`}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>
        </Layout >
    );
}

export const dataCache = cache(async () => {
    const [
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
    ]);
    const title = `Sobre Nós`;
    const description = `Conheça a história e a missão do ${process.env.NEXT_PUBLIC_NAME}, a maior plataforma para encontrar, entrar e divulgar grupos de Telegram no Brasil.`;
    const seo = {
        title: `Sobre Nós – ${process.env.NEXT_PUBLIC_NAME} | Conectando Grupos de Telegram`,
        description: `Saiba mais sobre o ${process.env.NEXT_PUBLIC_NAME}. Conectamos pessoas a grupos de Telegram ativos e organizados por categorias em todo o Brasil.`,
        image: null,
    };
    const faq = [
        {
            question: `O que é o ${process.env.NEXT_PUBLIC_NAME}?`,
            answer: `O <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é um diretório e portal online gratuito para busca e divulgação de links de grupos e canais de Telegram organizados por categorias de interesse.`
        },
        {
            question: `Como posso entrar em um grupo listado no site?`,
            answer: `Navegue pelas categorias ou pesquise pelo nome do grupo desejado. Ao encontrar o grupo, basta clicar nele para acessar a página com o link oficial do Telegram.`
        },
        {
            question: `É gratuito divulgar um grupo no site?`,
            answer: `Sim! O cadastro e a divulgação básica de grupos no <strong>${process.env.NEXT_PUBLIC_NAME}</strong> são 100% gratuitos.`
        },
        {
            question: `O site é oficial do Telegram?`,
            answer: `Não. O <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é uma plataforma independente de divulgação de links públicos de convite e não tem afiliação com o Telegram FZ-LLC.`
        },
        {
            question: `Como faço para tirar dúvidas ou fazer denúncias?`,
            answer: `Você pode entrar em contato com nossa equipe através da página de <a href="/contato">Contato</a> para enviar dúvidas, sugestões ou denunciar grupos inativos.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Sobre Nós', url: '/sobre-nos' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});