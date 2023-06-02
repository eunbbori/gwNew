import React from 'react';

const EmployeeList = () => {
  return (
    <div className="grid grid-rows-[200px_minmax(530px,_1fr)] grid-cols-[200px_minmax(900px,_1fr)_100px] grid-flow-col bg-[#F9F9F9] p-[30px]">
      <div className="col-span-1 row-span-3 bg-[#F9F9F9]">
        <div className="flex flex-col font-bold">
          <div className="text-[18px] leading-[25px] mb-[10px]">마이메뉴</div>
          <div className="flex flex-col">
            <div className="mt-[16px]">전체</div>
            <div className="mt-[12px]">팀</div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-[white] pt-[20px] pr-[35px] pb-[25px] pl-[30px] rounded-xl">
          <div className="flex flex-col">
            <div className="text-[22px] font-bold leading-[32px]">제이앤퍼스트</div>
            <div className="text-[15px] font-bold">전체 4명</div>
          </div>
        </div>
      </div>
      <div className="row-span-2 col-span-2">
        <div className="bg-[white] p-[30px] rounded-xl">3</div>
      </div>
    </div>
  );
};

export default EmployeeList;
