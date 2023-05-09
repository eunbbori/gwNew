import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';

import Frame from './[slug]';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Frame />
    </>
  );
}
