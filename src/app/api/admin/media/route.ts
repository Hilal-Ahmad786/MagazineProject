import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { writeFile } from "fs/promises";
import { put, list } from "@vercel/blob";

export const dynamic = 'force-dynamic';

const uploadDir = path.join(process.cwd(), "public/images/uploads");

// Ensure upload directory exists for local dev
if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
}

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

// Recursive function to get all image files (Local Dev)
function getImages(dir: string, fileList: any[] = []) {
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getImages(filePath, fileList);
            }
        } else {
            if (/\.(jpg|jpeg|png|webp|gif|svg|pdf)$/i.test(file)) {
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
        // Vercel Blob Storage (Production)
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const { blobs } = await list();
            const formattedBlobs = blobs.map(blob => ({
                name: blob.pathname,
                path: blob.url,
                url: blob.url
            }));
            return NextResponse.json(formattedBlobs);
        }

        // Local Filesystem (Development)
        const publicDir = path.join(process.cwd(), "public/images");
        const images = getImages(publicDir);
        return NextResponse.json(images);
    } catch (error) {
        console.error("Media fetch error:", error);
        return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
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

        const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${safeName}`;

        // Vercel Blob Storage (Production)
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(fileName, file, { access: 'public' });
            return NextResponse.json({
                success: true,
                url: blob.url,
                name: blob.pathname
            });
        }

        // Local Filesystem (Development)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: `/images/uploads/${fileName}`,
            name: fileName
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

