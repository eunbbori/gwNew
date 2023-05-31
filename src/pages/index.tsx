import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

import Frame from './[slug]';
import dynamic from 'next/dynamic';
const DynamicSideMenu = dynamic(() => import('@/components/SideMenu'), {
  ssr: false,
});
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <DynamicSideMenu />
    </>
  );
}
