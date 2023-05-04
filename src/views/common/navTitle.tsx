import Image from 'next/image';

export interface INavTitleProps {
  navTitle: string;
  imgSrc: any;
}

export default function NavTitle({ navTitle, imgSrc }: INavTitleProps) {
  return (
    <nav>
      <Image className="inline" src={imgSrc} alt={navTitle} />
      {'  '}
      <h6 className="inline mb-0 font-bold capitalize">{navTitle}</h6>
    </nav>
  );
}
