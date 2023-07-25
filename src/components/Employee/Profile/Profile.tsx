import React from 'react';
import Image from 'next/image';

import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import { TiDeleteOutline } from 'react-icons/ti';
import { TiDelete } from 'react-icons/ti';
import swal from 'sweetalert';

export interface IProfileProps {
  empName?: string | null;
  empId?: number;
  photoUrl?: string;
  deptName?: string | null;
  position?: string | null;
  positionOptions: Map<string, string>;
  onClick?: () => void;
}

const testHandler = (id: number | undefined) => {
  console.log('클릭1111', id);

  swal({
    title: '정말 삭제하시겠습니까?',
    text: '한번 삭제하시면 되돌릴 수 없습니다.',
    icon: 'warning',
    buttons: ['취소', '삭제'],
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal('삭제됐습니다.', {
        icon: 'success',
      });
    }
  });
  // 삭제 api 적용
};

const Profile = ({ empName, empId, photoUrl, deptName, position, positionOptions, onClick }: IProfileProps) => {
  return (
    <div className="mr-[35px] mb-[75px]">
      <div className="flex">
        <div className="w-[144px] h-[144px]">
          <div
            data-te-toggle="modal"
            data-te-target="#detailModal"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="w-[144px] h-[144px] relative rounded-[8px] overflow-hidden"
          >
            <Image
              className="cursor-pointer"
              src={photoUrl ? process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + photoUrl : blankProfile}
              alt={empName || ''}
              width={144}
              height={144}
              onClick={onClick}
            />
          </div>
          <p className="text-[#484848] text-xs text-[16px] mt-[10px] pt-[2px] text-center">{deptName + ' ' + (positionOptions?.get(position || '') ?? '')}</p>
          <p className="text-black font-bold text-[16px] pt-[2px] text-center">{empName}</p>
        </div>
        <div className="">
          <button type="button" onClick={() => testHandler(empId)} className="text-xl text-red-600">
            <TiDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
