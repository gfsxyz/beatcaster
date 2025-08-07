import Spotify from "next-auth/providers/spotify";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users, widget_settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

import { JWT } from "next-auth/jwt";
import { Account, User, Session } from "next-auth";

export const authOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID!,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope:
            "user-read-email user-read-playback-state user-read-currently-playing",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User | null;
    }) {
      // Initial sign in
      if (account && user) {
        const checkUser = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id));

        if (!token.widgetId) {
          token.widgetId = checkUser[0]?.widget_id ?? crypto.randomUUID();
        }

        if (!checkUser[0]?.widget_id) {
          // update widget_id and tokens
          await db
            .update(users)
            .set({
              widget_id: token.widgetId as string,
              spotify_access_token: account.access_token,
              spotify_refresh_token: account.refresh_token,
            })
            .where(eq(users.id, user.id));

          await db.insert(widget_settings).values({
            id: crypto.randomUUID(),
            userId: user.id,
          });
        }
        return {
          ...token,
          widgetId: token.widgetId,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000,
        };
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        id: token.sub || "",
        widgetId: token.widgetId as string,
      };

      return session;
    },
  },
};
