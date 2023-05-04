import Image from 'next/image';

export interface ICompanyLogoProps {
  companyNm: string;
  imgSrc: any;
}

const CompanyLogo = ({ companyNm, imgSrc }: ICompanyLogoProps) => {
  return (
    <a className="flex px-8 py-0 m-0 text-base whitespace-nowrap" href="javascript:;" target="_blank" rel="noreferrer">
      <Image src={imgSrc} className="inline w-16 h-full" alt="main_logo" />
      <span className="self-center ml-4 font-semibold text-sky-700">{companyNm}</span>
    </a>
  );
};

export default CompanyLogo;
