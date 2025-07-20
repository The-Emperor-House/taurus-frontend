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
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              rememberMe: credentials.rememberMe === "on",
            }),
          });

          const data = await res.json();
          console.log("👉 API response:", data);

          if (res.ok && data.status === "success" && data.data?.user) {
            return {
              id: data.data.user.userId,
              name: data.data.user.name,
              email: data.data.user.email,
              avatarUrl: data.data.user.avatarUrl,
              backendToken: data.data.token,
              tokenExpiresIn: data.data.tokenExpiresIn,
            };
          }

          console.warn("❌ Login failed, API responded:", res.status, data.message);
          return null;
        } catch (error) {
          console.error("🔥 authorize() error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatarUrl = user.avatarUrl;
        token.backendToken = user.backendToken;  // ✅ ใส่ backend token ลง jwt
        token.tokenExpiresIn = user.tokenExpiresIn;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.avatarUrl = token.avatarUrl;
      session.backendToken = token.backendToken;  // ✅ ให้ session เอาไปใช้เรียก API
      session.tokenExpiresIn = token.tokenExpiresIn;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
