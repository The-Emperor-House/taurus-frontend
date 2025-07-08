import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              rememberMe: credentials.rememberMe === 'on',
            }),
          });

          const data = await res.json();

          if (res.ok && data.user) {
            return {
              ...data.user,
              token: data.token,
              tokenExpiresIn: data.expiresIn,
            };
          }

          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId;
        token.name = user.username;
        token.email = user.email;
        token.backendToken = user.token;
        token.tokenExpiresIn = user.tokenExpiresIn;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.backendToken = token.backendToken;
      session.tokenExpiresIn = token.tokenExpiresIn;
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  }
});

export { handler as GET, handler as POST };
