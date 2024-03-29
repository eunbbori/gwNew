import React, { useContext } from 'react';
import Profile from './Profile';
import { IEmployee } from '@/types/generated/types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useUserToken } from '@/repository/AccessToken';
import { MemberDetailContext } from '@/views/employee/EmployeeTab';

export interface ITeamEmpProfileProps {
  deptId?: number | null;
  deptName?: string | null;
  employees?: Array<IEmployee | null> | null;
  positionOptions: Map<string, string>;
}
const TeamProfileList = ({ deptId, deptName, employees, positionOptions }: ITeamEmpProfileProps) => {
  const memberDetailContext = useContext(MemberDetailContext);
  const useUserInfo = useUserToken();

  const deptEmployees = employees
    ?.sort((a, b) => {
      if (!a?.name) return 1;
      else if (!b?.name) return -1;
      else if (a?.name > b?.name) return 1;

      return a?.name < b?.name ? -1 : 0;
    })
    .filter((dept) => dept?.department?.departmentId === deptId);

  const clickHandler = (userId: string, empId: string) => {
    memberDetailContext &&
      memberDetailContext.setMemberDetail({
        userId: userId,
        empId: empId,
      });
  };

  return (
    <ul className="mb-60px">
      <li className="list-none">
        <h2 className="flex h-[32px] text-[20px] font-[600] items-center mt-[27px] mb-[27px] text-black">
          <span className="w-[4px] h-[32px] rounded-[2px] bg-[#3366FF] mr-[16px]"></span>
          {deptName}
          <p className="text-[16px] mt-[4px] ml-[5px]">({deptEmployees?.length})</p>
          {useUserInfo?.adminYn === 'YES' && (
            <p className="ml-3 leading-8 text-xl cursor-pointer">
              <Link href={{ pathname: '/employee/addEmp', query: { deptId } }}>
                <FontAwesomeIcon className="text-[#3366FF]" icon={faPlus} />
              </Link>
            </p>
          )}
        </h2>
        <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
          {deptEmployees &&
            deptEmployees.map((emp, idx) => (
              <Profile
                key={emp?.employeeId}
                empName={emp?.name}
                empId={emp?.employeeId ?? ''}
                deptName={emp?.department?.departmentName}
                position={emp?.position}
                photoUrl={emp?.photoUrl || ''}
                positionOptions={positionOptions}
                email={emp?.email}
                onClick={() => clickHandler(emp?.userId || '', emp?.employeeId || '')}
              />
            ))}
        </div>
      </li>
    </ul>
  );
};

export default TeamProfileList;
