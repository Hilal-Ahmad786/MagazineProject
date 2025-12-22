const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');
const { config } = require('dotenv');

// Load env vars from .env.local
config({ path: '.env.local' });

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: (process.env.DIRECT_URL || process.env.DATABASE_URL) + ((process.env.DIRECT_URL || process.env.DATABASE_URL).includes('?') ? '&pgbouncer=true' : '?pgbouncer=true')
        },
    },
    log: ['info', 'warn', 'error'],
});

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}

async function main() {
    console.log('🚀 Starting data migration (JS Mode)...');

    // Test Connection
    try {
        await prisma.$connect();
        console.log('✅ Connected to database successfully.');
    } catch (e) {
        console.error('❌ Failed to connect to database:', e);
        process.exit(1);
    }

    // 1. Migrate Authors
    console.log('\n📝 Migrating authors...');
    try {
        const authorsDir = path.join(process.cwd(), 'src/data/authors');
        const authorFiles = await getFiles(authorsDir);

        for (const file of authorFiles) {
            if (path.extname(file) === '.json') {
                const data = JSON.parse(await fs.readFile(file, 'utf-8'));
                // Adapting fields
                const social = data.social || {};

                await prisma.author.upsert({
                    where: { slug: data.slug || data.id },
                    update: {
                        name: data.name,
                        role: data.role || 'Yazar',
                        title: data.title,
                        avatar: data.avatar,
                        bio: data.bio,
                        social: social,
                        active: true
                    },
                    create: {
                        slug: data.slug || data.id,
                        name: data.name,
                        role: data.role || 'Yazar', // Default role if missing
                        title: data.title,
                        avatar: data.avatar,
                        bio: data.bio,
                        social: social,
                        active: true
                    }
                });
                console.log(`   - Synced author: ${data.name}`);
            }
        }
    } catch (e) {
        console.error('   ! Warning: Authors migration issue:', e.message);
    }

    // 2. Migrate Issues
    console.log('\n📚 Migrating issues...');
    try {
        const issuesDir = path.join(process.cwd(), 'src/data/issues');
        const issueDirs = await fs.readdir(issuesDir, { withFileTypes: true });

        for (const dir of issueDirs) {
            if (dir.isDirectory()) {
                const issueJsonPath = path.join(issuesDir, dir.name, 'issue.json');
                try {
                    const issueData = JSON.parse(await fs.readFile(issueJsonPath, 'utf-8'));

                    // Upsert Issue
                    const issue = await prisma.issue.upsert({
                        where: { number: parseInt(issueData.number) },
                        update: {
                            title: issueData.title,
                            theme: issueData.theme || 'Genel', // Default theme
                            publishMonth: issueData.date ? new Date(issueData.date).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }) : 'Bilinmiyor',
                            coverImage: issueData.coverImage,
                            pdfUrl: issueData.pdfUrl,
                            status: 'published',
                            publishDate: issueData.date ? new Date(issueData.date) : new Date(),
                            slug: `sayi-${issueData.number}`
                        },
                        create: {
                            number: parseInt(issueData.number),
                            title: issueData.title,
                            theme: issueData.theme || 'Genel',
                            publishMonth: issueData.date ? new Date(issueData.date).toLocaleString('tr-TR', { month: 'long', year: 'numeric' }) : 'Bilinmiyor',
                            coverImage: issueData.coverImage,
                            pdfUrl: issueData.pdfUrl,
                            status: 'published',
                            publishDate: issueData.date ? new Date(issueData.date) : new Date(),
                            slug: `sayi-${issueData.number}`
                        }
                    });
                    console.log(`   - Synced issue: ${issue.number}`);

                    // 3. Migrate Articles for this Issue
                    const articlesJsonPath = path.join(issuesDir, dir.name, 'articles.json');
                    try {
                        const articlesData = JSON.parse(await fs.readFile(articlesJsonPath, 'utf-8'));

                        for (const articleData of articlesData) {
                            // Find Author
                            let authorId = null;
                            if (articleData.authorId) {
                                // Check if authorI looks like a UUID
                                const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(articleData.authorId);

                                const whereClause = isUUID
                                    ? { id: articleData.authorId }
                                    : { slug: articleData.authorId };

                                const author = await prisma.author.findFirst({
                                    where: whereClause
                                });
                                authorId = author ? author.id : null;
                            }

                            // Stringify content if it's an object/array (Rich Text)
                            let contentToSave = articleData.content;
                            if (typeof articleData.content === 'object' && articleData.content !== null) {
                                contentToSave = JSON.stringify(articleData.content);
                            }

                            await prisma.article.upsert({
                                where: { slug: articleData.slug || articleData.id },
                                update: {
                                    title: articleData.title,
                                    subtitle: articleData.subtitle,
                                    excerpt: articleData.excerpt,
                                    content: contentToSave,
                                    image: articleData.image,
                                    issueId: issue.id,
                                    authorId: authorId,
                                    status: 'published',
                                    categoryId: null // Category logic skipped for now
                                },
                                create: {
                                    slug: articleData.slug || articleData.id,
                                    title: articleData.title,
                                    subtitle: articleData.subtitle,
                                    excerpt: articleData.excerpt,
                                    content: contentToSave,
                                    image: articleData.image,
                                    issueId: issue.id,
                                    authorId: authorId,
                                    status: 'published'
                                }
                            });
                        }
                        console.log(`     - Synced ${articlesData.length} articles for issue ${issue.number}`);

                    } catch (e) {
                        // File might not exist
                    }

                } catch (e) {
                    // issue.json might not exist
                }
            }
        }
    } catch (e) {
        console.error('   ! Warning: Issues migration issue:', e.message);
    }

    await prisma.$disconnect();
    console.log('\n✅ Migration completed.');
}

main();
