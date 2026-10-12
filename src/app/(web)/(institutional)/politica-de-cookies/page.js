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
                            Esta <strong>Política de Cookies</strong> explica de forma transparente como o <strong>{process.env.NEXT_PUBLIC_NAME}</strong> utiliza cookies e tecnologias semelhantes para reconhecer seu acesso, lembrar suas preferências e proporcionar uma experiência de navegação mais rápida e segura.
                        </p>
                        <p>
                            Esta política complementa a nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link> e cumpre os requisitos de transparência estabelecidos pela LGPD (Lei nº 13.709/2018).
                        </p>

                        <h3>1. O Que São Cookies?</h3>
                        <p>
                            <strong>Cookies</strong> são pequenos arquivos de texto armazenados no seu computador, smartphone ou tablet pelo seu navegador web quando você visita um site. Eles servem para registrar informações sobre a sua navegação, tais como suas preferências de visualização, estado da sessão e métricas anônimas de uso.
                        </p>

                        <h3>2. Por Que Utilizamos Cookies?</h3>
                        <p>
                            Utilizamos cookies em nossa plataforma para finalidades essenciais e funcionais:
                        </p>
                        <ul>
                            <li>
                                <strong>Funcionamento Técnico:</strong> Salvar preferências de navegação, garantir o carregamento rápido de páginas e manter o site estável.
                            </li>
                            <li>
                                <strong>Métricas de Acesso (Analytics):</strong> Compreender o volume de tráfego, identificar as páginas e categorias de grupos mais buscadas e melhorar o desempenho geral da plataforma.
                            </li>
                            <li>
                                <strong>Exibição de Publicidade:</strong> Exibir anúncios de parceiros de publicidade (como o Google AdSense), financiando o acesso gratuito a todas as funcionalidades do site.
                            </li>
                        </ul>

                        <h3>3. Tipos de Cookies Utilizados</h3>
                        <p>
                            Os cookies em nosso site dividem-se nas seguintes categorias:
                        </p>
                        <ul>
                            <li>
                                <strong>Cookies Estritamente Necessários:</strong> Fundamentais para permitir a navegação e a utilização dos recursos básicos do site. Não podem ser desativados nos nossos sistemas.
                            </li>
                            <li>
                                <strong>Cookies de Desempenho e Analytics:</strong> Coletam dados estatísticos anônimos através de ferramentas como o Google Analytics para medir o tráfego e otimizar o tempo de resposta do site.
                            </li>
                            <li>
                                <strong>Cookies de Funcionalidade:</strong> Permitem que o site se lembre de escolhas feitas pelo usuário (como termos de pesquisa recentes e configurações de tema).
                            </li>
                            <li>
                                <strong>Cookies de Publicidade:</strong> Utilizados por redes de anúncios parceiras para veicular anúncios relevantes com base na sua navegação anônima.
                            </li>
                        </ul>

                        <h3>4. Como Gerenciar ou Desativar Cookies</h3>
                        <p>
                            Você tem o direito de decidir se aceita ou recusa cookies. Você pode alterar as configurações do seu navegador de internet a qualquer momento para bloquear, recusar ou excluir cookies instalados:
                        </p>
                        <ul>
                            <li>
                                <strong>Google Chrome:</strong> Configurações &gt; Privacidade e Segurança &gt; Cookies e outros dados do site.
                            </li>
                            <li>
                                <strong>Mozilla Firefox:</strong> Opções &gt; Privacidade e Segurança &gt; Cookies e dados de sites.
                            </li>
                            <li>
                                <strong>Microsoft Edge:</strong> Configurações &gt; Permissões do site &gt; Cookies e dados armazenados.
                            </li>
                            <li>
                                <strong>Safari:</strong> Preferências &gt; Privacidade &gt; Bloquear todos os cookies.
                            </li>
                        </ul>
                        <p>
                            Atenção: A desativação total de cookies essenciais pode afetar o funcionamento de determinados recursos e a velocidade de navegação no site.
                        </p>

                        <h3>5. Alterações nesta Política</h3>
                        <p>
                            Podemos atualizar esta Política de Cookies periodicamente para refletir mudanças técnicas ou atualizações regulatórias. Recomendamos que você revise esta página regularmente.
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
                        <p>{`Dúvidas sobre o uso de cookies e rastreamento na plataforma.`}</p>
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
    const title = `Política de Cookies`;
    const description = `Entenda como o ${process.env.NEXT_PUBLIC_NAME} utiliza cookies e tecnologias de rastreamento para melhorar sua experiência de navegação e garantir a segurança do site.`;
    const seo = {
        title: `Política de Cookies – ${process.env.NEXT_PUBLIC_NAME} | Uso de Cookies e Rastreamento`,
        description: `Saiba tudo sobre o uso de cookies no ${process.env.NEXT_PUBLIC_NAME}. Entenda as categorias de cookies utilizadas e como você pode gerenciá-los em seu navegador.`,
        image: null,
    };
    const faq = [
        {
            question: `O que acontece se eu desativar os cookies no navegador?`,
            answer: `A desativação de cookies de publicidade não afetará sua navegação. No entanto, desativar cookies essenciais pode fazer com que algumas preferências de visualização não sejam salvas corretamente.`
        },
        {
            question: `Os cookies do site armazenam informações pessoais como nome ou telefone?`,
            answer: `Não. Os cookies utilizados pelo ${process.env.NEXT_PUBLIC_NAME} registram apenas dados técnicos anônimos de sessão e navegação.`
        },
        {
            question: `Como funcionam os anúncios exibidos no site?`,
            answer: `Exibimos anúncios através de parceiros como o Google AdSense. Esses parceiros podem utilizar cookies para exibir anúncios relevantes ao seu perfil de navegação anônimo.`
        },
        {
            question: `Como desativar a publicidade personalizada do Google?`,
            answer: `Você pode gerenciar ou desativar anúncios personalizados do Google diretamente na página de <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Configurações de Anúncios do Google</a>.`
        },
        {
            question: `Onde posso tirar dúvidas sobre o uso de cookies no site?`,
            answer: `Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através da nossa página de <a href="/contato">Contato</a>.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Política de Cookies', url: '/politica-de-cookies' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});