import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import TableHeader from '@/views/attendance/TableHeader';
import TableRows from '@/views/attendance/TableRows';
import { useGetEmployeeQuery } from '@/types/generated/types';

const Attendance = () => {
  const { data, loading, error } = useGetEmployeeQuery();

  if (loading) return <p>Loading!!!</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;
  //setEmployees(data!.employees)
  /*
	useEffect(() => {
		const { loading, data } = useQuery( GET_EMPLOYEES )
		setEmployees(data.employees)
	})
*/
  return (
    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
      <TableHeader />
      <tbody>
        <TableRows data={data} />
      </tbody>
    </table>
  );
};

export default Attendance;
