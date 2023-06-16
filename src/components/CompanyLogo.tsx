import Image from 'next/image';

export interface ICompanyLogoProps {
  companyNm: string;
  imgSrc: any;
}

const CompanyLogo = ({ companyNm, imgSrc }: ICompanyLogoProps) => {
  return (
    <a className="flex px-8 py-6 mb-3 text-base whitespace-nowrap" href="javascript:;" target="_blank" rel="noreferrer">
      <Image src={imgSrc} className="inline w-8 h-full" alt="main_logo" />
      <span className="self-center ml-4 font-semibold text-sky-700">{companyNm}</span>
    </a>
  );
};

export default CompanyLogo;
