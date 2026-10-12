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
                            Esta <strong>Política de Privacidade</strong> descreve como o <strong>{process.env.NEXT_PUBLIC_NAME}</strong> coleta, utiliza, armazena e protege os dados pessoais dos usuários que navegam por nossa plataforma e utilizam nossos serviços de consulta e cadastro de grupos e canais de Telegram.
                        </p>
                        <p>
                            Operamos em estrita conformidade com a legislação brasileira de proteção de dados, em especial a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong> e o Marco Civil da Internet (Lei nº 12.965/2014).
                        </p>

                        <h3>1. Coleta de Informações</h3>
                        <p>
                            Coletamos o mínimo de informações estritamente necessárias para a prestação dos nossos serviços de catálogo de grupos:
                        </p>
                        <ul>
                            <li>
                                <strong>Dados de Navegação Técnica:</strong> Coletamos automaticamente dados não identificáveis de acesso, como endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo de permanência e dados de diagnóstico para segurança e prevenção de ataques.
                            </li>
                            <li>
                                <strong>Dados de Cadastro de Grupos:</strong> Quando você cadastra um grupo de Telegram no site, coletamos o nome do grupo, categoria, descrição e o link de convite fornecido voluntariamente por você.
                            </li>
                            <li>
                                <strong>Dados de Contato e Suporte:</strong> Quando você nos envia uma mensagem através do formulário de contato ou e-mail, coletamos seu nome, e-mail e o conteúdo da mensagem para responder às suas solicitações.
                            </li>
                        </ul>

                        <h3>2. Uso das Informações</h3>
                        <p>
                            As informações coletadas são utilizadas exclusivamente para as seguintes finalidades:
                        </p>
                        <ul>
                            <li>Exibir e organizar o catálogo de grupos de Telegram nas categorias correspondentes.</li>
                            <li>Garantir a segurança da plataforma e prevenir fraudes, spams e acessos maliciosos.</li>
                            <li>Melhorar continuamente a usabilidade e o desempenho do site.</li>
                            <li>Responder a dúvidas, feedbacks ou solicitações enviadas ao suporte.</li>
                        </ul>

                        <h3>3. Cookies e Tecnologias de Medição</h3>
                        <p>
                            Utilizamos cookies e tecnologias de rastreamento para aprimorar a sua experiência de navegação:
                        </p>
                        <ul>
                            <li>
                                <strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site e salvamento de preferências do usuário.
                            </li>
                            <li>
                                <strong>Analytics (Google Analytics):</strong> Utilizados de forma anônima para mensurar o volume de acessos, entender as categorias mais procuradas e identificar falhas técnicas.
                            </li>
                            <li>
                                <strong>Publicidade (Google AdSense):</strong> O site pode exibir anúncios veiculados por parceiros como o Google AdSense. O Google utiliza cookies para veicular anúncios com base nas visitas anteriores dos usuários.
                            </li>
                        </ul>
                        <p>
                            Você pode optar por desativar os cookies de publicidade personalizada ajustando as configurações do seu navegador ou acessando a página de configurações de anúncios do Google.
                        </p>

                        <h3>4. Compartilhamento de Dados</h3>
                        <p>
                            O <strong>{process.env.NEXT_PUBLIC_NAME}</strong> <strong>não vende, aluga nem comercializa dados pessoais</strong> de usuários a terceiros. Os dados só poderão ser compartilhados em hipóteses estritas:
                        </p>
                        <ul>
                            <li>Com provedores de infraestrutura de tecnologia e hospedagem estritamente necessários para manter o site no ar.</li>
                            <li>Por determinação legal, ordem judicial ou solicitação de autoridades governamentais competentes.</li>
                        </ul>

                        <h3>5. Segurança da Informação</h3>
                        <p>
                            Adotamos medidas técnicas e organizacionais adequadas para proteger os dados armazenados contra acessos não autorizados, perdas ou alterações. Toda a comunicação com a nossa plataforma é criptografada através do protocolo <strong>HTTPS (SSL/TLS)</strong>.
                        </p>

                        <h3>6. Seus Direitos (LGPD)</h3>
                        <p>
                            Conforme a LGPD, você possui direito de solicitar a confirmação do tratamento, acesso aos seus dados pessoais, correção de dados incompletos ou desatualizados, bem como a exclusão de grupos ou mensagens enviadas sob sua responsabilidade. Para exercer seus direitos, entre em contato conosco pela página de <Link href="/contato">Contato</Link>.
                        </p>

                        <h3>7. Alterações nesta Política</h3>
                        <p>
                            Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias no site ou novas exigências legais. Incentivamos a consulta regular a esta página.
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
                        <p>{`Dúvidas sobre a nossa Política de Privacidade e tratamento de dados.`}</p>
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
    const title = `Política de Privacidade`;
    const description = `Conheça a Política de Privacidade do ${process.env.NEXT_PUBLIC_NAME}. Saiba como coletamos, utilizamos e protegemos seus dados em conformidade com a LGPD.`;
    const seo = {
        title: `Política de Privacidade – ${process.env.NEXT_PUBLIC_NAME} | Proteção de Dados e LGPD`,
        description: `Entenda como o ${process.env.NEXT_PUBLIC_NAME} cuida da sua privacidade. Saiba quais dados coletamos, o uso de cookies e os seus direitos sob a LGPD.`,
        image: null,
    };
    const faq = [
        {
            question: `Quais dados o ${process.env.NEXT_PUBLIC_NAME} coleta dos usuários?`,
            answer: `Coletamos apenas dados técnicos anônimos de navegação (como IP e navegador) para segurança e estatísticas, além dos dados fornecidos voluntariamente no cadastro de grupos ou formulários de contato.`
        },
        {
            question: `O site vende ou compartilha meus dados com terceiros?`,
            answer: `Não. O ${process.env.NEXT_PUBLIC_NAME} não vende, aluga nem comercializa nenhum dado pessoal de seus usuários.`
        },
        {
            question: `Como funcionam os cookies no site?`,
            answer: `Utilizamos cookies essenciais para o funcionamento do site, estatísticas anônimas de tráfego (Google Analytics) e exibição de anúncios de parceiros (Google AdSense).`
        },
        {
            question: `Como posso exercer meus direitos da LGPD ou solicitar exclusão de dados?`,
            answer: `Você pode enviar uma mensagem solicitando a confirmação, atualização ou remoção de dados através da nossa página de <a href="/contato">Contato</a>.`
        },
        {
            question: `O site armazena conversas trocadas dentro dos grupos de Telegram?`,
            answer: `Não. Nossa plataforma apenas exibe os links públicos de convite. Não temos nenhum acesso nem armazenamos mensagens ou conversas ocorridas no aplicativo Telegram.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Política de Privacidade', url: '/politica-de-privacidade' },
    ];
    return { title, description, seo, faq, breadcrumb, boosts, categories, posts };
});