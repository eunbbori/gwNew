import React from 'react';
import Profile from './Profile';
import { useGetAllEmployeeQuery } from '@/types/generated/types';

export interface ITeamEmpProfileProps {
  deptId?: string | null;
  deptName?: string | null;
}
const TeamProfileList = ({ deptId, deptName }: ITeamEmpProfileProps) => {
  const { data } = useGetAllEmployeeQuery();

  return (
    <ul className="mb-60px">
      <li className="list-none">
        <h2 className="flex h-[32px] text-[20px] font-[600] items-center mt-[27px] mb-[27px] text-black">
          <span className="w-[4px] h-[32px] rounded-[2px] bg-[#3366FF] mr-[16px]"></span>
          {deptName}
          <p className="text-[16px] mt-[4px] ml-[5px]">({data?.employees?.filter((dept) => dept?.department?.departmentId === deptId).length})</p>
        </h2>
        <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
          {data?.employees
            ?.filter((dept) => dept?.department?.departmentId === deptId)
            .map((emp, idx) => (
              <Profile key={idx} empName={emp?.employeeName} />
            ))}
        </div>
      </li>
    </ul>
  );
};

export default TeamProfileList;
