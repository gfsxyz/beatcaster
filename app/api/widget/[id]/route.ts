import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import "dotenv/config";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

async function refreshAccessToken(refreshToken: string) {
  // Get credentials from environment variables
  const client_id = process.env.AUTH_SPOTIFY_ID!;
  const client_secret = process.env.AUTH_SPOTIFY_SECRET!;

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    // THIS IS THE MOST IMPORTANT PART: Log the full error from Spotify
    const errorDetails = await response.json();
    console.error("Failed to refresh Spotify token:", errorDetails);
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await context.params;
    const widgetId = resolvedParams.id;

    // 1. Get user data from the database
    const user = await db
      .select()
      .from(users)
      .where(eq(users.widget_id, widgetId))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user || !user.spotify_access_token || !user.spotify_refresh_token) {
      return NextResponse.json(
        { error: "Widget not found or user credentials missing" },
        { status: 404 }
      );
    }

    let accessToken = user.spotify_access_token;

    // 2. Try to fetch 'currently playing' data from Spotify
    let response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    // 3. If the token is expired (401), refresh it
    if (response.status === 401) {
      console.log("Access token expired. Attempting to refresh...");

      const newAccessToken = await refreshAccessToken(
        user.spotify_refresh_token
      );

      if (!newAccessToken) {
        return NextResponse.json(
          { error: "Could not refresh access token" },
          { status: 500 }
        );
      }

      accessToken = newAccessToken;

      // 4. Save the new access token to the database
      await db
        .update(users)
        .set({ spotify_access_token: newAccessToken })
        .where(eq(users.widget_id, widgetId));

      console.log("Access token refreshed and updated in DB.");

      // 5. Retry the request to Spotify with the new token
      response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      });
    }

    // If the response is still not OK after retry, or if it's another error
    if (!response.ok) {
      // A 204 status means no song is playing, which is not an error
      if (response.status === 204) {
        return NextResponse.json(null, { status: 200 }); // Return null to let the frontend know
      }
      const errorText = await response.text();
      console.error("Failed to fetch from Spotify:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch from Spotify" },
        { status: response.status }
      );
    }

    // A 204 (No Content) status means no music is currently playing
    if (response.status === 204) {
      return NextResponse.json(null, { status: 200 });
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
