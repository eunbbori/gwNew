import { jwtTokensVar } from '@/stores/gqlReactVars';
import { IGetCodesQuery, useGetAllDepartmentsLazyQuery, useGetCodesLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import Swal from 'sweetalert';

export const useDepartments = () => {
  const { push } = useRouter();
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getAllDepartmentsQuery, { data: deptData }] = useGetAllDepartmentsLazyQuery({
    onError: (err) => {
      Swal('미접속시간(30분)이 경과하여 로그아웃합니다.', '', 'error').then((result) => {
        push('/auth/login');
      });
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) getAllDepartmentsQuery();
  }, [jwtTokens]);

  return deptData;
};

export const useDepartmentsOption = (): { value: string; label: string }[] => {
  const data = useDepartments();

  return (
    (data?.departments &&
      data.departments?.map((dept) => ({
        value: String(dept?.departmentId ?? ''),
        label: dept?.departmentName ?? '',
      }))) ??
    []
  );
};

export const useCodes = (parent: string): IGetCodesQuery | undefined => {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: { parents: [parent] },
    onError: (err) => {
      Swal('미접속시간(30분)이 경과하여 로그아웃합니다.', '', 'error').then((result) => {
        router.push('/auth/login');
      });
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) getCodesQuery();
  }, [jwtTokens]);

  return codeData;
};

export const useCodesMap = (parent: string): Map<string, string> => {
  const data = useCodes(parent);

  const options = new Map();

  data?.codes &&
    data?.codes[0]?.codes?.forEach((c) => {
      options.set(c?.code, c?.name);
    });
  return options;
};

export const useCodesOption = (parent: string): { value: string; label: string }[] => {
  const data = useCodes(parent);

  return (
    (data?.codes &&
      data.codes[0]?.codes?.map((code) => ({
        value: code?.code ?? '',
        label: code?.name ?? '',
      }))) ??
    []
  );
};
