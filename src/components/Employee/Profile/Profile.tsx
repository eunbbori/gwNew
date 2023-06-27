import React from 'react';
import Image from 'next/image';
import { Modal } from 'tw-elements';

import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import { usePositionCodes } from '@/repository/Code';
import { useReactiveVar } from '@apollo/client';
import { memberDetailId } from '@/stores/gqlReactVars';

export interface IProfileProps {
  empName?: string | null;
  photoUrl?: string;
  deptName?: string | null;
  position?: string | null;
  onClick?: (empId: string) => void;
}

const Profile = ({ empName, photoUrl, deptName, position, onClick }: IProfileProps) => {
  const positionOptions = usePositionCodes();
  const detailUserId = useReactiveVar(memberDetailId);
  const handleClick = () => {
    if (onClick) {
      onClick(detailUserId);
    }
  };
  return (
    <div className="mr-[35px] mb-[75px] cursor-pointer" onClick={handleClick}>
      <div className="">
        <div className="w-[144px] h-[144px]">
          <div
            data-te-toggle="modal"
            data-te-target="#detailModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden"
          >
            <Image src={photoUrl ? process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + photoUrl : blankProfile} alt={empName || ''} width={144} height={144} />
          </div>
          <p className="text-[#484848] text-xs text-[16px] mt-[10px] pt-[2px] text-center">{deptName + ' ' + (positionOptions.get(position || '') ?? '')}</p>
          <p className="text-black font-bold text-[16px] pt-[2px] text-center">{empName}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
