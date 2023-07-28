import Profile from '@/components/Employee/Profile/Profile';
import { useCodesMap } from '@/repository/Code';
import { memberDetailVar } from '@/stores/gqlReactVars';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { useUserToken } from '@/repository/AccessToken';

const AllEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const positionOptions = useCodesMap('POSITION');
  const useUserInfo = useUserToken();

  const clickHandler = (userId: string, empId: number) => {
    memberDetailVar({ userId: userId, empId: empId });
  };

  list?.employees?.sort((a, b) => {
    if (!a?.name) return 1;
    else if (!b?.name) return -1;
    else if (a?.name > b?.name) return 1;
    else return a?.name < b?.name ? -1 : 0;
  });

  return (
    <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
      {list?.employees?.map((emp, idx) => (
        <Profile
          key={emp?.employeeId}
          onClick={() => clickHandler(emp?.userId || '', emp?.employeeId || 0)}
          empName={emp?.name}
          empId={emp?.employeeId || 0}
          deptName={emp?.department?.departmentName}
          position={emp?.position}
          photoUrl={emp?.photoUrl || ''}
          positionOptions={positionOptions}
        />
      ))}
      {useUserInfo?.adminYn === 'YES' && (
        <Link href={{ pathname: '/employee/addEmp' }}>
          <div className="mr-[35px] mb-[75px] cursor-pointer text-center">
            <div className="flex items-center justify-center w-[144px] h-[144px]">
              <FontAwesomeIcon className="text-[#3366FF] text-5xl" icon={faPlus} />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default AllEmployeeProfile;
