
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // Try to find an existing application to update
        const app = await prisma.authorApplication.findFirst();
        if (!app) {
            console.log("No application found to test.");
            return;
        }

        console.log("Testing 'accepted' status...");
        try {
            await prisma.authorApplication.update({
                where: { id: app.id },
                data: { status: 'accepted' }
            });
            console.log("SUCCESS: 'accepted' is a valid status.");
        } catch (e) {
            console.log("FAILED: 'accepted' is NOT valid.");
        }

        console.log("Testing 'approved' status...");
        try {
            await prisma.authorApplication.update({
                where: { id: app.id },
                data: { status: 'approved' }
            });
            console.log("SUCCESS: 'approved' is a valid status.");
        } catch (e) {
            console.log("FAILED: 'approved' is NOT valid.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
