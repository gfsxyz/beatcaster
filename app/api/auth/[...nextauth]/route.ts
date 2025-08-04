import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

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
      token: any;
      account: any;
      user: any;
    }) {
      // Initial sign in
      if (account && user) {
        const checkUser = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id));
        console.log(checkUser);

        if (!token.widgetId) {
          token.widgetId = checkUser[0]?.widget_id ?? crypto.randomUUID();
        }

        if (!checkUser[0]?.widget_id) {
          // update widget_id and tokens
          await db
            .update(users)
            .set({
              widget_id: token.widgetId,
              spotify_access_token: account.access_token,
              spotify_refresh_token: account.refresh_token,
            })
            .where(eq(users.id, user.id));
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
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        widgetId: token.widgetId,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
