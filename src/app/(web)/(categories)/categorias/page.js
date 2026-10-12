import Layout from '@/layout';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import Categories from '@/components/Categories';
import AsideGroups from '@/components/Aside/Groups';
import { getBoosts, getCategories, getPosts, getGroups } from "@/utils/database";
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

                {/* CATEGORIES */}
                <div className={styleSection.block}>
                    <Categories items={data.categories} />
                </div>

                <hr className={styleSection.break} />

                {/* GROUPS */}
                <div className={styleSection.block}>
                    <div className={styleSection.title}>
                        <h2><strong>{`Grupos do Telegram em Destaque`}</strong></h2>
                        <p>{`Confira alguns dos grupos e canais do Telegram mais populares e recém-adicionados. Escolha sua categoria favorita e participe de comunidades ativas e atualizadas.`}</p>
                    </div>
                    <Groups
                        items={data.groups.items}
                    />
                    <Link className={styleSection.link} href={'/grupos'}>{'ver todos os grupos'}</Link>
                </div>

            </div>
            <section className={styleSection.w30}>
                <div className={styleSection.block}>

                    {/* BOOSTS */}
                    <AsideGroups
                        title={'Grupos em Destaque'}
                        items={data.boosts}
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
                        <p>{`Tire suas dúvidas sobre como encontrar, entrar e divulgar links de grupos do Telegram por categoria na nossa plataforma.`}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>

        </Layout >
    );
}

export const dataCache = cache(async () => {
    const [
        groups,
        boosts,
        categories,
        posts,
    ] = await Promise.all([
        getGroups({ limit: 12, adult: false }),
        getBoosts({ adult: false }),
        getCategories(),
        getPosts({ limit: 4 }),
    ]);
    const title = `Categorias de Grupos do Telegram`;
    const description = `Explore nossa lista completa de categorias e encontre facilmente os grupos e canais do Telegram perfeitos para você. Navegue por temas como amizade, entretenimento, estudos, oportunidades de trabalho, figurinhas e muito mais. Conecte-se com pessoas de todo o Brasil!`;
    const seo = {
        title: `Categorias de Grupos do Telegram – Links Atualizados`,
        description: `Encontre grupos e canais do Telegram organizados por categorias. Descubra grupos de amizade, promoções, empregos, jogos, tecnologia, figurinhas e muito mais.`,
        image: null,
    };
    const faq = [
        {
            question: `Como escolher a melhor categoria para encontrar um grupo de Telegram?`,
            answer: `Navegue pela lista de categorias nesta página e escolha o tema do seu interesse, como <strong>Amizade</strong>, <strong>Estudos</strong>, <strong>Vagas de Emprego</strong>, <strong>Figurinhas</strong> ou <strong>Games</strong>. Ao clicar em uma categoria, você verá uma lista de grupos ativos e prontos para você entrar.`
        },
        {
            question: `Como entrar em um grupo do Telegram listado no site?`,
            answer: `Ao escolher uma categoria e encontrar o grupo desejado, basta clicar no botão de acesso. Você será redirecionado para o link de convite oficial do Telegram, onde poderá confirmar sua entrada no grupo pelo próprio aplicativo.`
        },
        {
            question: `O ${process.env.NEXT_PUBLIC_NAME} é gratuito?`,
            answer: `Sim, o <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é 100% gratuito. Você pode navegar pelas categorias, acessar links e entrar em qualquer grupo sem precisar pagar nada nem criar assinaturas.`
        },
        {
            question: `Como posso divulgar meu grupo do Telegram na categoria correta?`,
            answer: `Para cadastrar seu grupo, clique em "Enviar Grupo" ou "Cadastrar Grupo", preencha o nome, selecione a <strong>categoria adequada</strong>, insira uma descrição atrativa e cole o link de convite. Após o envio, seu grupo ficará disponível para milhares de interessados.`
        },
        {
            question: `Os grupos listados nas categorias são oficiais do Telegram?`,
            answer: `Não, os grupos listados <strong>não pertencem ao Telegram</strong> e não têm vínculo com o aplicativo oficial. Todos os grupos são criados e administrados por usuários independentes que optaram por divulgá-los em nossa plataforma.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Categorias', url: '/categorias' },
    ];
    return { title, description, groups, seo, faq, breadcrumb, boosts, categories, posts };
});