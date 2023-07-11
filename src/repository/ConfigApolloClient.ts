import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@Apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';

import { jwtTokensVar } from '@/stores/gqlReactVars';

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_BASE_API,
  credentials: 'include',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/subscription',
  }),
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = jwtTokensVar()?.accessToken;
  // return the headers to the contetxt so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Apollo-Require-Preflight': 'true',
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

const createApolloClient = () => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
