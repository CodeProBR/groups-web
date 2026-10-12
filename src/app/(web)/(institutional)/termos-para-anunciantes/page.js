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
                            Estes <strong>Termos para Anunciantes</strong> regem a contratação de serviços de publicidade, planos de impulso e anúncios em destaque oferecidos pela plataforma <strong>{process.env.NEXT_PUBLIC_NAME}</strong>. Ao contratar um plano de anúncio ou impulsionamento, você (doravante denominado "Anunciante") concorda com todos os termos e condições aqui estabelecidos, além dos nossos <Link href="/termos-de-uso">Termos de Uso gerais</Link> e da nossa <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
                        </p>

                        <h3>1. Objeto e Serviços de Anúncio</h3>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> disponibiliza opções de publicidade paga e impulsionamento de grupos de Telegram ("Grupos em Destaque" / "Boosts"), permitindo maior visibilidade, posição privilegiada no site e maior captação de membros para o grupo do Anunciante.
                        </p>

                        <h3>2. Responsabilidades do Anunciante</h3>
                        <p>
                            O Anunciante é o único e exclusivo responsável pelo conteúdo do grupo impulsionado, incluindo o nome, imagem de capa, descrição e pelas interações que ocorrem no grupo. Ao contratar um anúncio, o Anunciante garante que:
                        </p>
                        <ul>
                            <li>
                                É o legítimo proprietário ou administrador autorizado do grupo promovido.
                            </li>
                            <li>
                                O grupo atende rigorosamente a todas as normas legais e <strong>não veicula</strong> conteúdos ilícitos, pirataria, golpes financeiros, cassinos ilegais, apologia a crimes, discurso de ódio ou spams.
                            </li>
                            <li>
                                O link de convite do Telegram fornecido permanecerá válido e ativo durante todo o período de veiculação da campanha.
                            </li>
                        </ul>

                        <h3>3. Aprovação, Moderação e Direito de Recusa</h3>
                        <p>
                            Todos os anúncios e solicitações de impulsionamento passam por um processo de revisão e moderação prévia. O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> reserva-se o direito irrestrito de recusar, cancelar ou remover qualquer anúncio ou grupo impulsionado que viole nossas diretrizes de conteúdo ou a legislação vigente, sem que isso gere direito a indenização.
                        </p>

                        <h3>4. Pagamentos, Prazos e Cancelamentos</h3>
                        <p>
                            Os valores, formatos e a duração da veiculação (dias ou semanas de destaque) são definidos no momento da contratação do plano de anúncio.
                        </p>
                        <ul>
                            <li>
                                <strong>Confirmação de Pagamento:</strong> A veiculação do anúncio ou destaque é iniciada somente após a confirmação do pagamento pelo sistema parceiro.
                            </li>
                            <li>
                                <strong>Links Inativos:</strong> Caso o link do grupo seja alterado ou expirado pelo Anunciante durante a veiculação, o período de anúncio continuará contando sem interrupção até que o Anunciante atualize o link válido.
                            </li>
                            <li>
                                <strong>Reembolso:</strong> Não haverá reembolso após o início da veiculação do anúncio, exceto em casos de falha técnica comprovada imputável exclusivamente à plataforma.
                            </li>
                        </ul>

                        <h3>5. Isenção de Garantia de Resultados</h3>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> garante a exibição do grupo nas áreas contratadas do site conforme o plano escolhido. No entanto, <strong>não garantimos números específicos de novos membros, cliques ou conversões</strong>, uma vez que o interesse do público depende do apelo do tema, nome e imagem do grupo do Anunciante.
                        </p>

                        <h3>6. Isenção de Vínculo com o Telegram</h3>
                        <p>
                            O serviço de publicidade do <strong>{process.env.NEXT_PUBLIC_NAME}</strong> é prestado de forma independente no site e não possui qualquer vínculo, endosso ou afiliação oficial com o Telegram FZ-LLC.
                        </p>

                        <h3>7. Alterações nestes Termos</h3>
                        <p>
                            Reservamo-nos o direito de alterar estes Termos para Anunciantes a qualquer tempo. As modificações passarão a valer para novas contratações ou renovações realizadas após a data de atualização.
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
                        <p>{`Dúvidas sobre anúncios e impulsionamentos de grupos de Telegram.`}</p>
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
    const title = `Termos para Anunciantes`;
    const description = `Conheça os termos, regras e diretrizes para anunciar e impulsionar grupos de Telegram no ${process.env.NEXT_PUBLIC_NAME}.`;
    const seo = {
        title: `Termos para Anunciantes – ${process.env.NEXT_PUBLIC_NAME} | Regras de Anúncios e Destaques`,
        description: `Leia as diretrizes e regras para anúncios e grupos impulsionados no ${process.env.NEXT_PUBLIC_NAME}. Saiba como promover seu grupo com segurança e transparência.`,
        image: null,
    };
    const faq = [
        {
            question: `Como funciona o impulsionamento (Boost) de um grupo de Telegram?`,
            answer: `Ao impulsionar um grupo, ele é posicionado em áreas de destaque do site (como topo da página inicial, lateral de categorias e seções de alta visibilidade), recebendo significativamente mais acessos de novos membros.`
        },
        {
            question: `Quais tipos de grupos não podem ser anunciados?`,
            answer: `São proibidos grupos com conteúdos ilícitos, pirataria, golpes financeiros, vendas não autorizadas, violência ou incitação ao ódio.`
        },
        {
            question: `Quanto tempo demora para o anúncio entrar no ar após o pagamento?`,
            answer: `Assim que o pagamento for confirmado pelo sistema parceiro, a veiculação em destaque do grupo é ativada após a revisão e moderação prévia.`
        },
        {
            question: `O que acontece se o link de convite do meu grupo mudar durante a campanha?`,
            answer: `Você deve atualizar o link de convite através dos nossos canais de atendimento para garantir que os visitantes continuem entrando no seu grupo normalmente.`
        },
        {
            question: `Existe garantia de quantidade de membros novos no meu grupo?`,
            answer: `Garantimos a exibição priorizada do anúncio no site. No entanto, o número de novos membros depende do apelo do tema, nome e imagem do seu grupo para o público.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Termos para Anunciantes', url: '/termos-para-anunciantes' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});