import mongodb from '@/lib/mongoDB';

export const dynamic = 'force-dynamic';

export async function GET() {
	const baseUrl = process.env.NEXT_PUBLIC_WEB;
	const currentDate = new Date().toISOString().split('T')[0];

	// Páginas Estáticas e Institucionais
	const staticPages = [
		{ loc: `${baseUrl}`, priority: '1.0', changefreq: 'daily' },
		{ loc: `${baseUrl}/grupos`, priority: '0.7', changefreq: 'daily' },
		{ loc: `${baseUrl}/categorias`, priority: '0.7', changefreq: 'daily' },
		{ loc: `${baseUrl}/blog`, priority: '0.7', changefreq: 'daily' },
		{ loc: `${baseUrl}/sobre-nos`, priority: '0.5', changefreq: 'monthly' },
		{ loc: `${baseUrl}/contato`, priority: '0.5', changefreq: 'monthly' },
		{ loc: `${baseUrl}/termos-de-uso`, priority: '0.3', changefreq: 'monthly' },
		{ loc: `${baseUrl}/termos-para-anunciantes`, priority: '0.3', changefreq: 'monthly' },
		{ loc: `${baseUrl}/politica-de-conteudo`, priority: '0.3', changefreq: 'monthly' },
		{ loc: `${baseUrl}/politica-de-privacidade`, priority: '0.3', changefreq: 'monthly' },
		{ loc: `${baseUrl}/politica-de-cookies`, priority: '0.3', changefreq: 'monthly' },
		{ loc: `${baseUrl}/denuncias-e-remocao-de-conteudo`, priority: '0.3', changefreq: 'monthly' },
	].map((page) => ({
		...page,
		lastmod: currentDate,
	}));

	let categoryUrls = [];
	let groupUrls = [];
	let articleUrls = [];

	if (process.env.DATABASE) {
		try {
			const client = await mongodb(process.env.DATABASE);
			const db = client.db();

			// Categorias
			const categories = await db
				.collection('categories')
				.find({ status: 'active' }, { projection: { slug: 1, updatedAt: 1 } })
				.toArray();

			categoryUrls = categories.map((cat) => ({
				loc: `${baseUrl}/categorias/${cat.slug}`,
				lastmod: cat.updatedAt ? new Date(cat.updatedAt).toISOString().split('T')[0] : currentDate,
				changefreq: 'weekly',
				priority: '0.8',
			}));

			// Grupos
			const groups = await db
				.collection('groups')
				.find({ status: 'active' }, { projection: { id: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			groupUrls = groups.map((item) => {
				const dateVal = item.updatedAt || item.createdAt;
				return {
					loc: `${baseUrl}/grupos/${item.id}`,
					lastmod: dateVal ? new Date(dateVal).toISOString().split('T')[0] : currentDate,
					changefreq: 'daily',
					priority: '0.6',
				};
			});

			// Artigos do Blog (articles)
			const articles = await db
				.collection('articles')
				.find({ status: 'active' }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
				.toArray();

			articleUrls = articles.map((item) => {
				const dateVal = item.updatedAt || item.createdAt;
				return {
					loc: `${baseUrl}/blog/${item.slug}`,
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
		...staticPages,
		...categoryUrls,
		...groupUrls,
		...articleUrls,
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
