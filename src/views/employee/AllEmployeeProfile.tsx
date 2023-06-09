import Profile from '@/components/Employee/Profile/Profile';
import { IGetAllEmployeeQuery, useRefreshMutation } from '@/types/generated/types';
import React from 'react';

const AllEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const [refreshMutation /*, { data, loading, error }*/] = useRefreshMutation();

  return (
    <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
      {list?.employees?.map((emp, idx) => (
        <Profile key={idx} empName={emp?.employeeName} />
      ))}
    </div>
  );
};

export default AllEmployeeProfile;
