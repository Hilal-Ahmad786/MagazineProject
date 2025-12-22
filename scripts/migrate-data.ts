import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
import { config } from 'dotenv';

// Load env vars from .env.local
config({ path: '.env.local' });

// Helper to list all files in a directory recursively
async function getFiles(dir: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);
            return dirent.isDirectory() ? getFiles(res) : Promise.resolve([res]);
        })
    );
    return Array.prototype.concat(...files);
}

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), 'src', 'data');

async function main() {
    console.log('🚀 Starting data migration...\n');

    // 1. Migrate Authors
    console.log('📝 Migrating authors...');
    const authorsDir = path.join(DATA_DIR, 'authors');
    try {
        const authorFiles = await fs.readdir(authorsDir);
        const authorsData = [];

        for (const file of authorFiles) {
            if (!file.endsWith('.json')) continue;
            const content = await fs.readFile(path.join(authorsDir, file), 'utf-8');
            authorsData.push(JSON.parse(content));
        }

        for (const author of authorsData) {
            // Clean social links if they are arrays of strings, convert to proper JSON or object
            let social = author.social || {};

            await prisma.author.upsert({
                where: { slug: author.slug },
                update: {},
                create: {
                    slug: author.slug,
                    name: author.name,
                    email: author.email || null,
                    role: author.role || 'guest',
                    title: author.title || null,
                    avatar: author.avatar || null,
                    bio: author.bio || null,
                    social: social,
                    active: true,
                },
            });
        }
        console.log(`   ✓ Migrated ${authorsData.length} authors\n`);
    } catch (e) {
        console.warn('   ! Warning: Could not migrate authors or directory not found', e);
    }

    // 2. Migrate Issues
    console.log('📚 Migrating issues...');
    const issuesDir = path.join(DATA_DIR, 'issues');
    let issuesList = [];

    try {
        const issueDirs = await fs.readdir(issuesDir, { withFileTypes: true });

        for (const dirent of issueDirs) {
            if (!dirent.isDirectory()) continue;

            const issueJsonPath = path.join(issuesDir, dirent.name, 'issue.json');
            try {
                const content = await fs.readFile(issueJsonPath, 'utf-8');
                const issue = JSON.parse(content);
                issuesList.push({ ...issue, dirName: dirent.name });

                await prisma.issue.upsert({
                    where: { slug: issue.slug },
                    update: {},
                    create: {
                        number: issue.number || parseInt(issue.slug.split('-')[1]) || 0, // Fallback if number missing
                        title: issue.title,
                        theme: issue.theme || 'Genel',
                        subtitle: issue.subtitle || null,
                        slug: issue.slug,
                        coverImage: issue.coverImage || null,
                        publishDate: issue.date ? new Date(issue.date) : new Date(),
                        status: 'published',
                        editorsNote: issue.editorsNote || null,
                    },
                });
            } catch (err) {
                // ignore missing issue.json
            }
        }
        console.log(`   ✓ Migrated ${issuesList.length} issues\n`);

    } catch (e) {
        console.warn('   ! Warning: Could not migrate issues', e);
    }

    // 3. Migrate Articles
    console.log('📄 Migrating articles...');
    let articleCount = 0;

    // Get mappings for lookups
    const categoryMap = new Map((await prisma.category.findMany()).map(c => [c.name, c.id]));
    const authorMap = new Map((await prisma.author.findMany()).map(a => [a.slug, a.id]));
    const issueMap = new Map((await prisma.issue.findMany()).map(i => [i.slug, i.id]));

    for (const issue of issuesList) {
        const articlesJsonPath = path.join(issuesDir, issue.dirName, 'articles.json');
        try {
            const content = await fs.readFile(articlesJsonPath, 'utf-8');
            const articles = JSON.parse(content);

            const dbIssueId = issueMap.get(issue.slug);

            for (const article of articles) {
                // Resolve author
                let authorId = null;
                if (article.authorId) {
                    // If authorId is UUID (unlikely in old data) or slug
                }
                if (article.author?.slug) {
                    const found = authorMap.get(article.author.slug);
                    if (found) authorId = found;
                }

                // Fallback: try mapping from name manually if slug missing, or legacy authorId
                if (!authorId && article.authorId) {
                    // In current data, authorId is sometimes the slug or name-slug
                    const found = authorMap.get(article.authorId);
                    if (found) authorId = found;
                }

                const createdArticle = await prisma.article.upsert({
                    where: { slug: article.slug },
                    update: {
                        issueId: dbIssueId
                    },
                    create: {
                        slug: article.slug,
                        title: article.title,
                        subtitle: article.subtitle || null,
                        excerpt: article.excerpt || null,
                        content: article.content || null,
                        image: article.image || null,
                        authorId: authorId,
                        issueId: dbIssueId,
                        readTime: article.readTime || 5,
                        publishDate: issue.date ? new Date(issue.date) : new Date(),
                        status: 'published',
                    },
                });
                articleCount++;

                // Tags
                if (article.tags && article.tags.length > 0) {
                    for (const tagName of article.tags) {
                        const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
                        const tag = await prisma.tag.upsert({
                            where: { slug: tagSlug },
                            update: {},
                            create: { name: tagName, slug: tagSlug },
                        });

                        await prisma.articleTag.upsert({
                            where: { articleId_tagId: { articleId: createdArticle.id, tagId: tag.id } },
                            update: {},
                            create: { articleId: createdArticle.id, tagId: tag.id },
                        });
                    }
                }
            }
        } catch (e) {
            // ignore
        }
    }

    console.log(`   ✓ Migrated ${articleCount} articles\n`);
    console.log('✅ Migration complete!\n');
}

main()
    .catch((e) => {
        console.error('❌ Migration failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
