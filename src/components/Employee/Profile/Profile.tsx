import React from 'react';
import Image from 'next/image';
import { Modal, Ripple, initTE } from 'tw-elements';

import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import { usePositionCodes } from '@/repository/Code';
import DetailModal from '@/components/Modal/DetailModal';
import MemberModalContent from '../Detail/MemberModalContent';
export interface IProfileProps {
  empName?: string | null;
  photoUrl?: string;
  deptName?: string | null;
  position?: string | null;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const Profile = ({ empName, photoUrl, deptName, position, onClick }: IProfileProps) => {
  const positionOptions = usePositionCodes();
  const myModalEl = document.getElementById('detailModal');
  const modal = new Modal(myModalEl);
  const modalClickHandler: React.MouseEventHandler<HTMLDivElement> = (event) => {
    initTE({ Modal, Ripple });
    // console.log(myModalEl);
    // console.log('modal', Modal);
  };

  return (
    <div className="mr-[35px] mb-[75px] cursor-pointer">
      <div className="">
        <div className="w-[144px] h-[144px]">
          <div
            data-te-toggle="modal"
            data-te-target="#detailModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={modalClickHandler}
            className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden"
          >
            <Image src={photoUrl ? process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + photoUrl : blankProfile} alt={empName || ''} width={144} height={144} />
          </div>
          <p className="text-[#484848] text-xs text-[16px] mt-[10px] pt-[2px] text-center">{deptName + ' ' + (positionOptions.get(position || '') ?? '')}</p>
          <p className="text-black font-bold text-[16px] pt-[2px] text-center">{empName}</p>
        </div>
      </div>
      <DetailModal title={'상세정보'} content={<MemberModalContent />} />
    </div>
  );
};

export default Profile;
