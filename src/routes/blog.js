import Layout from '@/layout';
import { cache } from 'react';
import Faq from '@/components/Faq';
import Navigation from '@/components/Navigation';
import Posts from '@/components/Posts';
import Pagination from '@/components/Pagination';
import { getPages, getBoosts, getCategoriesFeatured, getPosts, getProducts } from "@/utils/database";
import style from '@site/styles/page.module.scss';
import AsideBoosts from '@/components/Aside/Boosts';
import AsideCategories from '@/components/Aside/Categories'
import metadata from "@/utils/metadata";
import CollectionPage from '@/components/Snippet/CollectionPage';
import ItemList from '@/components/Snippet/ItemList';
import Products from '@/components/Products';

export async function generateMetadata({ slug, page }) {
    const data = await dataCache(slug, page);
    return metadata({
        title: data.seo?.title,
        description: data.seo?.description,
        index: data.seo?.index,
        image: null,
        url: `/${slug[0]}`
    });
}

export default async function Page({ slug, page }) {
    const data = await dataCache(slug, page);
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    return (
        <Layout>

            <Navigation
                items={data.breadcrumb}
                title={data.title}
                description={data.description}
                texts={texts}
            />

            <div className={style.w100}>
                <div className={style.title}>
                    <h1><strong>{data.title}</strong></h1>
                    <p>{data.description}</p>
                </div>
            </div>

            <div className={style.w70}>

                {/* POSTS */}
                <div className={style.block}>
                    <Posts
                        items={data.posts.items} texts={texts}
                    />
                    <Pagination
                        page={data.posts.page}
                        totalPages={data.posts.totalPages}
                        baseUrl={`/${texts.blog.slug}`}
                        texts={texts}
                    />
                </div>

            </div>
            <section className={style.w30}>
                <div className={style.block}>

                    {/* BOOSTS */}
                    <AsideBoosts items={data.boosts} texts={texts} />

                    {/* CATEGORIES */}
                    <AsideCategories items={data.categoriesFeatured} texts={texts} />

                </div>
            </section>
            <hr className={style.break} />
            <div className={style.w100}>

                {/* PRODUCTS */}
                {data.products.length > 0 && (
                    <div className={style.block}>
                        <div className={style.title}>
                            <h2><strong>{texts.products.title}</strong></h2>
                            <p>{texts.products.description}</p>
                        </div>
                        <Products
                            items={data.products}
                            texts={texts}
                        />
                    </div>
                )}

                {data.products.length > 0 && <hr className={style.break} />}

                {/* FAQ */}
                <div className={style.block}>
                    <div className={style.title}>
                        <h2><strong>{texts.faq.title}</strong></h2>
                        <p>{texts.faq.description}</p>
                    </div>
                    <Faq items={data.faq} />
                </div>

            </div>

            <CollectionPage name={data.title} url={`/${slug[0]}`} description={data.description} />
            {data.posts?.items?.length > 0 && (
                <ItemList data={data.posts.items} name={data.title} type="blog" slug={slug[0]} />
            )}
        </Layout>
    );
}

export const dataCache = cache(async (slug, currentPage = 1) => {
    const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;
    const [
        page,
        boosts,
        categoriesFeatured,
        posts,
        products,
    ] = await Promise.all([
        getPages({ slug: slug[0] }),
        getBoosts({ adult: false }),
        getCategoriesFeatured(),
        getPosts({ limit: 12, page: currentPage }),
        getProducts(),
    ]);
    const breadcrumb = [
        { name: texts.home, url: '/' },
        { name: page.name, url: `/${slug[0]}` },
    ];
    return { ...page, breadcrumb, boosts, categoriesFeatured, posts, products };
});