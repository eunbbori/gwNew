import { jwtTokensVar } from '@/stores/gqlReactVars';
import { IGetCodesQuery, useGetAllDepartmentsLazyQuery, useGetCodesLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import Swal from 'sweetalert';

export const useDepartments = () => {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getAllDepartmentsQuery, { data: deptData }] = useGetAllDepartmentsLazyQuery({
    onError: (err) => {
      Swal('ERROR', '', 'error');
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
        value: dept?.departmentId ?? '',
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
      Swal('ERROR', '', 'error');
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
