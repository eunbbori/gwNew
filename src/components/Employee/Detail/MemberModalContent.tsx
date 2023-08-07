import React, { useEffect } from 'react';
import Image from 'next/image';
import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import { useGetEmployeeLazyQuery } from '@/types/generated/types';
import { useCodesMap } from '@/repository/Code';
import { formatPhoneNumber } from '@/components/Util/CommonUtil';
import Swal from 'sweetalert';
import { format } from 'date-fns';

const useEmpDetail = () => {
  const [getEmployee, { data }] = useGetEmployeeLazyQuery({
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('미접속시간(30분)이 경과하여 로그아웃합니다.', '', 'error').then((result) => {
        window.location.href = '/';
        window.location.href = '/auth/login';
      });
    },
  });

  return { data, getEmployee };
};

const MemberInfoField = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex mb-[10px]">
      <div className="flex-1 text-gray-600">{title}</div>
      <div className="flex-1">
        <span className="text-blue-600">{value}</span>
      </div>
    </div>
  );
};

const MemberModalContent = ({ userId }: { userId: string }) => {
  const { data, getEmployee } = useEmpDetail();
  const startDateString = data?.employee?.startDate;
  const formattedStartDate = startDateString ? format(new Date(startDateString), 'yyyy-MM-dd') : '';

  useEffect(() => {
    if (userId) {
      console.log('MemberModalContent=' + userId);
      getEmployee({
        variables: {
          userId,
        },
      });
    }
  }, [userId]);

  const matchedContractType = useCodesMap('CONTRACT_TYPE').get(data?.employee?.contractType ?? '');
  const matchedPosition = useCodesMap('POSITION').get(data?.employee?.position ?? '');

  const formattedPhoneNumber = formatPhoneNumber(data?.employee?.phone ?? '');

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
          <MemberInfoField title="사원번호" value={String(data?.employee?.employeeId) ?? ''} />
          <MemberInfoField title="아이디" value={data?.employee?.userId ?? ''} />
          <MemberInfoField title="이메일" value={data?.employee?.email ?? ''} />
          <MemberInfoField title="핸드폰번호" value={formattedPhoneNumber} />
          <MemberInfoField title="직급" value={matchedPosition ?? ''} />
          <MemberInfoField title="입사일" value={formattedStartDate ?? ''} />
          <MemberInfoField title="계약형태" value={matchedContractType ?? ''} />
        </div>
      </div>
      {/* basic info*/}
    </div>
  );
};

export default MemberModalContent;
