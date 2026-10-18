import { unstable_cache } from 'next/cache';
import mongodb, { ObjectId } from '@/lib/mongoDB';

async function getDb() {
    const client = await mongodb(process.env.DATABASE);
    return client.db();
}

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
                    category: {
                        id: '$categoryId',
                        name: { $arrayElemAt: ['$categoryDoc.name', 0] },
                        description: { $arrayElemAt: ['$categoryDoc.description', 0] },
                        slug: { $arrayElemAt: ['$categoryDoc.slug', 0] },
                    },
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
            {
                $addFields: {
                    isBoosted: {
                        $cond: [
                            {
                                $and: [
                                    { $ifNull: ['$boost', false] },
                                    { $gt: ['$boost', new Date()] }
                                ]
                            },
                            1,
                            0
                        ]
                    }
                }
            },
            { $sort: { isBoosted: -1, score: -1, createdAt: -1 } },
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
                    boost: 1,
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
        const pipeline = [
            { $match: { $or: [{ slug }, { slugs: slug }] } },
            {
                $lookup: {
                    from: 'authors',
                    localField: 'authorId',
                    foreignField: '_id',
                    as: 'authorDoc'
                }
            },
            {
                $project: {
                    title: 1,
                    slug: 1,
                    slugs: 1,
                    description: 1,
                    image: 1,
                    category: 1,
                    seo: 1,
                    faq: 1,
                    publishedAt: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    readingTime: 1,
                    author: { $arrayElemAt: ['$authorDoc', 0] },
                    content: 1,
                    _id: 0
                }
            }
        ];
        const res = await db.collection('posts').aggregate(pipeline).toArray();
        return res[0] || null;
    } else {
        const filter = {
            status: 'active',
            publishedAt: { $lte: new Date() },
            /*...(adult ? {} : blockContent()),*/
        };
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            db.collection('posts')
                .find(filter, {
                    projection: { title: 1, slug: 1, description: 1, image: 1, category: 1, publishedAt: 1, createdAt: 1, updatedAt: 1, _id: 0 },
                    ...(limit && { limit }),
                    ...(skip && { skip }),
                })
                .sort({ publishedAt: -1, createdAt: -1 })
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
            publishedAt: { $lte: new Date() },
            /*...(adult ? {} : blockContent()),*/
        };
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            db.collection('guides')
                .find(filter, {
                    projection: { title: 1, slug: 1, description: 1, image: 1, publishedAt: 1, createdAt: 1, _id: 0 },
                    ...(limit && { limit }),
                    ...(skip && { skip }),
                })
                .sort({ publishedAt: -1, createdAt: -1 })
                .toArray(),
            db.collection('guides').countDocuments(filter)
        ]);
        return { items, total, page: page || 1, totalPages: limit ? Math.ceil(total / limit) : 1 };
    }
}, ['guides'], { revalidate: 86400, tags: ['guides'] });

export const getBoosts = unstable_cache(async ({ adult = false } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    const filter = {
        status: 'active',
        boost: { $gt: new Date() },
    };
    return await db.collection('groups').aggregate([
        { $match: filter },
        { $sort: { boost: -1, score: -1, createdAt: -1 } },
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
                category: { $arrayElemAt: ['$categoryDoc.name', 0] },
                boost: 1,
                _id: 0
            }
        }
    ]).toArray();
}, ['boosts'], { revalidate: 86400, tags: ['boosts'] });

export const getRedirects = unstable_cache(async ({ url } = {}) => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('redirects').findOne({ from: url, status: "active" }, { projection: { type: 1, to: 1, _id: 0 } });
}, ['redirects'], { revalidate: 86400, tags: ['redirects'] });

export const getProducts = unstable_cache(async () => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    const products = await db.collection('products').find({ status: "active" }, { projection: { name: 1, image: 1, price: 1, discount: 1, installments: 1, shipping: 1, url: 1, store: 1, padding: 1 } }).toArray();
    return products.map(product => ({
        ...product,
        _id: product._id ? product._id.toString() : undefined
    }));
}, ['products'], { revalidate: 86400, tags: ['products'] });






// CATEGORIES

/*export const getCategories = unstable_cache(async ({ slug, name, limit } = {}) => {
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
}, ['categories'], { revalidate: 86400, tags: ['categories'] });*/

export const getCategoriesAll = unstable_cache(async () => {
    const client = await mongodb(process.env.DATABASE);
    const db = client.db();
    return await db.collection('categories').find({ status: 'active' }, { projection: { name: 1, slug: 1, icon: 1, groups: 1, _id: 0 } }).sort({ name: 1 }).toArray();
}, ['categoriesAll'], { revalidate: 86400, tags: ['categoriesAll', 'categories'] });

export const getCategoriesFeatured = async () => {
    return unstable_cache(
        async () => {
            const db = await getDb();
            return await db.collection('categories').find({ status: 'active' }, { projection: { name: 1, slug: 1, icon: 1, groups: 1, _id: 0 }, limit: 8 }).sort({ groups: -1 }).toArray();
        },
        ['categoriesFeatured'],
        { revalidate: 86400, tags: ['categoriesFeatured', 'categories'] }
    )();
};

export const getCategoriesItem = async ({ slug } = {}) => {
    return unstable_cache(
        async () => {
            const db = await getDb();
            return await db.collection('categories').findOne(
                { $or: [{ slug }, { slugs: slug }] },
                { projection: { name: 1, title: 1, slug: 1, badges: 1, slugs: 1, description: 1, seo: 1, faq: 1, groups: 1, _id: 1 } }
            );
        },
        ['categoriesItem', slug || 'default'],
        {
            revalidate: 86400,
            tags: slug ? [`category-${slug}`, 'categoriesItem', 'categories'] : ['categoriesItem', 'categories']
        }
    )();
};

