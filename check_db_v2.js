
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const total = await prisma.article.count();
        const published = await prisma.article.count({ where: { status: 'published' } });
        const featured = await prisma.article.count({ where: { status: 'published', featured: true } });
        console.log(`Total Articles: ${total}`);
        console.log(`Published Articles: ${published}`);
        console.log(`Featured Articles: ${featured}`);

        if (published > 0) {
            const latest = await prisma.article.findFirst({
                where: { status: 'published' },
                orderBy: { publishDate: 'desc' },
                include: { author: true, category: true }
            });
            console.log('Latest published article:', latest ? latest.title : 'None');
            console.log('Has Image:', !!latest.image);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
