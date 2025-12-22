import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";

const issuesDirectory = path.join(process.cwd(), "src/data/issues");

async function isAuthenticated() {
    const session = await getServerSession();
    return !!session;
}

export async function GET() {
    // if (!await isAuthenticated()) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    try {
        if (!fs.existsSync(issuesDirectory)) {
            return NextResponse.json([]);
        }

        const folders = fs.readdirSync(issuesDirectory);
        const issues = folders
            .map((folder) => {
                const filePath = path.join(issuesDirectory, folder, "issue.json");
                if (fs.existsSync(filePath)) {
                    const content = fs.readFileSync(filePath, "utf8");
                    return JSON.parse(content);
                }
                return null;
            })
            .filter((issue) => issue !== null)
            // Sort by Issue Number (descending)
            .sort((a, b) => (b.number || 0) - (a.number || 0));

        return NextResponse.json(issues);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch issues" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const slug = data.slug || `sayi-${data.number}`;
        const folderPath = path.join(issuesDirectory, slug);

        if (fs.existsSync(folderPath)) {
            return NextResponse.json({ error: "Issue with this slug already exists" }, { status: 400 });
        }

        // Create folder
        fs.mkdirSync(folderPath);

        // Create issue.json
        const issueData = {
            id: `issue_${String(data.number).padStart(3, '0')}`,
            slug,
            ...data,
            articles: [] // Initialize with empty articles
        };

        fs.writeFileSync(path.join(folderPath, "issue.json"), JSON.stringify(issueData, null, 2));

        // Create articles.json (empty list initially)
        fs.writeFileSync(path.join(folderPath, "articles.json"), JSON.stringify([], null, 2));

        return NextResponse.json(issueData);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
    }
}
