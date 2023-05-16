import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: '이메일,패스워드 방식',
      credentials: {
        email: { label: '이메일', type: 'email', placeholder: 'user@jnfirst.com' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials: any, req) {
        const user = { id: '1', name: '아이언맨', email: 'ironman@jnfirst.com' };

        if (credentials.email === 'ironman@jnfirst.com' && credentials.password === 'test') {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
});
