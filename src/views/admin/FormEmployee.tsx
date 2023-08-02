import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';
import { useFormContext } from 'react-hook-form';
import EmployeeProfile from './EmployeeProfile';
import { IEmployeeFormValues, classNames, useRouteEmployeeList } from './HandleEmployee';
import Text from '@/components/Input/Text';
import SelectInput from '@/components/Input/SelectInput';
import { useCodesOption, useDepartmentsOption } from '@/repository/Code';
import PhoneNoInput from '@/components/Input/PhoneNoInput';
import DatePickerInput from '@/components/Input/DatePickerInput';
import CancelButton from '@/components/Button/CancelButton';
import SubmitButton from '@/components/Button/SubmitButton';
import { LazyQueryExecFunction } from '@apollo/client';
import { Exact, ICheckUserIdDuplicationQuery } from '@/types/generated/types';
import TextInput from '@/components/Input/TextInput';

interface IFormEmployee {
  mode: 'REGISTER' | 'MODIFY';
  submitHandler: (input: any) => void;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
  checkUserIdDuplication: LazyQueryExecFunction<
    ICheckUserIdDuplicationQuery,
    Exact<{
      userId: string;
    }>
  >;
  imgFile?: string;
  employeeId?: any;
}

const FormEmployee = ({ mode, submitHandler, setIsChecking, setUploadedFile, checkUserIdDuplication, imgFile, employeeId }: IFormEmployee) => {
  const deptOptions = useDepartmentsOption();
  const contractOptions = useCodesOption('CONTRACT_TYPE');
  const positionOptions = useCodesOption('POSITION');

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<IEmployeeFormValues>();

  const doubleCheckHandler = () => {
    setIsChecking(true);
    checkUserIdDuplication();
  };

  const { routeEmployeeList } = useRouteEmployeeList();

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="w-full mr-auto ml-auto px-6">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-[250px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
              <div className="flex-auto p-6 w-[600px]">
                <form onSubmit={handleSubmit(submitHandler)} role="form text-left">
                  {mode === 'REGISTER' ? (
                    <div className="mb-4 w-[250px]">
                      <EmployeeProfile name="img" info="사진을 저장하세요" imgFile={imgFile} setUploadedFile={setUploadedFile} />
                    </div>
                  ) : (
                    <div className="mb-4 flex justify-between">
                      <div className="w-[250px]">
                        <EmployeeProfile name="img" info="사진을 수정하세요" imgFile={imgFile} setUploadedFile={setUploadedFile} />
                      </div>
                      <div className="w-[250px] self-end">
                        <Text title="사번" value={employeeId} />
                      </div>
                    </div>
                  )}

                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <TextInput
                        name="userId"
                        title="아이디"
                        placeHolder="아이디를 입력해주세요"
                        onChange={() => {
                          setIsChecking(false);
                        }}
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
                    <TextInput name="name" title="이름" placeHolder="이름을 입력해주세요" />
                    <div className={classNames.error}>{errors.name?.message}</div>
                  </div>
                  <div className="mb-4 flex">
                    <div className="w-[450px]">
                      <TextInput name="email" title="회사 이메일" placeHolder="메일 아이디만 입력해주세요" />
                      <div className={classNames.error}>{errors.email?.message}</div>
                    </div>
                    <span className="text-[#8e8e8e] font-medium self-center mt-[20px] ml-[10px]">@jnfirst.co.kr</span>
                  </div>
                  {mode === 'REGISTER' && (
                    <>
                      <div className="mb-4">
                        <TextInput name="passwd" title="임시 비밀번호" placeHolder="비밀번호를 입력해주세요" type="password" />
                        <div className={classNames.error}>{errors.passwd?.message}</div>
                      </div>
                      <div className="mb-4">
                        <TextInput name="passwdConfirm" title="임시 비밀번호 확인" placeHolder="비밀번호 한번 더 입력해주세요" type="password" />
                        <div className={classNames.error}>{errors.passwdConfirm?.message}</div>
                      </div>
                    </>
                  )}

                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="departmentId"
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
                        selectOptions={contractOptions}
                        title="계약형태"
                        placeHolder="계약형태를 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.contractType?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <PhoneNoInput name="phone" title="핸드폰번호" placeHolder="핸드폰번호를 입력해주세요" inputClassName={classNames.input} />
                    <div className={classNames.error}>{errors.phone?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="position"
                        selectOptions={positionOptions}
                        title="직급"
                        placeHolder="직급을 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.position?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <DatePickerInput name="startDate" title="입사일(YYYY-MM-DD)" />
                      <div className={classNames.error}>{errors.startDate?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4"></div>
                  <div className="text-center flex justify-end">
                    <CancelButton onClick={routeEmployeeList} text="취소" cancelClassName={classNames.cancel} />
                    <SubmitButton text={mode === 'REGISTER' ? '등록' : '수정'} submitClassName={classNames.submit} />
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

export default FormEmployee;
