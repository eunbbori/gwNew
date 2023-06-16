import React from 'react';
import Image from 'next/image';

import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
export interface IProfileProps {
  empName?: string | null;
  photoUrl?: string | undefined;
}

const Profile = ({ empName, photoUrl }: IProfileProps) => {
  return (
    <div className="mr-[35px] mb-[75px] cursor-pointer">
      <div className="">
        <div className="w-[144px] h-[144px]">
          <div className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden">
            <Image src={photoUrl ? process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + photoUrl : blankProfile} alt={empName || ''} width={144} height={144} />
          </div>
          <p className="text-black font-bold text-[16px] mt-[14px] pt-[2px] text-center">{empName}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
