import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ฟังก์ชัน refresh access token
async function refreshAccessToken(token) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });
    const data = await res.json();

    if (res.ok && data.status === "success" && data.data?.accessToken) {
      return {
        ...token,
        backendToken: data.data.accessToken,
        tokenExpiresIn: data.data.accessTokenExpiresIn,
        refreshToken: data.data.refreshToken || token.refreshToken,
      };
    }
    return { ...token, error: "RefreshAccessTokenError" };
  } catch (err) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

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
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              rememberMe: credentials.rememberMe ? true : false,
            }),
          });

          const data = await res.json();

          if (res.ok && data.status === "success" && data.data?.user) {
            return {
              id: data.data.user.userId,
              name: data.data.user.name,
              email: data.data.user.email,
              role: data.data.user.role,
              avatarUrl: data.data.user.avatarUrl,
              backendToken: data.data.accessToken,
              tokenExpiresIn: data.data.accessTokenExpiresIn,
              refreshToken: data.data.refreshToken,
              accessTokenExpires: Date.now() + 2 * 60 * 60 * 1000, // 2 ชั่วโมง (หรือใช้ data.data.accessTokenExpiresIn)
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.avatarUrl = user.avatarUrl;
        token.backendToken = user.backendToken;
        token.tokenExpiresIn = user.tokenExpiresIn;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires || Date.now() + 2 * 60 * 60 * 1000;
      }

      // เช็ค access token หมดอายุหรือยัง
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        // ถ้าหมดอายุ ให้ refresh
        return await refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.avatarUrl = token.avatarUrl;
      session.backendToken = token.backendToken;
      session.tokenExpiresIn = token.tokenExpiresIn;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
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
