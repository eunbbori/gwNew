import { jwtTokensVar } from '@/stores/gqlReactVars';
import { useGetCodesLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

export const useCodes = (parent: string): Map<string, string> => {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: {
      parents: [parent],
    },
    onError: (err) => {
      alert('err');
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) {
      console.log('TToKKEEN: ' + jwtTokens?.accessToken);
      console.log('before getCodesQuery.....');
      getCodesQuery();
    }
  }, [jwtTokens]);

  const options = new Map();

  codeData?.codes &&
    codeData?.codes[0]?.codes?.forEach((c) => {
      options.set(c?.code, c?.name);
    });
  console.log('useCodes: ' + parent);
  return options;
};
