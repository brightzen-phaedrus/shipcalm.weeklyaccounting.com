import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import users from "./users.json";

type SeededUser = { email: string; passwordHash: string };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;
        const record = (users as SeededUser[]).find(
          (u) => u.email.toLowerCase() === email,
        );
        if (!record) return null;
        const ok = await bcrypt.compare(password, record.passwordHash);
        if (!ok) return null;
        return { id: record.email, email: record.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
});
