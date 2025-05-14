import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

// Extend the Session and User types to include accessToken and id
declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
    interface User {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                // Replace this with your own user lookup logic (e.g., database check)
                const user = { id: '1', name: credentials?.username };

                // Example: Accept any username/password where username === 'admin' and password === 'password'
                if (
                    credentials?.username === 'admin' &&
                    credentials?.password === 'password'
                ) {
                    return user;
                }
                // If login fails, return null
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt' as const, // Use JWT for session
    },
    pages: {
        signIn: '/signin', // Use your custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: import('next-auth').User | undefined }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }: { session: import('next-auth').Session; token: JWT }) {
            session.accessToken = token.accessToken as string | undefined;
            session.user = {
                ...session.user,
                id: typeof token.id === 'string' ? token.id : undefined,
                name: token.name,
            };
            return session;
        },
    },
};

export const {auth, handlers: {GET, POST}} = NextAuth(authOptions);
