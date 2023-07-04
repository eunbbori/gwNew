import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { attendanceConditionalFilterDateVar, attendanceDateVar } from '@/stores/gqlReactVars';
import { useEffect, useState, useRef, use, MutableRefObject } from 'react';
import DatePickerRangeInput from '@/components/Input/DatePickerRangeInput';
import { Input, Select, initTE } from 'tw-elements';
import {
  IEmployeeWorkingCondition,
  useGetAllDepartmentsLazyQuery,
  useGetCodesLazyQuery,
  useGetEmployeeWorkingConditionalLazyQuery,
  useGetEmployeeWorkingConditionalQuery,
} from '@/types/generated/types';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/Input/TextInput';
import SelectInput from '@/components/Input/SelectInput';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import ConditionalTableHeader from './ConditionalTableHeader';
import ConditionalTableRows from './ConditionalTableRows';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
export interface ConditionalFormValues {
  dateRange: DateRange;
  workingDateFrom: string;
  workingDateTo: string;
  name: string;
  userId: string;
  departmentId: string;
  position: string;
  workingType: string[];
}
export interface IDateMemberCntProps {
  cnt: number | undefined;
}

const ConditionalFilterPart = ({ cnt }: IDateMemberCntProps) => {
  useEffect(() => {
    initTE({ Input, Select });
    getAllDepartmentsQuery();
    getCodesQuery();
  }, []);

  const inputClassName =
    'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full mr-5 appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
  const paragraphClassName = 'w-1/5 text-sm text-[#484848] self-center';
  const [getAllDepartmentsQuery, { data: deptData }] = useGetAllDepartmentsLazyQuery();
  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: {
      parents: ['POSITION', 'WORKING_TYPE'],
    },
    onError: (err) => {
      alert('err');
    },
  });
  const deptOptions = [
    { value: '-1', label: '전체' },
    ...(deptData?.departments?.map((dept) => ({
      value: dept?.departmentId ?? '',
      label: dept?.departmentName ?? '',
    })) ?? []),
  ];

  const positionOptions = [
    { value: '-1', label: '전체' },
    ...((codeData?.codes &&
      codeData?.codes[0]?.codes
        ?.map((code) => ({
          value: code?.code ?? '',
          label: code?.name ?? '',
        }))
        .reverse()) ??
      []),
  ];

  const workingTypeOptions =
    (codeData?.codes &&
      codeData?.codes[1]?.codes?.map((code) => ({
        value: code?.code ?? '',
        label: code?.name ?? '',
      }))) ??
    [];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ConditionalFormValues>({});

  const onSearchCondition = async (inputData: ConditionalFormValues) => {
    console.log(inputData);
    const { dateRange, ...newInputData } = inputData;
    const input: IEmployeeWorkingCondition = {
      ...newInputData,
      workingDateFrom: dateRange?.startDate ? format(new Date(selectedDate.startDate), 'yyyy-MM-dd') : null,
      workingDateTo: dateRange?.endDate ? format(new Date(selectedDate.endDate), 'yyyy-MM-dd') : null,
    };
    try {
      const { data } = await getEmployeeWorkingConditionalQuery({
        variables: {
          searchCondition: input,
          page: 0,
          size: 20,
        },
        fetchPolicy: 'no-cache',
      });
      console.log(data);
    } catch (error) {
      alert('err 조건조회');
    }
  };

  const [getEmployeeWorkingConditionalQuery, { data }] = useGetEmployeeWorkingConditionalLazyQuery({
    onCompleted: () => {
      console.log(data);
    },
    onError: (err) => {
      alert('err 조건조회');
    },
  });

  const selectedDate = useReactiveVar(attendanceConditionalFilterDateVar);
  const selectedFromDate = selectedDate?.startDate ? format(new Date(selectedDate.startDate), 'yyyy-MM-dd') : null;
  const selectedToDate = selectedDate?.endDate ? format(new Date(selectedDate.endDate), 'yyyy-MM-dd') : null;

  const [workingTypeChecked, setWorkingTypeChecked] = useState<string[]>([]);

  const handleWorkingTypeChange = (value: string) => {
    if (workingTypeChecked.includes(value)) {
      setWorkingTypeChecked(workingTypeChecked.filter((type) => type !== value));
    } else {
      setWorkingTypeChecked([...workingTypeChecked, value]);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSearchCondition)} role="form text-left">
        <div className="relative flex w-full px-3 mt-0">
          <p className="basis-1/2 mb-0 mr-5 w-30 leading-8 text-sm">
            <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
          </p>
          <div className="flex justify-end basis-1/2">
            <button
              type="button"
              className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 mr-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
            >
              초기화
            </button>
            <button
              type="submit"
              className="mr-[30px] inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              조회
            </button>
          </div>
        </div>
        <div className="relative flex flex-wrap px-3 mt-0">
          <div className="mt-[10px] -ml-3 py-3 rounded-lg bg-gray-100 p-6 w-full">
            <DatePickerRangeInput name="dateRange" control={control} title="기간" defaultValue={{ startDate: new Date(), endDate: new Date() }} />
            <div className="flex flex-wrap mt-5">
              <div className="w-1/4">
                <TextInput
                  name="name"
                  title="이름"
                  control={control}
                  placeHolder="이름을 입력해주세요"
                  type="text"
                  inputClassName={inputClassName}
                  divClassName="flex"
                  paragraphClassName={paragraphClassName}
                />
              </div>
              <div className="w-1/4">
                <TextInput
                  name="userId"
                  title="아이디"
                  control={control}
                  placeHolder="아이디를 입력해주세요"
                  type="text"
                  inputClassName={inputClassName}
                  divClassName="flex"
                  paragraphClassName={paragraphClassName}
                />
              </div>
              <div className="w-1/4">
                <SelectInput
                  name="departmentId"
                  control={control}
                  selectOptions={deptOptions}
                  title="부서"
                  placeHolder="부서를 선택해주세요"
                  paragraphClassName={paragraphClassName}
                  divClassName="flex"
                />
              </div>
              <div className="w-1/4">
                <SelectInput
                  name="position"
                  control={control}
                  selectOptions={positionOptions}
                  title="직급"
                  placeHolder="직급을 선택해주세요"
                  paragraphClassName={paragraphClassName}
                  divClassName="flex"
                />
              </div>
            </div>
            {/* 근무형태 중복 체크박스 */}
            <div className="flex mt-5">
              <p className="text-sm font-bold text-[#484848] self-center mr-5">근무 형태</p>
              <div className="flex justify-center">
                {workingTypeOptions.map((workType, idx) => (
                  <div key={idx} className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      onChange={() => handleWorkingTypeChange(workType.value)}
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      id={`workingType${idx}`}
                      value={workType.value}
                    />
                    <label className="inline-block text-sm pl-[0.15rem] hover:cursor-pointer" htmlFor={`workingType${idx}`}>
                      {workType.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
              <ConditionalTableHeader />
              <tbody>
                <ConditionalTableRows data={data} />
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </>
  );
};

export default ConditionalFilterPart;
