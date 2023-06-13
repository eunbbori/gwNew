import Profile from '@/components/Employee/Profile/Profile';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const AllEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  return (
    <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
      {list?.employees ? list?.employees?.map((emp, idx) => <Profile key={idx} empName={emp?.employeeName} />) : 'Not loaded Yet'}
    </div>
  );
};

export default AllEmployeeProfile;
