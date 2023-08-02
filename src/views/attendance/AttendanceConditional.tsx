import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { Input, Select, initTE } from 'tw-elements';
import { IEmployeeWorkingCondition, useGetEmployeeWorkingConditionalLazyQuery } from '@/types/generated/types';
import { FormProvider, useForm } from 'react-hook-form';
import ConditionalTableHeader from './ConditionalTableHeader';
import ConditionalTableRows from './ConditionalTableRows';
import Paging from '@/components/Paging';
import ConditionalInputs from './ConditionalInputs';
import SelectPageCount from './SelectPageCount';
import Swal from 'sweetalert';
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

const AttendanceConditional = () => {
  const [pageCount, setPageCount] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [workingTypeChecked, setWorkingTypeChecked] = useState<string[]>([]);

  const handlePageCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setPageCount(Number(selectedValue));
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setPageNo(page.valueOf() as number);
  };

  const handleWorkingTypeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (workingTypeChecked.includes(value)) {
      setWorkingTypeChecked(workingTypeChecked.filter((type) => type !== value));
    } else {
      setWorkingTypeChecked([...workingTypeChecked, value]);
    }
  };

  useEffect(() => {
    methods.handleSubmit(onSearchCondition)();
  }, [pageCount, pageNo]);

  const methods = useForm<ConditionalFormValues>({});

  const [getEmployeeWorkingConditionalQuery, { data, loading }] = useGetEmployeeWorkingConditionalLazyQuery({
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  useEffect(() => {
    initTE({ Input, Select });
  }, [loading]);

  const onSearchCondition = async (inputData: ConditionalFormValues) => {
    try {
      const { dateRange, ...newInputData } = inputData;
      const input: IEmployeeWorkingCondition = {
        ...newInputData,
        workingDateFrom: dateRange?.startDate ? format(new Date(dateRange.startDate), 'yyyy-MM-dd') : null,
        workingDateTo: dateRange?.endDate ? format(new Date(dateRange.endDate), 'yyyy-MM-dd') : null,
        workingType: workingTypeChecked,
      };

      const { data } = await getEmployeeWorkingConditionalQuery({
        variables: {
          searchCondition: input,
          page: pageNo,
          size: pageCount,
        },
        fetchPolicy: 'no-cache',
      });

      const newPage = data?.employeeWorkingConditional?.page ?? 1;
      setPageNo(newPage < 1 ? 1 : newPage);
    } catch (error) {
      Swal('ERROR', '', 'error');
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-3 pb-0 pr-5">
        <form onSubmit={methods.handleSubmit(onSearchCondition)} role="form text-left">
          <ConditionalInputs handleWorkingTypeChange={handleWorkingTypeChange} />

          <div className="relative flex w-full px-3 my-3">
            <p className="basis-1/2 mb-0 mr-5 w-30 leading-8 text-sm">
              <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체{' '}
              <span className="ml-1 font-semibold">{data?.employeeWorkingConditional?.totalElements ?? 0}</span> 명
            </p>
            <div className="flex justify-end basis-1/2">
              <button
                type="submit"
                className="mr-[30px] inline-block rounded bg-primary px-6 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                조회
              </button>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <ConditionalTableHeader />
            <tbody>
              <ConditionalTableRows data={data} />
            </tbody>
          </table>
        </div>
        <div className="flex mt-4">
          <div className="w-[10%] mr-auto" />
          <div className="flex mt-4">
            <Paging
              perPage={pageCount}
              paging={pageNo}
              onHandler={handlePageChange}
              totalCount={data?.employeeWorkingConditional?.totalElements || undefined}
            />
          </div>
          <div className="w-[10%] ml-auto self-center">
            <SelectPageCount handlePageCountChange={handlePageCountChange} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AttendanceConditional;
