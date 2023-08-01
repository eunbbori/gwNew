import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployeeInput, useCheckUserIdDuplicationLazyQuery, useModEmployeeMutation } from '@/types/generated/types';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';
import Swal from 'sweetalert';
import { useHandleEmployee, IEmployeeEditFormValues, editSchema, handleUserIdDup } from './HandleEmployee';
import FormEmployee from './FormEmployee';

interface IEditEmployee {
  detailEmpId: number;
  detailUserData: any;
}

const EditEmployee = (props: IEditEmployee) => {
  const [imgFile, setImgFile]: any = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const userIdRef = useRef<HTMLInputElement>(null);

  const methods = useForm<IEmployeeEditFormValues>({
    resolver: yupResolver(editSchema),
    defaultValues: {
      userId: props.detailUserData?.employee?.userId,
      name: props.detailUserData?.employee?.name,
      email: props.detailUserData?.employee?.email.split('@')[0],
      departmentId: props.detailUserData?.employee?.department?.departmentId,
      contractType: props.detailUserData?.employee?.contractType,
      phone: props.detailUserData?.employee?.phone,
      position: props.detailUserData?.employee?.position,
    },
  });

  const prevUserId = props.detailUserData?.employee?.userId;

  const [checkUserIdDuplication, { data: userIdData, loading }] = useCheckUserIdDuplicationLazyQuery({
    variables: {
      userId: methods.getValues('userId') || '',
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  const [modEmployeeMutation] = useModEmployeeMutation();

  const { uploadedFile, routeEmployeeList } = useHandleEmployee();

  useEffect(() => {
    if (props.detailUserData?.employee?.photoUrl) {
      setImgFile(`${process.env.NEXT_PUBLIC_BASE_PROFILE_API}/${props.detailUserData.employee.photoUrl}`);
    }
  }, [props.detailUserData]);

  useEffect(() => {
    if (loading) return;

    if (prevUserId === methods.getValues('userId')) setIsChecking(false);
    else handleUserIdDup({ isChecking, setIsChecking, currentUserId: methods.getValues('userId'), userIdRef, userIdData, setValue: methods.setValue });
  }, [isChecking, userIdData, loading]);

  const onModEmployee = (inputData: IEmployeeEditFormValues) => {
    if (isChecking || prevUserId === methods.getValues('userId')) {
      const { ...newInputData } = inputData;

      const input: IEmployeeInput = {
        ...newInputData,
        departmentId: parseInt(newInputData.departmentId),
        email: newInputData.email + '@jnfirst.co.kr',
      };
      modEmployeeMutation({
        variables: {
          employeeId: props.detailEmpId,
          input,
          file: uploadedFile,
        },
        onCompleted: (data) => {
          Swal('수정되었습니다', '', 'success').then((result) => {
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
          mode="MODIFY"
          submitHandler={onModEmployee}
          setIsChecking={setIsChecking}
          userIdRef={userIdRef}
          checkUserIdDuplication={checkUserIdDuplication}
          imgFile={imgFile}
          employeeId={props.detailUserData?.employee?.employeeId}
        />
      </FormProvider>
    </ErrorBoundary>
  );
};

export default EditEmployee;
