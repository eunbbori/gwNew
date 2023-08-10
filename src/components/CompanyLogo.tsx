import Image from 'next/image';

export interface ICompanyLogoProps {
  companyNm: string;
  imgSrc: any;
}

const CompanyLogo = ({ companyNm, imgSrc }: ICompanyLogoProps) => {
  return (
    <div className="mt-5 mb-5 text-center">
      <a className="px-4 py-4 mb-3 text-base whitespace-nowrap" href="/" rel="noreferrer">
        <Image src={imgSrc} className="inline w-30 h-full" alt="main_logo" />
        {/* <span className="self-center ml-4 font-semibold text-sky-700">{companyNm}</span> */}
      </a>
    </div>
  );
};

export default CompanyLogo;
