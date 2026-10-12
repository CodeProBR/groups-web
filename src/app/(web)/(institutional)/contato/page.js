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
                            Seja bem-vindo ao canal oficial de atendimento do <strong>{process.env.NEXT_PUBLIC_NAME}</strong>. Estamos sempre à disposição para ouvir nossos usuários, administradores de grupos e parceiros.
                        </p>
                        <p>
                            Se você possui dúvidas sobre a plataforma, deseja enviar sugestões de melhorias, relatar links quebrados, tratar de anúncios ou parcerias comerciais, entre em contato conosco através dos canais abaixo.
                        </p>

                        <h3>1. Canais de Atendimento</h3>
                        <p>
                            Para garantir um atendimento ágil e direcionado, selecione o assunto adequado para a sua solicitação:
                        </p>
                        <ul>
                            <li>
                                <strong>Dúvidas e Suporte ao Usuário:</strong> Ajuda para navegar pelo site, buscar grupos ou relatar dificuldades técnicas de acesso.
                            </li>
                            <li>
                                <strong>Dúvidas de Administradores:</strong> Auxílio para cadastro de novos grupos, atualização de links de convite ou alteração de dados.
                            </li>
                            <li>
                                <strong>Anúncios e Impulsionamento:</strong> Informações sobre como destacar seu grupo nas áreas nobres do site através dos nossos planos de impulso ("Boosts").
                            </li>
                            <li>
                                <strong>Denúncias e Remoções:</strong> Solicitações para remoção de links ou relatos de grupos que violem nossa <Link href="/politica-de-conteudo">Política de Conteúdo</Link> ou os <Link href="/termos-de-uso">Termos de Uso</Link>.
                            </li>
                        </ul>

                        <h3>2. E-mail de Contato Principal</h3>
                        <p>
                            Você pode nos enviar uma mensagem diretamente para o nosso e-mail oficial:
                        </p>
                        <p>
                            <strong>E-mail:</strong> <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>{process.env.NEXT_PUBLIC_EMAIL}</a>
                        </p>
                        <p>
                            <strong>Horário de Atendimento:</strong> Segunda a Sexta-feira, das 09h às 18h (Horário de Brasília).
                        </p>

                        <h3>3. Informações Importantes para o Envio da Mensagem</h3>
                        <p>
                            Para que possamos responder à sua solicitação o mais rápido possível, por favor inclua:
                        </p>
                        <ul>
                            <li>O assunto claro da sua mensagem no título do e-mail.</li>
                            <li>A URL exata da página do grupo envolvido (caso se trate de suporte, alteração de link ou denúncia).</li>
                            <li>Seu nome de contato e e-mail para resposta.</li>
                        </ul>

                        <h3>4. Isenção sobre o Suporte do Telegram</h3>
                        <p>
                            Lembramos que o <strong>{process.env.NEXT_PUBLIC_NAME}</strong> é um diretório independente de divulgação de links e <strong>não possui vínculo com o Telegram FZ-LLC</strong>. Não oferecemos suporte técnico para a conta pessoal do seu aplicativo Telegram (como recuperação de conta, códigos de verificação ou bloqueios do aplicativo).
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
                        <p>{`Dúvidas sobre como entrar em contato e atendimento do suporte.`}</p>
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
    const title = `Contato`;
    const description = `Entre em contato com a equipe do ${process.env.NEXT_PUBLIC_NAME}. Envie suas dúvidas, sugestões, relatórios de erro ou solicitações de parcerias e anúncios.`;
    const seo = {
        title: `Contato – ${process.env.NEXT_PUBLIC_NAME} | Fale Conosco`,
        description: `Canal oficial de atendimento do ${process.env.NEXT_PUBLIC_NAME}. Entre em contato para tirar dúvidas sobre grupos de Telegram, parcerias, suporte ou denúncias.`,
        image: null,
    };
    const faq = [
        {
            question: `Qual é o prazo médio de resposta para mensagens de contato?`,
            answer: `Respondemos à grande maioria das mensagens em um prazo de 24 a 48 horas úteis.`
        },
        {
            question: `Como posso anunciar ou impulsionar meu grupo de Telegram?`,
            answer: `Você pode entrar em contato conosco através do e-mail para conhecer nossos planos de destaque ("Boosts") e posicionar seu grupo nos locais mais visíveis do site.`
        },
        {
            question: `Sou administrador e meu link de convite mudou. Como posso atualizar?`,
            answer: `Envie uma mensagem em nosso e-mail informando o link da página do seu grupo em nosso site e o novo link oficial do Telegram.`
        },
        {
            question: `O suporte pode me ajudar com minha conta pessoal do Telegram?`,
            answer: `Não. Somos um portal independente de catálogo de links. Para problemas com sua conta do Telegram (como contas banidas ou códigos de SMS), você deve procurar o suporte oficial do Telegram no próprio aplicativo.`
        },
        {
            question: `Como denunciar um grupo com conteúdo inadequado?`,
            answer: `Envie-nos uma mensagem informando a URL da página do grupo em nosso site e o motivo da denúncia. Analisaremos o caso com prioridade.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Contato', url: '/contato' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});