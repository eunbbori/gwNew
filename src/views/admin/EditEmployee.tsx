import React, { useEffect, useRef, useState } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployeeInput, useCheckUserIdDuplicationLazyQuery, useModEmployeeMutation } from '@/types/generated/types';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerInput from '@/components/Input/DatePickerInput';
import SelectInput from '@/components/Input/SelectInput';
import TextInput from '@/components/Input/TextInput';
import Text from '@/components/Input/Text';
import PhoneNoInput from '@/components/Input/PhoneNoInput';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';
import { useCodesOption, useDepartmentsOption } from '@/repository/Code';
import EmployeeProfile from './EmployeeProfile';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert';
import {
  useHandleEmployee,
  IEmployeeEditFormValues,
  editSchema,
  defaultInputAttributes,
  defaultTextAttributes,
  classNames,
  handleUserIdDup,
} from './HandleEmployee';
import CancelButton from '@/components/Button/CancelButton';
import SubmitButton from '@/components/Button/SubmitButton';

interface IEditEmployee {
  detailEmpId: number;
  detailUserData: any;
}

const EditEmployee = (props: IEditEmployee) => {
  const [imgFile, setImgFile]: any = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const deptOptions = useDepartmentsOption();
  const contractOptions = useCodesOption('CONTRACT_TYPE');
  const positionOptions = useCodesOption('POSITION');

  const startDateISO = props.detailUserData?.employee?.startDate;
  const startDateFormatted = startDateISO ? format(parseISO(startDateISO), 'yyyy-MM-dd') : null;

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<IEmployeeEditFormValues>({
    resolver: yupResolver(editSchema),
    // mode: 'onChange',
    defaultValues: {
      userId: props.detailUserData?.employee?.userId,
      name: props.detailUserData?.employee?.name,
      email: props.detailUserData?.employee?.email,
      departmentId: props.detailUserData?.employee?.department?.departmentId,
      contractType: props.detailUserData?.employee?.contractType,
      phone: props.detailUserData?.employee?.phone,
      position: props.detailUserData?.employee?.position,
    },
  });

  const prevUserId = props.detailUserData?.employee?.userId;
  const currentUserId = getValues('userId');
  // const controlledInputAttributes = { ...defaultInputAttributes, control };
  const controlledInputAttributes = { ...defaultInputAttributes, control: control as unknown as Control<FieldValues> };

  const [modEmployeeMutation] = useModEmployeeMutation();

  const { uploadedFile, setUploadedFile, routeEmployeeList } = useHandleEmployee();

  useEffect(() => {
    if (props.detailUserData?.employee?.photoUrl) {
      setImgFile(`${process.env.NEXT_PUBLIC_BASE_PROFILE_API}/${props.detailUserData.employee.photoUrl}`);
    }
  }, [props.detailUserData]);

  const [checkUserIdDuplication, { data: userIdData, loading }] = useCheckUserIdDuplicationLazyQuery({
    variables: {
      userId: currentUserId || '',
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  const doubleCheckHandler = () => {
    setIsChecking(true);
    checkUserIdDuplication();
  };
  const userIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loading) return;

    if (prevUserId === currentUserId) setIsChecking(false);
    else handleUserIdDup({ isChecking, setIsChecking, currentUserId, userIdRef, userIdData, setValue });
  }, [isChecking, userIdData, loading]);

  const onModEmployee = (inputData: IEmployeeEditFormValues) => {
    if (isChecking === !!dirtyFields.userId) {
      //if (isChecking ? dirtyFields.userId : !dirtyFields.userId) {
      //if ((isChecking && dirtyFields.userId) || (!isChecking && !dirtyFields.userId)) {
      console.log(inputData);

      const { ...newInputData } = inputData;

      const input: IEmployeeInput = {
        ...newInputData,
        departmentId: parseInt(newInputData.departmentId),
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
      <div className="w-full mr-auto ml-auto px-6">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-[250px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
              <div className="flex-auto p-6 w-[600px]">
                <form onSubmit={handleSubmit(onModEmployee)} role="form text-left">
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <EmployeeProfile {...controlledInputAttributes} name="img" info="사진을 수정하세요" imgFile={imgFile} setUploadedFile={setUploadedFile} />
                    </div>
                    <div className="w-[250px] self-end">
                      <Text {...defaultTextAttributes} title="사번" value={props.detailUserData?.employee?.employeeId} />
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <TextInput
                        {...controlledInputAttributes}
                        name="userId"
                        title="아이디"
                        placeHolder="아이디를 입력해주세요"
                        ref={userIdRef}
                        onChange={() => setIsChecking(false)}
                      />
                      <div className={classNames.error}>{errors.userId?.message}</div>
                    </div>
                    <div className="w-[250px] self-center mt-[20px]">
                      <button
                        type="button"
                        className={
                          'self-center mr-[15px] h-[30px] inline-block px-4 mb-0 text-xs text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500'
                        }
                        onClick={doubleCheckHandler}
                      >
                        중복체크
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <TextInput {...controlledInputAttributes} name="name" title="이름" placeHolder="이름을 입력해주세요" />
                    <div className={classNames.error}>{errors.name?.message}</div>
                  </div>
                  <div className="mb-4">
                    <TextInput {...controlledInputAttributes} name="email" title="회사 이메일" placeHolder="회사 이메일을 입력해주세요" type="email" />
                    <div className={classNames.error}>{errors.email?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="departmentId"
                        control={control}
                        selectOptions={deptOptions}
                        title="부서"
                        placeHolder="부서를 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.departmentId?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <SelectInput
                        name="contractType"
                        control={control}
                        selectOptions={contractOptions}
                        title="계약형태"
                        placeHolder="계약형태를 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.contractType?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <PhoneNoInput name="phone" title="핸드폰번호" control={control} placeHolder="핸드폰번호를 입력해주세요" inputClassName={classNames.input} />
                    <div className={classNames.error}>{errors.phone?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="position"
                        control={control}
                        selectOptions={positionOptions}
                        title="직급"
                        placeHolder="직급을 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.position?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <DatePickerInput name="startDate" control={control} title="입사일(YYYY-MM-DD)" defaultValue={startDateFormatted ?? ''} />
                      <div className={classNames.error}>{errors.startDate?.message}</div>
                    </div>
                  </div>

                  <div className="mb-4"></div>
                  <div className="text-center flex justify-end">
                    <CancelButton onClick={routeEmployeeList} text="취소" cancelClassName={classNames.cancel} />
                    <SubmitButton text="수정" submitClassName={classNames.submit} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EditEmployee;
