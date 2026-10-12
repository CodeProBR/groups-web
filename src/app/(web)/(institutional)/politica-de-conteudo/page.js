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
                            A <strong>Política de Conteúdo</strong> do <strong>{process.env.NEXT_PUBLIC_NAME}</strong> estabelece os critérios, diretrizes e proibições aplicáveis a todas as publicações, nomes, descrições e links de grupos de Telegram cadastrados em nossa plataforma.
                        </p>
                        <p>
                            Nosso objetivo é manter um ambiente seguro, organizado e respeitoso para todos os usuários que utilizam o site para encontrar ou divulgar comunidades digitais.
                        </p>

                        <h3>1. Conteúdos Proibidos</h3>
                        <p>
                            É estritamente proibida a publicação ou divulgação de grupos de Telegram que promovam, armazenem, incentivem ou estejam relacionados a qualquer uma das seguintes práticas:
                        </p>
                        <ul>
                            <li>
                                <strong>Pornografia Infantil e Exploração de Menores:</strong> Qualquer material ou grupo relacionado à exploração sexual infantil será sumariamente removido e denunciado às autoridades competentes.
                            </li>
                            <li>
                                <strong>Golpes e Fraudes Financeiras:</strong> Esquemas de pirâmide, promessas de ganho fácil desonesto, vendas falsas, estelionato, clonagem de cartões ou roubo de dados (phishing).
                            </li>
                            <li>
                                <strong>Discurso de Ódio e Discriminação:</strong> Conteúdos que incitem a violência, o racismo, a homofobia, a intolerância religiosa, o sexismo ou qualquer forma de discriminação.
                            </li>
                            <li>
                                <strong>Pirataria e Direitos Autorais:</strong> Distribuição ilegal de mídias protegidas, livros, cursos piratas, software craqueado ou listas IPTV não autorizadas.
                            </li>
                            <li>
                                <strong>Atividades Ilícitas e Violência:</strong> Venda de armas de fogo, drogas ilícitas, medicamentos controlados sem receita, apologia a crimes ou facções criminosas.
                            </li>
                            <li>
                                <strong>Spam e Práticas Abusivas:</strong> Nomes ou descrições enganosas criados exclusivamente para enganar o usuário ou direcionar tráfego malicioso.
                            </li>
                        </ul>

                        <h3>2. Diretrizes para Nomes e Descrições</h3>
                        <p>
                            Ao cadastrar um grupo de Telegram no site, o administrador deve seguir as regras de boa convivência:
                        </p>
                        <ul>
                            <li>
                                <strong>Título Claro:</strong> O nome do grupo deve refletir com clareza o verdadeiro assunto debatido na comunidade.
                            </li>
                            <li>
                                <strong>Descrição Respeitosa:</strong> A descrição deve ser escrita em linguagem respeitosa, sem termos chulos, ofensas ou caracteres enganosos no título.
                            </li>
                            <li>
                                <strong>Categoria Adequada:</strong> O grupo deve ser cadastrado na categoria temática correspondente ao assunto principal do grupo.
                            </li>
                        </ul>

                        <h3>3. Classificação e Grupos para Maiores</h3>
                        <p>
                            Grupos com temática voltada ao público adulto (como relacionamentos, encontros ou apostas permitidas por lei) devem obrigatoriamente sinalizar a faixa etária correta durante o cadastro. O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> reserva-se o direito de reclassificar ou ocultar grupos que não estejam devidamente categorizados.
                        </p>

                        <h3>4. Processo de Moderação e Remoção</h3>
                        <p>
                            Utilizamos sistemas automatizados de triagem combinados com revisão manual e denúncias da própria comunidade para manter o diretório atualizado.
                        </p>
                        <p>
                            Qualquer publicação que viole esta Política de Conteúdo poderá ser alterada, suspensa ou excluída definitivamente da plataforma sem aviso prévio.
                        </p>

                        <h3>5. Denúncias de Irregularidades</h3>
                        <p>
                            Caso encontre um grupo listado em nosso site que descumpra estas regras ou cujo link esteja associado a atividades impróprias, utilize nosso botão de denúncia ou envie uma mensagem através da página de <Link href="/contato">Contato</Link> ou de <Link href="/denuncias-e-remocao-de-conteudo">Denúncias e Remoção de Conteúdo</Link>.
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
                        <p>{`Dúvidas sobre a Política de Conteúdo e moderação da plataforma.`}</p>
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
    const title = `Política de Conteúdo`;
    const description = `Conheça as regras e diretrizes de conteúdo do ${process.env.NEXT_PUBLIC_NAME}. Saiba o que é permitido e o que é proibido na divulgação de grupos de Telegram.`;
    const seo = {
        title: `Política de Conteúdo – ${process.env.NEXT_PUBLIC_NAME} | Regras de Publicação`,
        description: `Leia a Política de Conteúdo do ${process.env.NEXT_PUBLIC_NAME}. Confira as diretrizes sobre quais tipos de grupos de Telegram são aceitos e as regras de moderação.`,
        image: null,
    };
    const faq = [
        {
            question: `Quais tipos de grupos são expressamente proibidos no site?`,
            answer: `São proibidos grupos com conteúdos de pornografia infantil, golpes/fraudes financeiras, pirataria de mídias/cursos, discurso de ódio, apologia a crimes ou vendas de itens ilícitos.`
        },
        {
            question: `Como o site monitora os grupos cadastrados?`,
            answer: `Utilizamos filtros automáticos de palavras e categorias, verificação técnica de links e moderação a partir de denúncias enviadas pelos próprios usuários.`
        },
        {
            question: `O que acontece se meu grupo for cadastrado na categoria errada?`,
            answer: `Nossa equipe de moderação poderá reclassificar o grupo para a categoria correta ou suspendê-lo até a devida regularização das informações.`
        },
        {
            question: `Como posso denunciar um grupo que viola a Política de Conteúdo?`,
            answer: `Você pode denunciar diretamente pelo link na página do grupo ou enviar uma mensagem em nosso canal de <a href="/denuncias-e-remocao-de-conteudo">Denúncias e Remoção de Conteúdo</a>.`
        },
        {
            question: `A Política de Conteúdo se aplica a grupos impulsionados ou pagos?`,
            answer: `Sim. A Política de Conteúdo aplica-se rigorosamente a todos os grupos cadastrados na plataforma, incluindo anúncios e grupos impulsionados.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Política de Conteúdo', url: '/politica-de-conteudo' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});