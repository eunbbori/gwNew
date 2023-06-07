import Profile from '@/components/Employee/Profile';
import React from 'react';

const TeamEmployeeProfile = () => {
  return (
    <div className="bg-[white] p-[30px] rounded-xl">
      <ul className="mb-60px">
        <li className="list-none">
          <h2 className="flex h-[32px] text-[20px] font-[600] items-center mt-[27px] mb-[27px] text-black">
            <span className="w-[4px] h-[32px] rounded-[2px] bg-[#3366FF] mr-[16px]"></span>
            개발본부
            <p className="text-[16px] mt-[4px] ml-[5px]">(2)</p>
          </h2>
          <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
            <Profile />
            <Profile />
          </div>
        </li>
      </ul>
      <ul className="mb-60px">
        <li className="list-none">
          <h2 className="flex h-[32px] text-[20px] font-[600] items-center mt-[27px] mb-[27px] text-black">
            <span className="w-[4px] h-[32px] rounded-[2px] bg-[#3366FF] mr-[16px]"></span>
            경영지원본부
            <p className="text-[16px] mt-[4px] ml-[5px]">(1)</p>
          </h2>
          <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
            <Profile />
          </div>
        </li>
      </ul>
      <ul className="mb-60px">
        <li className="list-none">
          <h2 className="flex h-[32px] text-[20px] font-[600] items-center mt-[27px] mb-[27px] text-black">
            <span className="w-[4px] h-[32px] rounded-[2px] bg-[#3366FF] mr-[16px]"></span>
            연구소
            <p className="text-[16px] mt-[4px] ml-[5px]">(3)</p>
          </h2>
          <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
            <Profile />
            <Profile />
            <Profile />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TeamEmployeeProfile;
