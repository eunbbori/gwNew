import { Inter } from 'next/font/google';
import jnFirstLogo from 'src/assets/img/logos/FAPIG.png';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-130px)] w-full justify-center items-center">
      <Image src={jnFirstLogo} className="w-90 animate-pulse" alt="main_logo" />
    </div>
  );
}
