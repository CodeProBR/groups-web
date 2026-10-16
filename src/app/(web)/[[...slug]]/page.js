import { redirect, permanentRedirect } from "next/navigation";
import Home, { generateMetadata as metadataHome } from "@/routes/home";
import Institutional, { generateMetadata as metadataInstitutional } from "@/routes/institutional";
import Groups, { generateMetadata as metadataGroups } from "@/routes/groups";
import GroupsItem, { generateMetadata as metadataGroupsItem, dataCache as getGroupData } from "@/routes/groupsItem";
import Blog, { generateMetadata as metadataBlog } from "@/routes/blog";
import BlogItem, { generateMetadata as metadataBlogItem, dataCache as getBlogData } from "@/routes/blogItem";
import Categories, { generateMetadata as metadataCategories } from "@/routes/categories";
import CategoriesItem, { generateMetadata as metadataCategoriesItem, dataCache as getCategoryData } from "@/routes/categoriesItem";
import Guides, { generateMetadata as metadataGuides } from "@/routes/guides";
import GuidesItem, { generateMetadata as metadataGuidesItem, dataCache as getGuidesData } from "@/routes/guidesItem";
import NotFound, { generateMetadata as metadataNotFound } from "@/routes/notFound";
import { getRedirects } from "@/utils/database";

export async function generateMetadata({ params, searchParams }) {
    const { slug } = await params;

    // HOME
    if (!slug) {
        return metadataHome();
    }

    // INSTITUTIONAL
    if (
        slug[0] === 'sobre-nos' || slug[0] === 'about-us' || slug[0] === 'sobre-nosotros' ||
        slug[0] === 'termos-de-uso' || slug[0] === 'terms-of-use' || slug[0] === 'terminos-de-uso' ||
        slug[0] === 'termos-para-anunciantes' || slug[0] === 'terms-for-advertisers' || slug[0] === 'terminos-para-anunciantes' ||
        slug[0] === 'politica-de-conteudo' || slug[0] === 'content-policy' || slug[0] === 'politica-de-contenido' ||
        slug[0] === 'politica-de-privacidade' || slug[0] === 'privacy-policy' || slug[0] === 'politica-de-privacidad' ||
        slug[0] === 'politica-de-cookies' || slug[0] === 'cookie-policy' || slug[0] === 'politica-de-cookies' ||
        slug[0] === 'denuncias-e-remocao-de-conteudo' || slug[0] === 'reporting-and-content-removal' || slug[0] === 'denuncias-y-eliminacion-de-contenido' ||
        slug[0] === 'contato' || slug[0] === 'contact' || slug[0] === 'contacto'
    ) {
        return metadataInstitutional({ slug });
    }

    // GROUPS
    if (slug[0] === 'grupos' || slug[0] === 'groups' || slug[0] === 'grupos') {
        if (!slug[1]) {
            const { page, q } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            return metadataGroups({ slug, search: q, page: currentPage });
        } else {
            const group = await getGroupData(slug);
            if (group) {
                return metadataGroupsItem({ slug });
            }
        }
    }

    // BLOG
    if (slug[0] === 'blog') {
        if (!slug[1]) {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            return metadataBlog({ slug, page: currentPage });
        } else {
            const post = await getBlogData(slug);
            if (post) {
                return metadataBlogItem({ slug });
            }
        }
    }

    // CATEGORIES
    if (slug[0] === 'categorias' || slug[0] === 'categories' || slug[0] === 'categorias') {
        if (!slug[1]) {
            return metadataCategories({ slug });
        } else {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            const category = await getCategoryData(slug, currentPage);
            if (category) {
                return metadataCategoriesItem({ slug, page: currentPage });
            }
        }
    }

    // GUIDES
    if (slug[0] === 'guias' || slug[0] === 'guides' || slug[0] === 'guias') {
        if (!slug[1]) {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            return metadataGuides({ slug, page: currentPage });
        } else {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            const guide = await getGuidesData(slug, currentPage);
            if (guide) {
                return metadataGuidesItem({ slug, page: currentPage });
            }
        }
    }

    // REDIRECTS
    const fullPath = '/' + (Array.isArray(slug) ? slug.join('/') : (slug || ''));
    const redirectItem = await getRedirects({ url: fullPath });
    if (redirectItem) {
        return {};
    }

    // NOT FOUND
    return metadataNotFound({ slug });
}

export default async function Page({ params, searchParams }) {
    const { slug } = await params;

    // HOME
    if (!slug) {
        return <Home />
    }

    // INSTITUTIONAL
    if (
        slug[0] === 'sobre-nos' || slug[0] === 'about-us' || slug[0] === 'sobre-nosotros' ||
        slug[0] === 'termos-de-uso' || slug[0] === 'terms-of-use' || slug[0] === 'terminos-de-uso' ||
        slug[0] === 'termos-para-anunciantes' || slug[0] === 'terms-for-advertisers' || slug[0] === 'terminos-para-anunciantes' ||
        slug[0] === 'politica-de-conteudo' || slug[0] === 'content-policy' || slug[0] === 'politica-de-contenido' ||
        slug[0] === 'politica-de-privacidade' || slug[0] === 'privacy-policy' || slug[0] === 'politica-de-privacidad' ||
        slug[0] === 'politica-de-cookies' || slug[0] === 'cookie-policy' || slug[0] === 'politica-de-cookies' ||
        slug[0] === 'denuncias-e-remocao-de-conteudo' || slug[0] === 'reporting-and-content-removal' || slug[0] === 'denuncias-y-eliminacion-de-contenido' ||
        slug[0] === 'contato' || slug[0] === 'contact' || slug[0] === 'contacto'
    ) {
        return <Institutional slug={slug} />
    }

    // GROUPS
    if (slug[0] === 'grupos' || slug[0] === 'groups' || slug[0] === 'grupos') {
        if (!slug[1]) {
            const { page, q } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            return <Groups slug={slug} search={q} page={currentPage} />
        } else {
            const group = await getGroupData(slug);
            if (group) {
                return <GroupsItem slug={slug} />
            }
        }
    }

    // BLOG
    if (slug[0] === 'blog') {
        if (!slug[1]) {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            return <Blog slug={slug} page={currentPage} />
        } else {
            const post = await getBlogData(slug);
            if (post) {
                return <BlogItem slug={slug} />
            }
        }
    }

    // CATEGORIES
    if (slug[0] === 'categorias' || slug[0] === 'categories' || slug[0] === 'categorias') {
        if (!slug[1]) {
            return <Categories slug={slug} />
        } else {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            const category = await getCategoryData(slug, currentPage);
            if (category) {
                return <CategoriesItem slug={slug} page={currentPage} />
            }
        }
    }

    // GUIDES
    if (slug[0] === 'guias' || slug[0] === 'guides' || slug[0] === 'guias') {
        if (!slug[1]) {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            return <Guides slug={slug} page={currentPage} />
        } else {
            const { page } = (await searchParams) || {};
            const currentPage = parseInt(page) || 1;
            const guide = await getGuidesData(slug, currentPage);
            if (guide) {
                return <GuidesItem slug={slug} page={currentPage} />
            }
        }
    }

    // REDIRECTS
    const fullPath = '/' + (Array.isArray(slug) ? slug.join('/') : (slug || ''));
    const redirectItem = await getRedirects({ url: fullPath });
    if (redirectItem) {
        if (redirectItem.type === "301") {
            permanentRedirect(redirectItem.to);
        } else {
            redirect(redirectItem.to);
        }
    }

    // NOT FOUND
    return <NotFound slug={slug} />;

}