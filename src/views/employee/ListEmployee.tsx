import React, { useEffect, useState } from 'react';
import AllEmployeeProfile from './AllEmployeeProfile';
import TeamEmployeeProfile from './TeamEmployeeProfile';
import { useGetAllEmployeeQuery, useRefreshMutation } from '@/types/generated/types';
import { setLocalFromToken, startEndAtVar } from '@/stores/gqlReactVars';

const EmployeeList = () => {
  const [allMenuSelected, setAllMenuSelected] = useState(true);
  const [refreshMutation /*, { data, loading, error }*/] = useRefreshMutation();

  const allClass = ' cursor-pointer';
  const teamClass = 'mt-[12px] cursor-pointer';
  const { data, refetch } = useGetAllEmployeeQuery({
    onError: (err) => {
      if (err.message.startsWith('NO TOKEN')) {
        refreshMutation({
          onCompleted: (data) => {
            setLocalFromToken(data);
            refetch();
          },
        });
      }
    },
  });

  const myAllClickHandler = () => {
    setAllMenuSelected(true);
  };

  const myTeamClickHandler = () => {
    setAllMenuSelected(false);
  };
  return (
    <div className="grid grid-rows-[150px_minmax(530px,_1fr)] grid-cols-[200px_minmax(900px,_1fr)_100px] grid-flow-col bg-[#F9F9F9] p-[30px]">
      <div className="col-span-1 row-span-3 bg-[#F9F9F9]">
        <div className="flex flex-col font-bold">
          <div className="text-[18px] leading-[25px] text-[#333333]">마이메뉴</div>
          <div className="flex flex-col mt-[16px]">
            <div className={`${allMenuSelected ? 'text-[#3366FF] ' + allClass : 'text-[#333333] ' + allClass}`} onClick={myAllClickHandler}>
              전체
            </div>
            <div className={`${!allMenuSelected ? 'text-[#3366FF] ' + teamClass : 'text-[#333333] ' + teamClass}`} onClick={myTeamClickHandler}>
              팀
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-[white] pt-[20px] pr-[35px] pb-[25px] pl-[30px] rounded-xl">
          <div className="flex flex-col">
            <div className="text-[22px] text-[#333333] mt-[16px] font-bold leading-[32px]">제이앤퍼스트</div>
            <div className="text-[13px] text-[#3366FF] font-bold">전체 {data?.employees?.length}명</div>
          </div>
        </div>
      </div>
      <div className="row-span-2 col-span-2">{allMenuSelected ? <AllEmployeeProfile list={data} /> : <TeamEmployeeProfile list={data} />}</div>
    </div>
  );
};

export default EmployeeList;
