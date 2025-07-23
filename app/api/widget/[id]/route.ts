import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Get the widget ID from the URL
    const resolvedParams = await context.params;
    const widgetId = resolvedParams.id;

    // Get user tokens from database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.widget_id, widgetId))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user || !user.spotify_access_token) {
      return NextResponse.json(
        { error: "Widget not found or no access token" },
        { status: 404 }
      );
    }

    // Get currently playing from Spotify
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${user.spotify_access_token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      // If token expired, we should implement token refresh here
      return NextResponse.json(
        { error: "Failed to fetch from Spotify" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[Widget Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
