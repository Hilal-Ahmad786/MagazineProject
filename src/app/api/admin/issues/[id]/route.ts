import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";

const issuesDirectory = path.join(process.cwd(), "src/data/issues");

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // Helper to find issue by ID
    const folders = fs.readdirSync(issuesDirectory);
    for (const folder of folders) {
        const filePath = path.join(issuesDirectory, folder, "issue.json");
        if (fs.existsSync(filePath)) {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (content.id === params.id) {
                return NextResponse.json(content);
            }
        }
    }
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();

        const folders = fs.readdirSync(issuesDirectory);
        let targetFolder = "";
        let currentData: any = {};

        for (const folder of folders) {
            const filePath = path.join(issuesDirectory, folder, "issue.json");
            if (fs.existsSync(filePath)) {
                const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (content.id === params.id) {
                    targetFolder = folder;
                    currentData = content;
                    break;
                }
            }
        }

        if (!targetFolder) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        const updatedIssue = { ...currentData, ...data };
        const folderPath = path.join(issuesDirectory, targetFolder);

        // Handle Slug Change (Rename folder)
        if (data.slug && data.slug !== currentData.slug) {
            const newFolderPath = path.join(issuesDirectory, data.slug);
            if (fs.existsSync(newFolderPath)) {
                return NextResponse.json({ error: "New slug already in use" }, { status: 400 });
            }

            fs.renameSync(folderPath, newFolderPath);
            fs.writeFileSync(path.join(newFolderPath, "issue.json"), JSON.stringify(updatedIssue, null, 2));
        } else {
            fs.writeFileSync(path.join(folderPath, "issue.json"), JSON.stringify(updatedIssue, null, 2));
        }

        return NextResponse.json(updatedIssue);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update issue" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const folders = fs.readdirSync(issuesDirectory);
        let targetFolder = "";

        for (const folder of folders) {
            const filePath = path.join(issuesDirectory, folder, "issue.json");
            if (fs.existsSync(filePath)) {
                const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                if (content.id === params.id) {
                    targetFolder = folder;
                    break;
                }
            }
        }

        if (!targetFolder) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }

        fs.rmSync(path.join(issuesDirectory, targetFolder), { recursive: true, force: true });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete issue" }, { status: 500 });
    }
}
