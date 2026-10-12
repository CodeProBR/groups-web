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
                            Seja bem-vindo ao <strong>{process.env.NEXT_PUBLIC_NAME}</strong>. Ao acessar, navegar ou utilizar os serviços disponíveis em nosso site, você concorda expressamente em cumprir e respeitar os presentes Termos de Uso e a nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
                        </p>
                        <p>
                            Recomendamos a leitura atenta deste documento. Caso você não concorde com qualquer uma das condições estabelecidas, orientamos que interrompa o uso do site imediatamente.
                        </p>

                        <h3>1. Aceitação dos Termos</h3>
                        <p>
                            Estes Termos de Uso constituem um acordo legal entre o usuário e a plataforma <strong>{process.env.NEXT_PUBLIC_NAME}</strong>. O uso contínuo dos nossos serviços indica a aceitação integral de todas as cláusulas e atualizações aqui descritas.
                        </p>

                        <h3>2. Descrição dos Serviços</h3>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> opera como um diretório e indexador independente de links de convite públicos de grupos e canais de Telegram. Nosso objetivo é facilitar a localização e a divulgação de comunidades organizadas por categorias de interesse.
                        </p>

                        <h3>3. Regras para Cadastro e Envio de Grupos</h3>
                        <p>
                            Ao cadastrar ou enviar um link de grupo de Telegram para publicação em nosso site, o usuário declara e garante que:
                        </p>
                        <ul>
                            <li>
                                É administrador do grupo ou possui autorização expressa para realizar sua divulgação.
                            </li>
                            <li>
                                As informações fornecidas (nome, categoria e descrição) são verdadeiras e precisas.
                            </li>
                            <li>
                                O grupo <strong>não</strong> promove, armazena ou distribui conteúdos ilícitos, material pornográfico não autorizado, golpes financeiros, pirataria, apologia à violência, discurso de ódio ou qualquer violação da legislação brasileira vigente.
                            </li>
                        </ul>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> reserva-se o direito de recusar, suspender ou remover qualquer grupo cadastrado a qualquer momento, sem necessidade de aviso prévio ou justificativa.
                        </p>

                        <h3>4. Responsabilidade pelos Conteúdos dos Grupos</h3>
                        <p>
                            A plataforma atua exclusivamente como intermediária na exibição de links públicos de convite. O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> <strong>não gerencia, modera ou se responsabiliza</strong> pelas conversas, mídias, arquivos, opiniões ou negociações realizadas dentro dos grupos do Telegram.
                        </p>
                        <p>
                            A decisão de clicar em um link e entrar em qualquer grupo de Telegram é de inteira responsabilidade e risco do usuário.
                        </p>

                        <h3>5. Isenção de Vínculo com o Telegram</h3>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> é um site independente de serviços web e <strong>não possui qualquer vínculo oficial, parceria, patrocínio ou afiliação</strong> com o Telegram FZ-LLC ou suas subsidiárias. A marca "Telegram" e seus logotipos são de propriedade exclusiva da Telegram FZ-LLC.
                        </p>

                        <h3>6. Propriedade Intelectual</h3>
                        <p>
                            Todo o conteúdo original da plataforma — incluindo código-fonte, layout visual, marca, logotipo e compilação da base de dados — é protegido pelas leis de propriedade intelectual. É proibida a reprodução, cópia ou extração automatizada (scraping) de dados sem nossa autorização prévia por escrito.
                        </p>

                        <h3>7. Denúncias e Remoção de Links</h3>
                        <p>
                            Mantemos um compromisso ético com a qualidade e segurança do nosso diretório. Caso identifique um grupo com link quebrado, conteúdo inadequado ou que viole direitos autorais, utilize nosso canal de <Link href="/contato">Contato</Link> ou denúncia para solicitar a remoção do conteúdo.
                        </p>

                        <h3>8. Modificações nos Termos e Legislação</h3>
                        <p>
                            Reservamo-nos o direito de atualizar ou alterar estes Termos de Uso periodicamente. As modificações entram em vigor imediatamente após a sua publicação nesta página. Estes termos são regidos e interpretados segundo as leis da República Federativa do Brasil.
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
                        <p>{`Dúvidas sobre os Termos e Regres de Uso da nossa plataforma.`}</p>
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
    const title = `Termos de Uso`;
    const description = `Leia os Termos e Condições de Uso do ${process.env.NEXT_PUBLIC_NAME}. Saiba quais são as regras de navegação, cadastro de grupos e responsabilidades na plataforma.`;
    const seo = {
        title: `Termos de Uso – ${process.env.NEXT_PUBLIC_NAME} | Regras da Plataforma`,
        description: `Confira os Termos de Uso do ${process.env.NEXT_PUBLIC_NAME}. Conheça as diretrizes para cadastro, navegação e isenção de responsabilidade sobre grupos de Telegram.`,
        image: null,
    };
    const faq = [
        {
            question: `Quais são as regras principais para cadastrar um grupo no site?`,
            answer: `O grupo deve possuir informações verdadeiras e não conter ou promover conteúdos ilícitos, golpes, pirataria, pornografia não autorizada ou discurso de ódio.`
        },
        {
            question: `O site se responsabiliza pelas mensagens trocadas dentro dos grupos?`,
            answer: `Não. O site opera apenas como um diretório de links públicos de convite. As conversas e interações nos grupos são de responsabilidade exclusiva dos participantes e administradores.`
        },
        {
            question: `Meu grupo pode ser removido do site?`,
            answer: `Sim. Reservamo-nos o direito de remover grupos inativos, com links quebrados ou que violem nossas diretrizes e Termos de Uso sem aviso prévio.`
        },
        {
            question: `Como solicitar a remoção de um grupo cadastrado?`,
            answer: `Se você for administrador de um grupo listado no site e desejar sua remoção, envie uma solicitação através da página de <a href="/contato">Contato</a> informando o link da página do grupo.`
        },
        {
            question: `O ${process.env.NEXT_PUBLIC_NAME} possui vínculo oficial com o Telegram?`,
            answer: `Não. Nossa plataforma é totalmente independente e não possui filiação, patrocínio ou parceria com o Telegram FZ-LLC.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Termos de Uso', url: '/termos-de-uso' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});