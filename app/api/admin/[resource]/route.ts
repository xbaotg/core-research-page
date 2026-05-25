import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { RESOURCES, isResource } from "@/lib/resources";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cfg = RESOURCES[resource];
  const rows = await cfg.delegate.findMany({ orderBy: cfg.orderBy });
  return NextResponse.json(rows);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ resource: string }> }
) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cfg = RESOURCES[resource];
  const body = await req.json().catch(() => ({}));
  const data = cfg.parse(body);
  const created = await cfg.delegate.create({ data });
  return NextResponse.json(created, { status: 201 });
}
