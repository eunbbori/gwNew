import React from 'react';
import Image from 'next/image';
import blankPhoto from '@/assets/img/profile/blank-profile-picture-640.png';

const MemberModalContent = () => {
  return (
    <div className="bg-[white] w-[500px] p-[30px] rounded-xl">
      {/* profile */}
      <div className="mr-[35px] mb-[45px]">
        <div className="">
          <div className="w-[144px] h-[144px]">
            <div className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden">
              <Image src={blankPhoto} width={144} height={144} alt={'blank'} />
            </div>
          </div>
        </div>
      </div>
      {/* profile */}
      {/* name & dept */}
      <div className="mt-[20px] text-[20px] font-bold">
        <span>홍길동 / </span>
        <span>개발부</span>
      </div>
      {/* name & dept */}
      {/* basic info*/}
      <div className="mt-[35px]">
        <div className="text-[15px] font-bold text-gray-800 mb-[10px]">기본정보</div>
        <div className="text-[14px]">
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">사원번호</div>
            <div className="flex-1">
              <span className="text-blue-600">JF000001</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">아이디</div>
            <div className="flex-1">
              <span className="text-blue-600">gildong</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">이메일</div>
            <div className="flex-1">
              <span className="text-blue-600">gildong@jnfirst.co.kr</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">핸드폰번호</div>
            <div className="flex-1">
              <span className="text-blue-600">010-1111-2222</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">직급</div>
            <div className="flex-1">
              <span className="text-blue-600">사원</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">입사일</div>
            <div className="flex-1">
              <span className="text-blue-600">2023-02-01</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">계약형태</div>
            <div className="flex-1">
              <span className="text-blue-600">정규직</span>
            </div>
          </div>
        </div>
      </div>
      {/* basic info*/}
    </div>
  );
};

export default MemberModalContent;
