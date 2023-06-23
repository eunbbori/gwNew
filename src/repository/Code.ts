import { jwtTokensVar } from '@/stores/gqlReactVars';
import { useGetCodesLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

const WorkingType = new Map([
  ['WORK', '출근'],
  ['FULL_DAYOFF', '연차'],
  ['HALF_DAYOFF', '반차'],
  ['SICK', '병가'],
  ['MILITARY', '훈련'],
]);

export const getWorkingTypeName = (cd: string | undefined | null) => (cd ? WorkingType.get(cd) : '');

export const usePositionCodes = (): Map<string, string> => {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: {
      parents: ['position'],
    },
    onError: (err) => {
      alert('err');
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) {
      console.log('TToKKEEN: ' + jwtTokens?.accessToken);
      getCodesQuery();
    }
  }, [jwtTokens]);

  const positionOptions = new Map();

  codeData?.codes &&
    codeData?.codes[0]?.codes?.forEach((c) => {
      positionOptions.set(c?.code, c?.name);
    });

  return positionOptions;
};
