import '@/styles/globals.css';
import '@/styles/datepicker.css';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, useReactiveVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { jwtTokensVar } from '@/modules/gqlReactVars';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';

// const DynamicHeader = dynamic(() => import('../views/common/part/Menu2'), {
//   ssr: false,
// });
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BASE_API,
  // uri: 'http://localhost:4000',
  // uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = jwtTokensVar().accessToken;
  // return the headers to the contetxt so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    jwtTokensVar({
      accessToken: sessionStorage.getItem('accessToken') || '',
      refreshToken: sessionStorage.getItem('refreshToken') || '',
    });
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
