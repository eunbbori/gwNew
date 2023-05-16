import '@/styles/globals.css';
import '@/styles/datepicker.css';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

const client = new ApolloClient({
  // uri: 'http://localhost:8080/graphql',
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
