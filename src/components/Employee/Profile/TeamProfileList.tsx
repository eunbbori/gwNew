import React from 'react';
import Profile from './Profile';
import { IEmployee } from '@/types/generated/types';
import { memberDetailIdVar } from '@/stores/gqlReactVars';

export interface ITeamEmpProfileProps {
  deptId?: string | null;
  deptName?: string | null;
  employees?: Array<IEmployee | null> | null;
  positionOptions: Map<string, string>;
}
const TeamProfileList = ({ deptId, deptName, employees, positionOptions }: ITeamEmpProfileProps) => {
  const deptEmployees = employees
    ?.sort((a, b) => {
      return !a?.name ? 1 : !b?.name ? -1 : a?.name > b?.name ? 1 : a?.name < b?.name ? -1 : 0;
    })
    .filter((dept) => dept?.department?.departmentId === deptId);
  const clickHandler = (empId: string) => {
    memberDetailIdVar(empId);
  };

  return (
    <ul className="mb-60px">
      <li className="list-none">
        <h2 className="flex h-[32px] text-[20px] font-[600] items-center mt-[27px] mb-[27px] text-black">
          <span className="w-[4px] h-[32px] rounded-[2px] bg-[#3366FF] mr-[16px]"></span>
          {deptName}
          <p className="text-[16px] mt-[4px] ml-[5px]">({deptEmployees?.length})</p>
        </h2>
        <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
          {deptEmployees &&
            deptEmployees!.map((emp, idx) => (
              <Profile
                key={idx}
                empName={emp?.name}
                deptName={emp?.department?.departmentName}
                position={emp?.position}
                photoUrl={emp?.photoUrl || ''}
                positionOptions={positionOptions}
                onClick={() => clickHandler(emp?.userId || '')}
              />
            ))}
        </div>
      </li>
    </ul>
  );
};

export default TeamProfileList;
