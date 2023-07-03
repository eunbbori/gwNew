import React, { useEffect } from 'react';
import Image from 'next/image';
import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import { useReactiveVar } from '@apollo/client';
import { memberDetailId } from '@/stores/gqlReactVars';
import { useGetCodesLazyQuery, useGetEmployeeLazyQuery } from '@/types/generated/types';

const useEmpDetail = () => {
  const detailUserId = useReactiveVar(memberDetailId);

  const [getEmployee, { data }] = useGetEmployeeLazyQuery({
    variables: {
      userId: detailUserId,
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      alert('Plz Login first!');
    },
  });

  return { data, getEmployee };
};

const MemberModalContent = () => {
  const { data, getEmployee } = useEmpDetail();
  const startDateString = data?.employee?.startDate;
  const formattedStartDate = startDateString ? startDateString.slice(0, 10) : '';
  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: {
      parents: ['CONTRACT_TYPE', 'POSITION'],
    },
    onError: (err) => {
      alert('err');
    },
  });

  useEffect(() => {
    getEmployee();
    getCodesQuery();
  }, []);
  const userContractType = data?.employee?.contractType;
  const userPosition = data?.employee?.position;

  const codeContractType = codeData?.codes?.[0]?.codes;
  const codePosition = codeData?.codes?.[1]?.codes;

  const matchedContractType = codeContractType?.filter((code) => code?.code === userContractType);
  const matchedPosition = codePosition?.filter((code) => code?.code === userPosition);

  const phoneNumber = data?.employee?.phone;
  let formattedPhoneNumber = '';

  if (phoneNumber) {
    const digits = phoneNumber.replace(/\D/g, '');

    if (digits.length === 10) {
      formattedPhoneNumber = digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (digits.length === 11) {
      formattedPhoneNumber = digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      formattedPhoneNumber = digits;
    }
  }
  return (
    <div className="bg-[white] w-[500px] p-[30px] rounded-xl">
      {/* profile */}
      <div className="mr-[35px] mb-[45px]">
        <div className="">
          <div className="w-[144px] h-[144px]">
            <div className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden">
              <Image
                src={data?.employee?.photoUrl ? process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + data?.employee?.photoUrl : blankProfile}
                alt={data?.employee?.name || ''}
                width={144}
                height={144}
              />
            </div>
          </div>
        </div>
      </div>
      {/* profile */}
      {/* name & dept */}
      <div className="mt-[20px] text-[20px] font-bold">
        <span>{data?.employee?.name} / </span>
        <span>{data?.employee?.department?.departmentName}</span>
      </div>
      {/* name & dept */}
      {/* basic info*/}
      <div className="mt-[35px]">
        <div className="text-[15px] font-bold text-gray-800 mb-[10px]">기본정보</div>
        <div className="text-[14px]">
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">사원번호</div>
            <div className="flex-1">
              <span className="text-blue-600">{data?.employee?.employeeId}</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">아이디</div>
            <div className="flex-1">
              <span className="text-blue-600">{data?.employee?.userId}</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">이메일</div>
            <div className="flex-1">
              <span className="text-blue-600">{data?.employee?.email}</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">핸드폰번호</div>
            <div className="flex-1">
              <span className="text-blue-600">{formattedPhoneNumber}</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">직급</div>
            <div className="flex-1">
              <span className="text-blue-600">{matchedPosition?.[0]?.name}</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">입사일</div>
            <div className="flex-1">
              <span className="text-blue-600">{formattedStartDate}</span>
            </div>
          </div>
          <div className="flex mb-[10px]">
            <div className="flex-1 text-gray-600">계약형태</div>
            <div className="flex-1">
              <span className="text-blue-600">{matchedContractType?.[0]?.name}</span>
            </div>
          </div>
        </div>
      </div>
      {/* basic info*/}
    </div>
  );
};

export default MemberModalContent;
function getEmployee() {
  throw new Error('Function not implemented.');
}
