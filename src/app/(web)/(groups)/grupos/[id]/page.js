import Layout from '@/layout';
import Faq from '@/components/Faq';
import Breadcrumbs from '@/components/Breadcrumbs';
import Groups from '@/components/Groups';
import Posts from '@/components/Posts';
import AsideCategories from '@/components/Aside/Categories';
import AsideGroups from '@/components/Aside/Groups';
import { getBoosts, getCategories, getPosts, getGroups } from "@/utils/database";
import { formatarData } from '@/utils';
import { cache } from 'react';
import styleSection from '@/styles/section';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const data = await dataCache(id);
    if (!data) {
        return;
    }
    return {
        title: data.seo.title,
        description: data.seo.description,
        image: data.seo.image,
    };
}

export default async function Page({ params }) {
    const { id } = await params;
    const data = await dataCache(id);

    if (!data) {
        notFound();
    }

    return (
        <Layout>

            <Breadcrumbs
                items={data.breadcrumb}
                title={data.name}
                description={data.description}
            />

            <div className={styleSection.w100}>
                <div className={styleSection.title}>
                    <h1><strong>{`Grupo de Telegram: ${data.name}`}</strong></h1>
                    <span>{`${data.category.name}   ●   Verificado em ${formatarData(data.data?.dates?.updated)}`}</span>
                </div>
            </div>

            <div className={styleSection.w70}>
                <div className={styleSection.block}>
                    <div className={styleSection.group}>
                        <figure>
                            <img src={`${process.env.NEXT_PUBLIC_IMG}${data.image}`} alt={data.name} />
                        </figure>
                        <div>
                            <h2>{data.name}</h2>
                            <p>{data.description}</p>
                            <a href={data.link} target="_blank" rel="noopener noreferrer">Entrar no Grupo</a>
                        </div>
                    </div>
                    <div className={styleSection.alert}>
                        <div>
                            <p>O conteúdo enviado ao nosso site é revisado manualmente com curadoria por nossos moderadores.</p>
                        </div>
                    </div>
                    <div className={styleSection.details}>
                        <h2>Regras do Grupo</h2>
                        <hr />
                        <div>
                            {data.rules?.map((item, i) => (
                                <div key={i}><span>{i + 1}</span><p>{item}</p></div>
                            ))}
                        </div>
                        <blockquote>Antes de acessar o grupo de Telegram {data.name}, esteja ciente que você precisa estar de acordo com todas as regras do grupo. É importante dizer também que este é um grupo independente, sem nenhuma relação com o nosso site e o único responsável por ele é o administrador do grupo. O {data.name} faz parte da categoria de {data.category.name}.</blockquote>
                    </div>
                    <div className={styleSection.details}>
                        <h2>Sobre os Grupos de {data.category.name} do Telegram</h2>
                        <hr />
                        <p>{data.category.about}</p>
                    </div>
                </div>

                <hr className={styleSection.break} />

                <div className={styleSection.block}>
                    <div className={styleSection.title}>
                        <h2><strong>{`Grupos Similares`}</strong></h2>
                        <span>{`Encontre outros grupos de ${data.category.name} que podem ser do seu interesse`}</span>
                    </div>
                    <Groups items={data.groups.items} />
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

export const dataCache = cache(async (id) => {
    const item = await getGroups({ id });
    if (!item) {
        return;
    }
    const [
        groups,
        boosts,
        categories,
        posts,
        category,
    ] = await Promise.all([
        getGroups({ limit: 12, adult: false, category: item.category }),
        getBoosts({ adult: false }),
        getCategories({ limit: 4 }),
        getPosts({ limit: 4 }),
        getCategories({ name: item.category }),
    ]);
    const groupName = item?.name || 'Grupo de Telegram';
    const categoryName = item?.category || 'Geral';
    const seo = {
        title: item?.seo?.title || `Grupo de Telegram: ${groupName} – Categoria ${categoryName}`,
        description: item?.seo?.description || item?.description || `Entre no grupo de Telegram "${groupName}". Acesse o link de convite oficial para participar da comunidade na categoria ${categoryName}.`,
        image: item?.image ? `${process.env.NEXT_PUBLIC_IMG}${item.image}` : null,
    };
    const faq = [
        {
            question: `Como entrar no grupo de Telegram "${groupName}"?`,
            answer: `Para entrar no grupo <strong>${groupName}</strong>, basta clicar no botão de acesso nesta página. Você será redirecionado para o link oficial de convite do Telegram para confirmar sua entrada pelo próprio aplicativo.`
        },
        {
            question: `O grupo "${groupName}" é gratuito?`,
            answer: `Sim, o acesso ao link do grupo <strong>${groupName}</strong> através do <strong>${process.env.NEXT_PUBLIC_NAME}</strong> é 100% gratuito.`
        },
        {
            question: `Qual é a categoria do grupo "${groupName}"?`,
            answer: `O grupo <strong>${groupName}</strong> faz parte da categoria <strong>${categoryName}</strong> em nossa plataforma.`
        },
        {
            question: `Os grupos da categoria ${categoryName} são verificados?`,
            answer: `Nosso sistema realiza verificações periódicas para manter links de convite ativos e funcionais. Caso identifique um link expirado no grupo <strong>${groupName}</strong>, você pode nos notificar.`
        },
        {
            question: `O ${process.env.NEXT_PUBLIC_NAME} é responsável por este grupo?`,
            answer: `Não. O grupo <strong>${groupName}</strong> é administrado de forma independente por seus criadores. O <strong>${process.env.NEXT_PUBLIC_NAME}</strong> funciona exclusivamente como um diretório de divulgação de links públicos.`
        },
    ];
    const breadcrumb = [
        { name: 'Início', url: '/' },
        { name: 'Grupos', url: '/grupos' },
        { name: groupName, url: `/grupos/${id}` },
    ];
    return { ...item, category, groups, seo, faq, breadcrumb, boosts, categories, posts };
});