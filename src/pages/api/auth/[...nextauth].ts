import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: '이메일,패스워드 방식',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: '이메일', type: 'email', placeholder: 'user@email.com' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials: any, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'test user', email: 'testuser@email.com' };

        if (credentials.email === 'testuser@email.com' && credentials.password === 'test') {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error("error message") // Redirect to error page
          // throw "/path/to/redirect"        // Redirect to a URL
        }
      },
    }),
  ],
});
