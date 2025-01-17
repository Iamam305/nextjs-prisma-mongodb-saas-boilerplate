import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma";

const providers: Provider[] = [
  Resend({
    apiKey: process.env.RESEND_KEY,
    from: process.env.RESEND_USER_EMAIL as string,
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
];
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: providers,
  debug: true,
  trustHost: true,
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return {
        ...session,
        user: { ...session.user, name: token.name, picture: token.picture },
      };
    },
    async jwt({ token, user, account, session, trigger }) {
      if (trigger === "update") {
        if (session?.name) {
          token.name = session.name;
        }
        if (session?.picture) {
          token.picture = session.picture;
        }
      }
      if (user) {
        token.sub = user.id;
        if (!token.name && account?.provider === "resend" && user.email) {
          token.name = user.email.split("@")[0];
        }
      }

      //  await prisma.user.update({
      //       where: { id: token.sub as string },
      //       data: { name: token.name as string, image: token.picture as string },
      //     });
      return token;
    },
  },
});
