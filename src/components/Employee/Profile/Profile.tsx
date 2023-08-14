import React from 'react';
import Image from 'next/image';

import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import swal from 'sweetalert';
import { useUserToken } from '@/repository/AccessToken';
export interface IProfileProps {
  empName?: string | null;
  empId?: string;
  photoUrl?: string;
  deptName?: string | null;
  position?: string | null;
  positionOptions: Map<string, string>;
  email?: string | null;
  onClick?: () => void;
}

const Profile = ({ empName, photoUrl, deptName, position, positionOptions, email, onClick }: IProfileProps) => {
  const useUserInfo = useUserToken();
  const isAdmin = useUserInfo?.adminYn === 'YES';

  const handleProfileClick = () => {
    if (isAdmin && onClick) {
      onClick();
    }
  };

  return (
    <div className="mr-[35px] mb-[105px]">
      <div className="flex">
        <div className="w-[144px] h-[144px]">
          <div
            data-te-toggle="modal"
            data-te-target="#detailModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden"
            // onClick={handleProfileClick}
          >
            <Image
              className={isAdmin ? 'cursor-pointer' : ''}
              src={photoUrl ? process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + photoUrl : blankProfile}
              alt={empName || ''}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              onClick={onClick}
            />
          </div>
          <p className="text-[#484848] text-xs mt-[10px] pt-[2px] text-center">{deptName + ' ' + (positionOptions?.get(position || '') ?? '')}</p>
          <p className="text-black font-bold pt-[2px] text-center">{empName}</p>
          <p className="text-cyan-500 text-xs text-center">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
