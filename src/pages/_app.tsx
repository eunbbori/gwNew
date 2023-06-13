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
  const [refreshMutation] = useRefreshMutation();

  async function refreshSync() {
    const data = await refreshMutation();
    console.log('Refresh Finished!');
    if (data.data) setLocalFromToken(data.data);
    else if (data.errors) console.log('App: ' + data.errors[0].message);
    else console.log('App: Something wrong happend!');
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
