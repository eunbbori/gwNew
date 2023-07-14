import { IGetEmployeeWorkingQuery } from '@/types/generated/types';

interface ITableCellModProps {
  cellData: {
    __typename?: 'EmployeeWorking';
    employeeId?: number | null;
    name?: string | null;
    position?: string | null;
    userId?: string | null;
    workingDate?: any | null;
    workingType?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null;
  } | null;
}

const TableCellMod = ({ cellData }: ITableCellModProps) => {
  return (
    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
      <div className="flex px-2 py-1">
        <div className="flex flex-col justify-center">
          <button
            className={
              'self-center mr-[15px] h-[23px] inline-block px-4 mb-0 text-xs text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500'
            }
          >
            수정
          </button>
        </div>
      </div>
    </td>
  );
};

export default TableCellMod;
