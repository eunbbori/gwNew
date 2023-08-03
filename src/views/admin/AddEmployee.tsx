import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployeeInput, useAddEmployeeMutation } from '@/types/generated/types';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';
import Swal from 'sweetalert';
import { useRouteEmployeeList, IEmployeeFormValues, addSchema, handleUserIdDup } from './HandleEmployee';
import { useCheckUserIdDuplicationLazyQuery } from './../../types/generated/types';
import FormEmployee from './FormEmployee';

interface IAddEmployeeProps {
  deptId: string;
}

const AddEmployee = ({ deptId }: IAddEmployeeProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const methods = useForm<IEmployeeFormValues>({
    resolver: yupResolver(addSchema),
    defaultValues: { departmentId: deptId },
  });

  const currentUserId = methods.getValues('userId');

  const [checkUserIdDuplication, { data: userIdData, loading }] = useCheckUserIdDuplicationLazyQuery({
    variables: {
      userId: isChecking ? currentUserId || '' : '',
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  const [addEmployeeMutation] = useAddEmployeeMutation();

  const { routeEmployeeList } = useRouteEmployeeList();

  useEffect(() => {
    if (loading || !isChecking) return;

    handleUserIdDup({
      isChecking,
      setIsChecking,
      currentUserId,
      userIdData,
      setValue: methods.setValue,
      setFocus: methods.setFocus,
    });
  }, [isChecking, userIdData, loading]);

  const onAddEmployee = (inputData: IEmployeeFormValues) => {
    if (isChecking) {
      const { passwdConfirm: _, ...newInputData } = inputData;

      const input: IEmployeeInput = {
        ...newInputData,
        departmentId: parseInt(newInputData.departmentId),
        email: newInputData.email + '@jnfirst.co.kr',
      };
      addEmployeeMutation({
        variables: {
          input,
          file: uploadedFile,
        },
        onCompleted: (data) => {
          Swal('등록되었습니다', '', 'success').then((result) => {
            routeEmployeeList();
          });
        },
        onError: (err) => {
          Swal('ERROR', '', 'error');
        },
      });
    } else {
      Swal({ text: '아이디 중복 체크를 먼저 진행하세요.', icon: 'warning' });
    }
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <FormProvider {...methods}>
        <FormEmployee
          mode="REGISTER"
          submitHandler={onAddEmployee}
          setIsChecking={setIsChecking}
          setUploadedFile={setUploadedFile}
          checkUserIdDuplication={checkUserIdDuplication}
        />
      </FormProvider>
    </ErrorBoundary>
  );
};

export default AddEmployee;
