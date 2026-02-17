import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mapPath = path.join(process.cwd(), "data", "project-images.json");
    const raw = await readFile(mapPath, "utf8").catch(() => "{}");
    const json = JSON.parse(raw || "{}");
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}
