import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { writeFile } from "fs/promises";

const uploadDir = path.join(process.cwd(), "public/images/uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

// Recursive function to get all image files
function getImages(dir: string, fileList: any[] = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Exclude weird directories or node_modules if mistakenly there
            if (file !== 'node_modules' && file !== '.git') {
                getImages(filePath, fileList);
            }
        } else {
            if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file)) {
                // Get relative path from public
                const relativePath = filePath.split("public")[1];
                fileList.push({
                    name: file,
                    path: relativePath,
                    url: relativePath,
                });
            }
        }
    });
    return fileList;
}

export async function GET(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const publicDir = path.join(process.cwd(), "public/images");
        const images = getImages(publicDir);
        // Sort by name or date? Unsorted for now.
        return NextResponse.json(images);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${safeName}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/images/uploads/${fileName}`
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
