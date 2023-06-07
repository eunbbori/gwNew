import Profile from '@/components/Employee/Profile/Profile';
import { useGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const AllEmployeeProfile = () => {
  const { data } = useGetAllEmployeeQuery();

  return (
    <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
      {data?.employees?.map((emp, idx) => (
        <Profile key={idx} empName={emp?.employeeName} />
      ))}
    </div>
  );
};

export default AllEmployeeProfile;
