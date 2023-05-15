import React from 'react';
import Image from 'next/image';

import jnFirstLogo from 'src/assets/img/jnfirst.png';

const Footer = () => {
  return (
    <footer className="w-11/12 min-h-0 absolute tracking-tighter">
      <section className="text-sm mb-[20px]">
        <hr className="w-full h-px mt-5 bg-gray-200 border-0 dark:bg-gray-700" />
        <nav className="flex justify-evenly w-3/12 mt-3">
          <a href="#">회사소개</a>
          <a href="#">이용약관 및 규칙</a>
          <a href="#">구매문의</a>
          <a href="#">요금제</a>
        </nav>
        {/* <hr className="h-px mt-3 bg-gray-200 border-0 dark:bg-gray-700" /> */}
      </section>
      {/* <section className="flex text-xs mt-7 ml-7">
        <a href="javascript:;" target="_blank" rel="noreferrer">
          <Image src={jnFirstLogo} className="inline w-20 h-full" alt="main_logo" />
        </a>
        <div className="ml-6">
          <p>(주)J&First 대표 신정자/주소:경기 성남시 분당구 황새울로360번길 21, 901호 </p>
          <p>사업자등록번호:597-86-00041/통신판매업신고 : 제2023-경기성남-00000호</p>
          <p>개인정보 보호책임자 : 김정규</p>
          <br></br>
          <p className="font-bold">Copyright © J&First Co.,Ltd. All Rights Reserved</p>
        </div>
      </section> */}
    </footer>
  );
};

export default Footer;
