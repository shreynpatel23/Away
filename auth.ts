import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import axios from "axios";

import type { NextAuthConfig, Session } from "next-auth";
import email from "next-auth/providers/email";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Google({
      clientId,
      clientSecret,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/calendar",
            // and more scope urls
          ].join(" "),
          response: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      return !!auth;
    },
    // callback when user will signin
    // to add user to database
    async signIn({ user, account, profile }) {
      //  if user's email and name exist
      if (user.email && user.name) {
        // get email and name from object
        try {
          // get first name and last name from full name
          const fullName = user.name.split(" ");
          const fisrtName = fullName[0];
          const lastName = fullName[1];

          // call the addUser api to save user
          const response = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/add-user`,
            {
              email: user.email,
              first_name: fisrtName,
              last_name: lastName,
            }
          );
        } catch (error) {
          console.error("Error while saving user to database:", error);

          // don't allow user to signin
          return false;
        }
      }

      // allow user to sign in
      return true;
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          access_token: account.access_token,
          issued_at: Date.now(),
          expires_at: Date.now() + Number(account.expires_in) * 1000, // 3600 seconds
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < Number(token.expires_at)) {
        return token;
      } else {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID as string, // Type assertion
              client_secret: process.env.AUTH_GOOGLE_SECRET as string, // Type assertion
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string, // Type assertion
            }),
            method: "POST",
          });

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Date.now() + Number(tokens.expires_in) * 1000,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }; // updated inside our session-token cookie
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }) {
      // This will be accessible in the client side using useSession hook
      // So becareful what you return here. Don't return sensitive data.
      // The auth() function should return jwt response but instead it returns
      // the session object. This is a bug in next-auth.
      // Follow this bug https://github.com/nextauthjs/next-auth/issues/9329
      return {
        ...session,
        accessToken: String(token.access_token),
        refreshToken: String(token.refresh_token),
        accessTokenIssuedAt: Number(token.issued_at),
        accessTokenExpiresAt: Number(token.expires_at),
      } satisfies EnrichedSession;
    },
  },
} satisfies NextAuthConfig;

export interface EnrichedSession extends Session {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  accessTokenIssuedAt: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);
