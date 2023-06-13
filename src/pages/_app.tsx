import '@/styles/globals.css';
import '@/styles/datepicker.css';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { setLocalFromToken } from '@/stores/gqlReactVars';
import { useEffect } from 'react';
import { useRefreshMutation } from '@/types/generated/types';
import createApolloClient from '@/repository/GraphqlConfig';

const client = createApolloClient();

const RefreshPreprocessor = () => {
  const [refreshMutation, { data, loading, error }] = useRefreshMutation();

  async function refreshSync() {
    try {
      const refresh = await refreshMutation();
      console.log('Refresh Finished!');
      if (refresh.data) setLocalFromToken(refresh.data);
    } catch (err) {
      console.log(err); // NO REFRESH: first startup message, so just ignore it
    }
  }

  useEffect(() => {
    refreshSync();
  }, []);

  return <></>;
};

export default function App({ Component, pageProps }: AppProps) {
  console.log('Front App is Launched!');
  return (
    <>
      <ApolloProvider client={client}>
        <RefreshPreprocessor />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
