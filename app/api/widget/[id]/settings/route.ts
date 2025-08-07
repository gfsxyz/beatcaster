import { db } from "@/db";
import { users, widget_settings } from "@/db/schema";
import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth_options";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const widgetId = resolvedParams.id;

  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.widget_id, widgetId));

  const userId = user[0]?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await db
    .select()
    .from(widget_settings)
    .where(eq(widget_settings.userId, userId));

  return NextResponse.json(settings[0]);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  await db
    .update(widget_settings)
    .set(body)
    .where(eq(widget_settings.userId, session.user.id));

  return NextResponse.json({ message: "Settings updated" });
}
