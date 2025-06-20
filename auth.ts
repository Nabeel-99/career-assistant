import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";
import { LoginSchema } from "./lib/validation";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);
          const user = await prisma.user.findUnique({
            where: { email },
          });
          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return null;
          }
          console.log("user", user);
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
    Google,
    Github,
  ],
  callbacks: {
    async signIn({ user: { email, image, name } }) {
      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email,
              image,
              firstname: name?.split(" ")[0],
              lastname: name?.split(" ")[1],
              isUserNew: false,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        let dbUser = null;
        if (user.email) {
          dbUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
        }
        if (dbUser) {
          token.id = dbUser.id as string;
          token.email = dbUser.email as string;
          token.firstname = dbUser.firstname as string;
          token.lastname = dbUser.lastname as string;
          token.isUserNew = dbUser.isUserNew as boolean;
        }
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session.user, {
        id: token.id,
        firstname: token.firstname,
        lastname: token.lastname,
        email: token.email,
        isUserNew: token.isUserNew,
      });
      return session;
    },
  },
});
