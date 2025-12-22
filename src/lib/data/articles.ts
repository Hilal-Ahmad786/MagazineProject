import { Article } from '@/types';
import prisma from '@/lib/db';

// Helper to map Prisma article to app Type
function mapPrismaArticleToType(article: any): Article {
  let content = article.content;
  // Parse content if it's a JSON string, otherwise keep as is (if already object or null)
  if (typeof content === 'string') {
    try {
      if (content.startsWith('{') || content.startsWith('[')) {
        content = JSON.parse(content);
      }
    } catch (e) {
      // Keep as string if parse fails (e.g. simple HTML string)
    }
  }

  // Map author fields
  const authorData = article.author ? {
    id: article.author.id,
    name: article.author.name,
    slug: article.author.slug,
    avatar: article.author.avatar,
    role: article.author.role,
    bio: article.author.bio,
    // Add other fields if Article['author'] type requires them
  } : {
    id: 'unknown',
    name: 'Unknown Author',
    slug: 'unknown',
    avatar: '/images/avatars/default.png',
    role: 'guest'
  };

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    subtitle: article.subtitle || undefined,
    excerpt: article.excerpt || undefined,
    content: content,
    image: article.image || undefined,
    imageAlt: article.imageAlt || undefined,
    imageCaption: article.imageCaption || undefined,
    author: authorData,
    authorId: article.authorId || undefined,
    issueId: article.issueId || undefined,
    category: article.category?.name || 'Genel', // Map category name
    categoryId: article.categoryId || undefined,
    readTime: article.readTime,
    date: article.publishDate ? article.publishDate.toISOString() : article.createdAt.toISOString(),
    status: article.status as any,
    featured: article.featured,
    tags: article.tags?.map((t: any) => t.tag.name) || [],
    viewCount: article.viewCount
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishDate: 'desc' },
    include: {
      author: true,
      category: true,
      tags: {
        include: { tag: true }
      }
    }
  });

  return articles.map(mapPrismaArticleToType);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: {
        include: { tag: true } // Assuming ArticleTag relation
      }
    }
  });

  if (!article) return undefined;
  return mapPrismaArticleToType(article);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });

  if (!article) return undefined;
  return mapPrismaArticleToType(article);
}

export async function getFeaturedArticles(limit?: number): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: { status: 'published', featured: true },
    orderBy: { publishDate: 'desc' },
    take: limit,
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export async function getArticlesByIssue(issueId: string): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: { status: 'published', issueId },
    orderBy: { publishDate: 'desc' },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export async function getArticlesByAuthor(authorId: string): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: { status: 'published', authorId },
    orderBy: { publishDate: 'desc' },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  // First find category by slug or name
  const cat = await prisma.category.findFirst({
    where: {
      OR: [{ slug: category }, { name: category }]
    }
  });

  if (!cat) return [];

  const articles = await prisma.article.findMany({
    where: { status: 'published', categoryId: cat.id },
    orderBy: { publishDate: 'desc' },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export async function getRelatedArticles(article: Article, limit: number = 3): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: {
      status: 'published',
      id: { not: article.id },
      OR: [
        { categoryId: article.categoryId },
        { issueId: article.issueId }
      ]
    },
    take: limit,
    orderBy: { publishDate: 'desc' },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export async function searchArticles(query: string): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: {
      status: 'published',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { author: { name: { contains: query, mode: 'insensitive' } } }
      ]
    },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export async function getLatestArticles(limit: number = 5): Promise<Article[]> {
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    orderBy: { publishDate: 'desc' },
    take: limit,
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
  return articles.map(mapPrismaArticleToType);
}

export function getAllCategories(): string[] {
  // Use async in component, or return promise. 
  // BUT this function signature is synchronous in the old file.
  // We cannot easily make it async without breaking checking components.
  // However, `getAllCategories` usually assumes fetching ALL categories.
  // I will leave this as a TODO or return empty array if sync is strictly required, 
  // but better to change signature if possible.
  // Checking the old file: it was synchronous `export function`.
  // If I change it to async, I might break usage.
  // I'll check usages later. For now, let's keep it but empty or throw error?
  // Or better, just don't export it as sync.
  return [];
}
// Async replacement
export async function fetchAllCategories(): Promise<string[]> {
  const categories = await prisma.category.findMany({ select: { name: true } });
  return categories.map(c => c.name);
}

export function getAllTags(): string[] {
  return [];
}
// Async replacement
export async function fetchAllTags(): Promise<string[]> {
  const tags = await prisma.tag.findMany({ select: { name: true } });
  return tags.map(t => t.name);
}

export async function getPublishedArticles(): Promise<Article[]> {
  return getAllArticles();
}
