import { unstable_cache } from 'next/cache';
import mongodb, { ObjectId } from '@/lib/mongoDB';

export const getPages = unstable_cache(async ({ slug, limit } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    if (slug) {
        if (slug === '/') { slug = ''; }
        return await db.collection('pages').findOne({ slug, status: 'active' }, { projection: { name: 1, title: 1, slug: 1, description: 1, seo: 1, faq: 1, content: 1, _id: 0 } });
    } else {
        return await db.collection('pages').find({ status: 'active' }, { projection: { name: 1, title: 1, type: 1, slug: 1, _id: 0 }, ...(limit && { limit: limit }) }).sort({ order: 1 }).toArray();
    }
}, ['pages'], { revalidate: 86400, tags: ['pages'] });

export const getCategories = unstable_cache(async ({ slug, name, limit } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    if (slug || name) {
        return await db.collection('categories').findOne(
            { $or: [{ slug }, { slugs: slug }, { name }] },
            { projection: { name: 1, title: 1, slug: 1, badges: 1, slugs: 1, description: 1, seo: 1, faq: 1 } }
        );
    } else {
        return await db.collection('categories').find({ status: 'active' }, { projection: { name: 1, slug: 1, icon: 1, _id: 0 }, ...(limit && { limit: limit }) }).sort({ name: 1 }).toArray();
    }
}, ['categories'], { revalidate: 86400, tags: ['categories'] });

export const getGroups = unstable_cache(async ({ id, limit, page, adult = false, categoryId, q, tags } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    if (id) {
        const pipeline = [
            { $match: { id, status: 'active' } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryDoc'
                }
            },
            { $match: { 'categoryDoc.status': 'active' } },
            {
                $project: {
                    name: 1,
                    id: 1,
                    description: 1,
                    image: 1,
                    categoryId: 1,
                    category: { $arrayElemAt: ['$categoryDoc.name', 0] },
                    link: 1,
                    rules: 1,
                    updatedAt: 1,
                    _id: 0
                }
            }
        ];
        const res = await db.collection('groups').aggregate(pipeline).toArray();
        return res[0] || null;
    } else {
        const activeCategories = await db.collection('categories').find(
            { status: 'active' },
            { projection: { _id: 1 } }
        ).toArray();
        const activeCategoryIds = activeCategories.map(c => c._id);

        const andConditions = [];

        if (q) {
            const qRegex = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
            andConditions.push({ $or: [{ name: qRegex }, { description: qRegex }] });
        }

        const validTags = Array.isArray(tags) ? tags.filter(t => typeof t === 'string' && t.trim() !== '') : [];
        if (validTags.length > 0) {
            const tagsRegex = new RegExp(validTags.map(t => t.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');
            andConditions.push({
                $or: [
                    { name: tagsRegex },
                    { description: tagsRegex }
                ]
            });
        }

        const filter = {
            status: 'active',
            categoryId: { $in: activeCategoryIds },
            /*...(adult ? {} : blockContent()),*/
            ...(categoryId && ObjectId.isValid(categoryId) ? { categoryId: new ObjectId(categoryId) } : {}),
            ...(andConditions.length > 0 ? { $and: andConditions } : {})
        };
        const skip = (page - 1) * limit;
        const pipeline = [
            { $match: filter },
            { $sort: { score: -1, createdAt: -1 } },
            ...(skip ? [{ $skip: skip }] : []),
            ...(limit ? [{ $limit: limit }] : []),
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryDoc'
                }
            },
            {
                $project: {
                    name: 1,
                    id: 1,
                    description: 1,
                    image: 1,
                    categoryId: 1,
                    category: { $arrayElemAt: ['$categoryDoc.name', 0] },
                    _id: 0
                }
            }
        ];
        const [items, total] = await Promise.all([
            db.collection('groups').aggregate(pipeline).toArray(),
            db.collection('groups').countDocuments(filter)
        ]);
        return { items, total, page: page || 1, totalPages: limit ? Math.ceil(total / limit) : 1 };
    }
}, ['groups'], { revalidate: 86400, tags: ['groups'] });

export const getPosts = unstable_cache(async ({ slug, limit, page, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    if (slug) {
        return await db.collection('posts').findOne(
            { $or: [{ slug }, { slugs: slug }] },
            { projection: { title: 1, slug: 1, slugs: 1, description: 1, image: 1, category: 1, seo: 1, faq: 1, createdAt: 1, updatedAt: 1, readingTime: 1, author: 1, content: 1, _id: 0 } }
        );
    } else {
        const filter = {
            status: 'active',
            /*...(adult ? {} : blockContent()),*/
        };
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            db.collection('posts')
                .find(filter, {
                    projection: { title: 1, slug: 1, description: 1, image: 1, category: 1, createdAt: 1, updatedAt: 1, _id: 0 },
                    ...(limit && { limit }),
                    ...(skip && { skip }),
                })
                .sort({ createdAt: -1 })
                .toArray(),
            db.collection('posts').countDocuments(filter)
        ]);
        return { items, total, page: page || 1, totalPages: limit ? Math.ceil(total / limit) : 1 };
    }
}, ['posts'], { revalidate: 86400, tags: ['posts'] });

export const getGuides = unstable_cache(async ({ slug, limit, page, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    if (slug) {
        return await db.collection('guides').findOne(
            { $or: [{ slug }, { slugs: slug }] },
            { projection: { title: 1, slug: 1, slugs: 1, description: 1, image: 1, seo: 1, faq: 1, createdAt: 1, updatedAt: 1, content: 1, tags: 1, _id: 0 } }
        );
    } else {
        const filter = {
            status: 'active',
            /*...(adult ? {} : blockContent()),*/
        };
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            db.collection('guides')
                .find(filter, {
                    projection: { title: 1, slug: 1, description: 1, image: 1, createdAt: 1, _id: 0 },
                    ...(limit && { limit }),
                    ...(skip && { skip }),
                })
                .sort({ createdAt: -1 })
                .toArray(),
            db.collection('guides').countDocuments(filter)
        ]);
        return { items, total, page: page || 1, totalPages: limit ? Math.ceil(total / limit) : 1 };
    }
}, ['guides'], { revalidate: 86400, tags: ['guides'] });

export const getBoosts = unstable_cache(async ({ adult = false } = {}) => {
    return [];
    /*const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    const boosts = await db.collection('boosts').find({ endDate: { $gte: new Date() } }, { projection: { groupId: 1, _id: 1 } }).toArray();
    return (await db.collection('groups').aggregate([
        { $match: { status: 'active', ...(adult ? { category: 'Adulto' } : { category: { $ne: 'Adulto' } }), _id: { $in: boosts.map(e => e.groupId) } } },
        { $sample: { size: boosts.length } },
        { $project: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, createdAt: 1, updatedAt: 1, image: 1, _id: 1 } }
    ]).toArray()).map(e => {
        const boost = boosts.find(b => b.groupId.toString() === e._id.toString());
        const boostId = boost ? boost._id.toString() : null;
        const { _id, ...rest } = e;
        return { ...rest, boostId };
    });*/
}, ['boosts'], { revalidate: 86400, tags: ['boosts'] });

export const getRedirects = unstable_cache(async ({ url } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('redirects').findOne({ from: url, status: "active" }, { projection: { type: 1, to: 1, _id: 0 } });
}, ['redirects'], { revalidate: 86400, tags: ['redirects'] });






export const getCategoriesSection = unstable_cache(async () => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('categories').find({ status: 'active' }, { projection: { name: 1, slug: 1, icon: 1, 'description.short': 1, total: 1, _id: 0 }, limit: 10 }).sort({ name: 1 }).toArray();
}, ['categoriesSection'], { revalidate: 86400, tags: ['categoriesSection'] });


export const getLatestSection = unstable_cache(async ({ adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('groups').find({ status: 'active', ...(adult ? {} : blockContent()) }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1, _id: 0 }, limit: 10 }).sort({ createdAt: -1, verified: -1 }).toArray();
}, ['latestSection'], { revalidate: 86400, tags: ['latestSection'] });

export const getTrendingSection = unstable_cache(async ({ adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('groups').find({ status: 'active', ...(adult ? {} : blockContent()), name: { $regex: '^[a-zA-ZÀ-ÿ0-9\\s\\-&!#@°º]+$', $options: 'i' }, description: { $exists: true, $ne: "" } }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, createdAt: 1, updatedAt: 1, image: 1, _id: 0 }, limit: 10 }).sort({ 'score.value': -1 }).toArray();
}, ['trendingSection'], { revalidate: 86400, tags: ['trendingSection'] });

export const getWhatsappListing = unstable_cache(async ({ query = {}, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", platform: 'WhatsApp', ...(adult ? {} : blockContent()) };
    if (query.category) filter.category = query.category;
    if (query.verified === 'true') filter.verified = { $ne: null };
    let sort = { verified: -1, 'score.value': -1 };
    if (query.sort === 'recent') sort = { createdAt: -1, verified: -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['whatsappListing'], { revalidate: 86400, tags: ['whatsappListing'] });

export const getTelegramListing = unstable_cache(async ({ query = {}, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", platform: 'Telegram', ...(adult ? {} : blockContent()) };
    if (query.category) filter.category = query.category;
    if (query.verified === 'true') filter.verified = { $ne: null };
    let sort = { verified: -1, 'score.value': -1 };
    if (query.sort === 'recent') sort = { createdAt: -1, verified: -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['telegramListing'], { revalidate: 86400, tags: ['telegramListing'] });

export const getTrendingListing = unstable_cache(async ({ query = {}, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", ...(adult ? {} : blockContent()) };
    if (query.platform) filter.platform = query.platform;
    if (query.category) filter.category = query.category;
    if (query.verified === 'true') filter.verified = { $ne: null };
    let sort = { 'score.value': -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['trendingListing'], { revalidate: 86400, tags: ['trendingListing'] });

export const getLatestListing = unstable_cache(async ({ query = {}, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", ...(adult ? {} : blockContent()) };
    if (query.platform) filter.platform = query.platform;
    if (query.category) filter.category = query.category;
    if (query.verified === 'true') filter.verified = { $ne: null };
    let sort = { createdAt: -1, verified: -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['latestListing'], { revalidate: 86400, tags: ['latestListing'] });

export const getGroupsListing = unstable_cache(async ({ query = {}, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", ...(adult ? {} : blockContent()) };
    if (query.platform) filter.platform = query.platform;
    if (query.category) filter.category = query.category;
    if (query.verified === 'true') filter.verified = { $ne: null };
    if (query.q) filter['$or'] = [
        { name: { $regex: query.q, $options: 'i' } },
        { description: { $regex: query.q, $options: 'i' } }
    ];
    let sort = { verified: -1, 'score.value': -1 };
    if (query.sort === 'recent') sort = { createdAt: -1, verified: -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, updatedAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['groupsListing'], { revalidate: 86400, tags: ['groupsListing'] });

export const getSearchListing = unstable_cache(async ({ query = {}, adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", ...(adult ? {} : blockContent()) };
    if (query.q) filter.name = { $regex: query.q, $options: 'i' };
    if (query.platform) filter.platform = query.platform;
    if (query.category) filter.category = query.category;
    if (query.verified === 'true') filter.verified = { $ne: null };
    let sort = { verified: -1, 'score.value': -1 };
    if (query.sort === 'recent') sort = { createdAt: -1, verified: -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['searchListing'], { revalidate: 86400, tags: ['searchListing'] });

export const getCategoryListing = unstable_cache(async ({ query = {}, category } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    let filter = { status: "active", category: category };
    if (query.platform) filter.platform = query.platform;
    if (query.verified === 'true') filter.verified = { $ne: null };
    let sort = { verified: -1, 'score.value': -1 };
    if (query.sort === 'recent') sort = { date: -1, verified: -1 };
    const items = await db.collection('groups').find({ ...filter }, { projection: { name: 1, slug: 1, platform: 1, type: 1, category: 1, description: 1, image: 1, createdAt: 1, _id: 0 }, limit: query.limit, skip: ((query.page - 1) * query.limit) }).sort(sort).toArray();
    const total = await db.collection('groups').countDocuments({ ...filter });
    return { items, total };
}, ['categoryListing'], { revalidate: 86400, tags: ['categoryListing'] });

export const getArticleListing = unstable_cache(async () => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    const items = await db.collection('articles').find({ status: "active" }, { projection: { title: 1, slug: 1, platform: 1, theme: 1, summary: 1, image: 1, createdAt: 1, _id: 0 } }).sort({ createdAt: -1 }).toArray();
    const total = await db.collection('articles').countDocuments({ status: "active" });
    return { items, total };
}, ['articleListing'], { revalidate: 86400, tags: ['articleListing'] });

export const getCategory = unstable_cache(async ({ slug } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('categories').findOne({ slug, status: "active" }, { projection: { name: 1, slug: 1, groupContent: 1, about: 1, seo: 1, description: 1, benefits: 1, ageRange: 1, commonTopics: 1, audience: 1, icon: 1, faq: 1, _id: 0 } });
}, ['category'], { revalidate: 86400, tags: ['category'] });

export const getGroup = unstable_cache(async ({ slug, slugs } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('groups').findOne({ ...(slugs ? { slugs } : { slug }), status: { $in: ["active", "inactive"] } }, { projection: { name: 1, slug: 1, category: 1, image: 1, description: 1, verified: 1, type: 1, platform: 1, cover: 1, status: 1, updatedAt: 1, seo: 1, id: 1, rule: 1, author: 1, score: 1, link: { url: '$link.url', status: '$link.status' }, view: '0', click: '0', _id: 1 } });
}, ['group'], { revalidate: 86400, tags: ['group'] });

export const getUsers = unstable_cache(async ({ id } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('users').findOne({ id }, { projection: { name: 1, _id: 0 } });
}, ['users'], { revalidate: 86400, tags: ['users'] });

export const getArticle = unstable_cache(async ({ slug } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('articles').findOne({ slug }, { projection: { title: 1, slug: 1, platform: 1, theme: 1, summary: 1, image: 1, seo: 1, views: 1, content: 1, tags: 1, category: 1, author: 1, image: 1, readTime: 1, faq: 1, updatedAt: 1, createdAt: 1, score: 1, _id: 0 } });
}, ['article'], { revalidate: 86400, tags: ['article'] });

function blockContent() {
    const categories = ['Adulto', 'Apostas', 'LGBT'];
    const words = ['adulto', 'sexo', 'aposta', 'bet', 'cassino', 'punheta', 'vazado', 'nude', 'novinha', 'picante', 'iptv', 'casada',];
    const regex = words.map(word => ({ $or: [{ name: { $regex: word, $options: 'i' } }, { description: { $regex: word, $options: 'i' } }] }));
    return { $nor: regex, category: { $nin: categories } };
}