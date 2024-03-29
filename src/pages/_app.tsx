import '@/styles/globals.css';
import '@/styles/datepicker.css';
import type { AppProps } from 'next/app';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { jwtTokensVar, setLocalFromToken } from '@/stores/gqlReactVars';
import { useEffect } from 'react';
import { useRefreshMutation } from '@/types/generated/types';
import createApolloClient from '@/repository/ConfigApolloClient';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const client = createApolloClient();

const RefreshPreprocessor = ({ children }: { children: React.ReactNode }) => {
  const [refreshMutation] = useRefreshMutation();
  const { push } = useRouter();

  async function refreshSync() {
    try {
      const refresh = await refreshMutation();
      console.log('Refresh Finished!');
      if (refresh.data) setLocalFromToken(refresh.data);
    } catch (err) {
      console.log(err); // NO REFRESH: first startup message, so just ignore it
      push('/auth/login');
    }
  }

  useEffect(() => {
    refreshSync();
  }, []);

  return <>{children}</>;
};

const DynamicLayout = dynamic(() => import('@/components/Layout'), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  console.log('Front App is Launched!');
  return (
    <>
      <ApolloProvider client={client}>
        <RefreshPreprocessor>
          {pageProps.noLayout ? (
            <Component {...pageProps} />
          ) : (
            <>
              {jwtTokens.accessToken.length > 0 ? (
                <DynamicLayout>
                  <Component {...pageProps} />
                </DynamicLayout>
              ) : (
                <></>
              )}
            </>
          )}
        </RefreshPreprocessor>
      </ApolloProvider>
    </>
  );
}
