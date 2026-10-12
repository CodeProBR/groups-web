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
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> mantém um compromisso firme com a segurança, a legalidade e o respeito à comunidade. Esta página detalha o procedimento oficial para que usuários, administradores de grupos, detentores de direitos autorais ou autoridades solicitem a <strong>remoção imediata de conteúdos ou links de grupos e canais do Telegram</strong> que violem a legislação brasileira ou nossa <Link href="/politica-de-conteudo">Política de Conteúdo</Link>.
                        </p>

                        <h3>1. Motivos Aceitos para Denúncia e Remoção</h3>
                        <p>
                            Analisamos com prioridade solicitações de remoção fundamentadas nos seguintes motivos:
                        </p>
                        <ul>
                            <li>
                                <strong>Violação de Direitos Autorais ou Propriedade Intelectual:</strong> Uso não autorizado de marcas, logotipos ou mídias protegidas por direitos autorais.
                            </li>
                            <li>
                                <strong>Conteúdos Ilícitos ou Perigosos:</strong> Grupos e canais relacionados à exploração de menores, golpes financeiros, estelionato, pirataria, vendas ilícitas, discurso de ódio ou apologia à violência.
                            </li>
                            <li>
                                <strong>Links Inativos ou Quebrados:</strong> Links de convite que expiraram, mudaram de dono ou não funcionam mais.
                            </li>
                            <li>
                                <strong>Solicitação pelo Próprio Administrador:</strong> Caso você seja o criador ou administrador do grupo/canal e não deseje mais que ele seja exibido em nosso diretório.
                            </li>
                            <li>
                                <strong>Uso Indevido de Imagem ou Dados Pessoais:</strong> Divulgação não autorizada de fotos, nomes ou contatos de terceiros.
                            </li>
                        </ul>

                        <h3>2. Como Enviar uma Solicitação de Remoção</h3>
                        <p>
                            Para que sua solicitação seja processada com agilidade, envie uma mensagem através da nossa página de <Link href="/contato">Contato</Link> contendo as seguintes informações:
                        </p>
                        <ul>
                            <li>
                                <strong>URL da Página no Site:</strong> O link exato da página do grupo no nosso site.
                            </li>
                            <li>
                                <strong>Motivo Detalhado:</strong> Descrição clara do motivo da denúncia ou pedido de remoção.
                            </li>
                            <li>
                                <strong>Comprovação de Titularidade (se aplicável):</strong> Em caso de violação de marca, direitos autorais ou pedido do próprio administrador, forneça comprovante de titularidade.
                            </li>
                            <li>
                                <strong>Dados de Contato:</strong> Nome e e-mail do notificante para confirmação e acompanhamento.
                            </li>
                        </ul>

                        <h3>3. Prazos e Procedimentos de Análise</h3>
                        <p>
                            Todas as notificações recebidas são avaliadas pela nossa equipe de moderação no prazo médio de <strong>24 a 48 horas úteis</strong>.
                        </p>
                        <p>
                            Em casos graves envolvendo crimes, exploração infantil ou violações explícitas da legislação, a remoção do link da nossa plataforma é realizada imediatamente após a identificação.
                        </p>

                        <h3>4. Isenção sobre o Aplicativo Telegram</h3>
                        <p>
                            Lembramos que o <strong>{process.env.NEXT_PUBLIC_NAME}</strong> atua exclusivamente como um diretório web independente. A remoção de um link do nosso site <strong>impede novos acessos através da nossa plataforma</strong>, mas não encerra o grupo ou canal diretamente dentro do aplicativo Telegram.
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
                        <p>{`Dúvidas sobre o procedimento de denúncias e remoção de conteúdo.`}</p>
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
    const title = `Denúncias e Remoção de Conteúdo`;
    const description = `Saiba como solicitar a remoção de um grupo ou denunciar conteúdos inadequados no ${process.env.NEXT_PUBLIC_NAME}. Compromisso com a segurança e conformidade da plataforma.`;
    const seo = {
        title: `Denúncias e Remoção de Conteúdo – ${process.env.NEXT_PUBLIC_NAME} | Canal de Notificação`,
        description: `Canal oficial de denúncias e remoção de conteúdo do ${process.env.NEXT_PUBLIC_NAME}. Saiba quais informações enviar para solicitar a remoção rápida de um grupo ou link.`,
        image: null,
    };
    const faq = [
        {
            question: `Sou administrador do grupo. Posso pedir a remoção do meu grupo do site?`,
            answer: `Sim! Se você for o criador ou administrador do grupo ou canal e não desejar que ele permaneça listado, basta enviar uma mensagem pela página de <a href="/contato">Contato</a> informando o link do grupo no site.`
        },
        {
            question: `Quanto tempo demora para um grupo ser removido após a denúncia?`,
            answer: `As denúncias são analisadas e processadas em até 24 a 48 horas úteis. Casos graves de violação de regras ou legislação são tratados com prioridade emergencial.`
        },
        {
            question: `O site pode fechar o grupo no aplicativo Telegram?`,
            answer: `Não. O site remove o link da nossa plataforma web. Para denunciar ou encerrar o grupo no aplicativo, você deve utilizar as ferramentas de denúncia do próprio Telegram.`
        },
        {
            question: `O que acontece se eu denunciar um link quebrado?`,
            answer: `Nossa equipe verifica a inatividade do link de convite e realiza a remoção ou atualização no banco de dados para manter a qualidade das buscas.`
        },
        {
            question: `Quais informações preciso enviar para fazer uma denúncia?`,
            answer: `Você deve enviar a URL da página do grupo em nosso site, o motivo da solicitação e seu e-mail de contato.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Denúncias e Remoção de Conteúdo', url: '/denuncias-e-remocao-de-conteudo' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});