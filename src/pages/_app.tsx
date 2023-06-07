import '@/styles/globals.css';
import '@/styles/datepicker.css';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split, useReactiveVar } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@Apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { jwtTokensVar } from '@/stores/gqlReactVars';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BASE_API,
  credentials: 'include',
  // uri: 'http://localhost:4000',
  // uri: 'http://localhost:8080/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/subscription',
  }),
);

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

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
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
