import prisma from '@/lib/db';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    articleCount: number;
}

export async function getAllCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { articles: true }
            }
        }
    });

    return categories.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description || undefined,
        color: category.color || 'from-neutral-700 to-neutral-800',
        articleCount: category._count.articles
    }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            _count: {
                select: { articles: true }
            }
        }
    });

    if (!category) return null;

    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description || undefined,
        color: category.color || 'from-neutral-700 to-neutral-800',
        articleCount: category._count.articles
    };
}
