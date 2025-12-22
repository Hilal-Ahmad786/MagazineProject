import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Try Environment Variables First (Fallback/Recovery)
                const envEmail = process.env.ADMIN_EMAIL;
                const envPassword = process.env.ADMIN_PASSWORD;

                if (envEmail && envPassword && credentials?.email === envEmail && credentials?.password === envPassword) {
                    // console.log("Authorized via Environment Variables");
                    return { id: "env-admin", name: "Super Admin (Env)", email: envEmail, role: "super_admin" };
                }

                // 2. Try Database
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    // Dynamic import to avoid build time issues if DB not ready
                    const { default: prisma } = await import("@/lib/db");

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user) return null;

                    // TODO: Use bcrypt.compare in production
                    // const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
                    const isValid = credentials.password === user.passwordHash;

                    if (isValid) {
                        return {
                            id: user.id,
                            name: user.name || "Admin",
                            email: user.email,
                            role: user.role
                        };
                    }
                } catch (error) {
                    console.error("Auth Error:", error);
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
        signOut: "/admin/signout",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
};
