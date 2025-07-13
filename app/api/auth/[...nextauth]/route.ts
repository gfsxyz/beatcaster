import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID!,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
