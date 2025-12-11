import type { Article } from '@/types';
import articlesData from '@/data/articles.json';

export const articles: Article[] = articlesData as Article[];

export function getAllArticles(): Promise<Article[]> {
  return Promise.resolve(articles);
}

export function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const article = articles.find((a) => a.slug === slug);
  return Promise.resolve(article);
}

export function getArticleById(id: string): Promise<Article | undefined> {
  const article = articles.find((a) => a.id === id);
  return Promise.resolve(article);
}

export function getFeaturedArticles(limit?: number): Promise<Article[]> {
  const featured = articles.filter((a) => a.featured);
  return Promise.resolve(limit ? featured.slice(0, limit) : featured);
}

export function getArticlesByIssue(issueId: string): Promise<Article[]> {
  const issueArticles = articles.filter((a) => a.issueId === issueId);
  return Promise.resolve(issueArticles);
}

export function getArticlesByAuthor(authorId: string): Promise<Article[]> {
  const authorArticles = articles.filter((a) => a.author.id === authorId);
  return Promise.resolve(authorArticles);
}

export function getArticlesByCategory(category: string): Promise<Article[]> {
  const categoryArticles = articles.filter((a) => a.category === category);
  return Promise.resolve(categoryArticles);
}

export function getRelatedArticles(article: Article, limit: number = 3): Promise<Article[]> {
  const related = articles
    .filter((a) => 
      a.id !== article.id && 
      (a.category === article.category || a.issueId === article.issueId)
    )
    .slice(0, limit);
  return Promise.resolve(related);
}

export function searchArticles(query: string): Promise<Article[]> {
  const lowercaseQuery = query.toLowerCase();
  const results = articles.filter((a) =>
    a.title.toLowerCase().includes(lowercaseQuery) ||
    a.excerpt.toLowerCase().includes(lowercaseQuery) ||
    a.author.name.toLowerCase().includes(lowercaseQuery) ||
    a.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
  return Promise.resolve(results);
}

export function getLatestArticles(limit: number = 5): Promise<Article[]> {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return Promise.resolve(sorted.slice(0, limit));
}

export function getAllCategories(): string[] {
  const categories = new Set(articles.map((a) => a.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set(articles.flatMap((a) => a.tags || []));
  return Array.from(tags);
}
