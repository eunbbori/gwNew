import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployeeInput, useCheckUserIdDuplicationLazyQuery, useModEmployeeMutation } from '@/types/generated/types';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';
import Swal from 'sweetalert';
import { useRouteEmployeeList, IEmployeeEditFormValues, editSchema, handleUserIdDup } from './HandleEmployee';
import FormEmployee from './FormEmployee';

interface IEditEmployee {
  detailEmpId: number;
  detailUserData: any;
}

const EditEmployee = (props: IEditEmployee) => {
  const [imgFile, setImgFile]: any = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [userIdForCheck, setUserIdForCheck] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
      startDate: props.detailUserData?.employee?.startDate,
    },
  });

  const prevUserId = props.detailUserData?.employee?.userId;

  const setUserIdForCheckDuplication = () => {
    setUserIdForCheck(methods.getValues('userId'));
  };

  const requestUserIdDupCheck = () => {
    if (prevUserId === methods.getValues('userId')) return;

    checkUserIdDuplication({
      variables: {
        userId: methods.getValues('userId'),
      },
    });
  };

  const [checkUserIdDuplication, { data: userIdData, loading }] = useCheckUserIdDuplicationLazyQuery({
    variables: {
      userId: userIdForCheck,
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  const [modEmployeeMutation] = useModEmployeeMutation();

  const { routeEmployeeList } = useRouteEmployeeList();

  useEffect(() => {
    if (props.detailUserData?.employee?.photoUrl) {
      setImgFile(`${process.env.NEXT_PUBLIC_BASE_PROFILE_API}/${props.detailUserData.employee.photoUrl}`);
    }
  }, [props.detailUserData]);

  useEffect(() => {
    if (loading) return;

    if (prevUserId === methods.getValues('userId')) setIsChecking(false);
    else
      handleUserIdDup({
        isChecking,
        setIsChecking,
        currentUserId: userIdForCheck,
        userIdData,
        setValue: methods.setValue,
        setFocus: methods.setFocus,
      });
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
          setUploadedFile={setUploadedFile}
          setUserIdForCheckDuplication={setUserIdForCheckDuplication}
          requestUserIdDupCheck={requestUserIdDupCheck}
          imgFile={imgFile}
          employeeId={props.detailUserData?.employee?.employeeId}
        />
      </FormProvider>
    </ErrorBoundary>
  );
};

export default EditEmployee;
