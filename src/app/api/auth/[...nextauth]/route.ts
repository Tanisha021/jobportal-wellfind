import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import client from "@/api/client";

interface User {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await client.post("/api/auth/auth/jwt/refresh/", {
      body: JSON.stringify({ refresh: token.refreshToken }),
      headers: { "Content-Type": "application/json" },
    });

    const refreshedTokens = await response.data;

    if (!(response.status == 200)) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires:
        jwtDecode<{ exp: number }>(refreshedTokens.access).exp * 1000,
      refreshToken: refreshedTokens.refresh ?? token.refreshToken,
    };
  } catch (error) {
    console.error("RefreshAccessTokenError:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Django Backend",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const res = await client.post("/api/auth/auth/jwt/create/", {
            username: credentials.username,
            password: credentials.password,
          });
          const data = await res.data;

          if (res.status === 200 && data.access) {
            return {
              id: data.user_id, // Assuming the API returns a user_id
              name: credentials.username,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
          }
          return null;
        } catch (e) {
          console.error("Authentication error:", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User).accessToken;
        token.refreshToken = (user as User).refreshToken;
        token.accessTokenExpires =
          jwtDecode<{ exp: number }>((user as User).accessToken).exp * 1000;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
