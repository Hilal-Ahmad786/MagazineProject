import type { Article } from '@/types';
import fs from 'fs';
import path from 'path';

const issuesDirectory = path.join(process.cwd(), 'src/data/issues');

const authorsDirectory = path.join(process.cwd(), 'src/data/authors');

function getAuthorsMap(): Map<string, Article['author']> {
  const authorMap = new Map<string, Article['author']>();

  if (fs.existsSync(authorsDirectory)) {
    const fileNames = fs.readdirSync(authorsDirectory);
    for (const fileName of fileNames) {
      if (fileName.endsWith('.json')) {
        try {
          const filePath = path.join(authorsDirectory, fileName);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const author = JSON.parse(fileContents);
          if (author.id) {
            authorMap.set(author.id, {
              id: author.id,
              name: author.name,
              slug: author.slug,
              avatar: author.avatar,
              role: author.role
            });
          }
        } catch (error) {
          console.error(`Error parsing author file ${fileName}:`, error);
        }
      }
    }
  }
  return authorMap;
}

function getArticles(): Article[] {
  if (!fs.existsSync(issuesDirectory)) {
    return [];
  }

  const authorMap = getAuthorsMap();
  const issueFolders = fs.readdirSync(issuesDirectory);
  const allArticles: Article[] = [];

  for (const folder of issueFolders) {
    const articlesPath = path.join(issuesDirectory, folder, 'articles.json');
    if (fs.existsSync(articlesPath)) {
      try {
        const fileContents = fs.readFileSync(articlesPath, 'utf8');
        const articles = JSON.parse(fileContents);

        // Hydrate articles with author data
        const hydratedArticles = articles.map((article: any) => {
          const author = authorMap.get(article.authorId);
          if (!author) {
            console.warn(`Author not found for article ${article.id} (authorId: ${article.authorId})`);
            // Provide a fallback or keep it undefined (though this might cause issues if not handled)
            // Ideally we should have a default author or ensure all authors exist
            return {
              ...article,
              author: {
                id: 'unknown',
                name: 'Unknown Author',
                slug: 'unknown',
                avatar: '/images/avatars/default.png',
                role: 'guest'
              }
            };
          }
          return {
            ...article,
            author
          };
        });

        allArticles.push(...hydratedArticles);
      } catch (error) {
        console.error(`Error parsing articles.json in ${folder}:`, error);
      }
    }
  }

  return allArticles;
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = getArticles();
  return Promise.resolve(articles);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);
  return Promise.resolve(article);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const articles = getArticles();
  const article = articles.find((a) => a.id === id);
  return Promise.resolve(article);
}

export async function getFeaturedArticles(limit?: number): Promise<Article[]> {
  const articles = getArticles();
  const featured = articles.filter((a) => a.featured);
  return Promise.resolve(limit ? featured.slice(0, limit) : featured);
}

export async function getArticlesByIssue(issueId: string): Promise<Article[]> {
  const articles = getArticles();
  const issueArticles = articles.filter((a) => a.issueId === issueId);
  return Promise.resolve(issueArticles);
}

export async function getArticlesByAuthor(authorId: string): Promise<Article[]> {
  const articles = getArticles();
  const authorArticles = articles.filter((a) => a.author.id === authorId);
  return Promise.resolve(authorArticles);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = getArticles();
  const categoryArticles = articles.filter((a) => a.category === category);
  return Promise.resolve(categoryArticles);
}

export async function getRelatedArticles(article: Article, limit: number = 3): Promise<Article[]> {
  const articles = getArticles();
  const related = articles
    .filter((a) =>
      a.id !== article.id &&
      (a.category === article.category || a.issueId === article.issueId)
    )
    .slice(0, limit);
  return Promise.resolve(related);
}

export async function searchArticles(query: string): Promise<Article[]> {
  const articles = getArticles();
  const lowercaseQuery = query.toLowerCase();
  const results = articles.filter((a) =>
    a.title.toLowerCase().includes(lowercaseQuery) ||
    a.excerpt.toLowerCase().includes(lowercaseQuery) ||
    a.author.name.toLowerCase().includes(lowercaseQuery) ||
    a.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
  return Promise.resolve(results);
}

export async function getLatestArticles(limit: number = 5): Promise<Article[]> {
  const articles = getArticles();
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return Promise.resolve(sorted.slice(0, limit));
}

export function getAllCategories(): string[] {
  const articles = getArticles();
  const categories = new Set(articles.map((a) => a.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const articles = getArticles();
  const tags = new Set(articles.flatMap((a) => a.tags || []));
  return Array.from(tags);
}

export async function getPublishedArticles(): Promise<Article[]> {
  const articles = getArticles();
  const published = articles.filter((a) => a.status === 'published');
  return Promise.resolve(published);
}
