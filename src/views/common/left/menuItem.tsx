import Image from 'next/image';

export interface IMenuItemProps {
  menuNm: string;
  imgSrc: any;
  url: string;
  selected?: boolean;
}

export default function MenuItem({ menuNm, imgSrc, url, selected }: IMenuItemProps) {
  const anchorClass = 'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors ';
  const divClass = 'shadow-soft-2xl mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 ';
  const anchorSelectedClass = 'shadow-soft-xl ounded-lg bg-white font-semibold text-slate-700';
  const divSelectedClass = 'bg-gradient-to-tl from-purple-700 to-pink-500';

  return (
    <li className="mt-0.5 w-full">
      <a className={anchorClass + (selected ? anchorSelectedClass : '')} href={url}>
        <div className={divClass + (selected ? divSelectedClass : '')}>
          <Image src={imgSrc} alt={menuNm} />
        </div>
        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">{menuNm}</span>
      </a>
    </li>
  );
}
