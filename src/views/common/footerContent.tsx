import FooterItem, { IFooterItemProps } from './footer/footerItem';

export default function FooterContent() {
  const footerItems: IFooterItemProps[] = [
    {
      url: 'https://www.creative-tim.com',
      name: '회사 소개',
    },
    {
      url: 'https://www.creative-tim.com/presentation',
      name: 'About Us',
    },
    {
      url: 'https://creative-tim.com/blog',
      name: '구매 문의',
    },
    {
      url: 'https://www.creative-tim.com/license',
      name: '요금제',
    },
  ];

  return (
    <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
      <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
        {footerItems.map((e, id) => (
          <FooterItem key={id} {...e} />
        ))}
      </ul>
    </div>
  );
}
