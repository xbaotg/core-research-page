import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { RESOURCES, isResource } from "@/lib/resources";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource, id } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cfg = RESOURCES[resource];
  const body = await req.json().catch(() => ({}));
  const data = cfg.parse(body);
  const updated = await cfg.delegate.update({ where: { id: Number(id) }, data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource, id } = await params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const cfg = RESOURCES[resource];
  await cfg.delegate.delete({ where: { id: Number(id) } });
  return NextResponse.json({ ok: true });
}
