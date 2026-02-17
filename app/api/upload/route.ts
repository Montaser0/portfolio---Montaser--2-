import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as File | null;
    const projectId = (form.get("projectId") as string | null)?.trim() || null;
    if (!file) {
      return NextResponse.json({ error: "missing_file" }, { status: 400 });
    }

    const mime = file.type || "";
    const allowed = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];
    if (!allowed.includes(mime)) {
      return NextResponse.json({ error: "unsupported_type" }, { status: 415 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const extFromMime: Record<string, string> = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/avif": "avif",
    };

    const fileExt =
      extFromMime[mime] ||
      path.extname((file as any).name || "").replace(".", "").toLowerCase() ||
      "png";

    const hash = crypto.createHash("sha1").update(buffer).digest("hex").slice(0, 10);
    const time = Date.now();
    const filename = `project_${time}_${hash}.${fileExt}`;

    const projectsDir = path.join(process.cwd(), "public", "projects");
    await mkdir(projectsDir, { recursive: true });

    const outPath = path.join(projectsDir, filename);
    await writeFile(outPath, buffer);

    const url = `/projects/${filename}`;
    if (projectId) {
      try {
        const dataDir = path.join(process.cwd(), "data");
        await mkdir(dataDir, { recursive: true });
        const mapPath = path.join(dataDir, "project-images.json");
        let current: Record<string, string> = {};
        try {
          const raw = await readFile(mapPath, "utf8");
          current = JSON.parse(raw || "{}");
        } catch {}
        current[projectId] = url;
        await writeFile(mapPath, JSON.stringify(current, null, 2), "utf8");
      } catch {}
    }
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }
}
