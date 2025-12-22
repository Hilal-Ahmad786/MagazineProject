import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        // Drop the existing constraint
        await prisma.$executeRawUnsafe(`ALTER TABLE authors DROP CONSTRAINT IF EXISTS authors_role_check;`);

        // Add the new constraint with 'writer' included
        await prisma.$executeRawUnsafe(`ALTER TABLE authors ADD CONSTRAINT authors_role_check CHECK (role IN ('founder', 'editor', 'guest', 'writer'));`);

        return NextResponse.json({ success: true, message: "Constraint updated successfully" });
    } catch (error: any) {
        console.error("Fix DB error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
