import mongodb from '@/lib/mongoDB';

export const dynamic = 'force-dynamic';

export async function GET() {
	const texts = (await import(`@/sites/${process.env.NEXT_PUBLIC_SITE}/texts`)).default;

	const baseUrl = process.env.NEXT_PUBLIC_WEB;
	const currentDate = new Date().toISOString().split('T')[0];

	let pageUrls = [];
	let categoryUrls = [];
	let groupUrls = [];
	let postUrls = [];
	let themeUrls = [];

	if (process.env.DATABASE) {
		try {
			const client = await mongodb(process.env.DATABASE);
			const db = client.db();

			// Páginas
			const pages = await db
				.collection('pages')
				.find({ status: 'active' }, { projection: { slug: 1, type: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			pageUrls = pages.map((page) => {
				const dateVal = page.updatedAt || page.createdAt;
				const isHome = !page.slug || page.slug === '/';
				const loc = isHome ? `${baseUrl}` : `${baseUrl}/${page.slug.replace(/^\//, '')}`;
				const priority = isHome ? '1.0' : page.type === 'content' ? '0.8' : '0.4';
				const changefreq = page.type === 'content' ? 'daily' : 'monthly';

				return {
					loc,
					lastmod: dateVal ? new Date(dateVal).toISOString().split('T')[0] : currentDate,
					changefreq,
					priority,
				};
			});

			// Categorias
			const categories = await db
				.collection('categories')
				.find({ status: 'active' }, { projection: { slug: 1, updatedAt: 1 } })
				.toArray();

			categoryUrls = categories.map((cat) => ({
				loc: `${baseUrl}/${texts.categories.slug}/${cat.slug}`,
				lastmod: cat.updatedAt ? new Date(cat.updatedAt).toISOString().split('T')[0] : currentDate,
				changefreq: 'weekly',
				priority: '0.9',
			}));

			// Temas (themes)
			const themes = await db
				.collection('themes')
				.find({ status: 'active' }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			themeUrls = themes.map((item) => {
				const dateVal = item.updatedAt || item.createdAt;
				return {
					loc: `${baseUrl}/${item.slug.replace(/^\//, '')}`,
					lastmod: dateVal ? new Date(dateVal).toISOString().split('T')[0] : currentDate,
					changefreq: 'weekly',
					priority: '0.9',
				};
			});

			// Grupos
			const groups = await db
				.collection('groups')
				.find({ status: 'active' }, { projection: { id: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			groupUrls = groups.map((item) => {
				const dateVal = item.updatedAt || item.createdAt;
				return {
					loc: `${baseUrl}/${texts.groups.slug}/${item.id}`,
					lastmod: dateVal ? new Date(dateVal).toISOString().split('T')[0] : currentDate,
					changefreq: 'daily',
					priority: '0.6',
				};
			});

			// Artigos do Blog (posts)
			const posts = await db
				.collection('posts')
				.find({ status: 'active' }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			const postsList = posts.length > 0 ? posts : await db
				.collection('posts')
				.find({ status: 'active' }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			postUrls = postsList.map((item) => {
				const dateVal = item.updatedAt || item.createdAt;
				return {
					loc: `${baseUrl}/${texts.blog.slug}/${item.slug}`,
					lastmod: dateVal ? new Date(dateVal).toISOString().split('T')[0] : currentDate,
					changefreq: 'weekly',
					priority: '0.9',
				};
			});
		} catch (error) {
			console.error('Erro ao carregar dados do MongoDB para o sitemap:', error);
		}
	}

	const sitemapUrls = [
		...pageUrls,
		...categoryUrls,
		...themeUrls,
		...groupUrls,
		...postUrls,
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
			.map(
				(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
			)
			.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
