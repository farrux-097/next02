import Link from 'next/link';
import { memo } from 'react';

const Header = () => {
  return (
    <>
      <header className='w-full py-[24px] bg-green-200'>
          <div className='container flex items-center justify-center gap-4 '>
              <Link href={"/"} className='font-bold'>Header</Link>
              <Link href={"/signUp"}>Sign-up</Link>
          </div>
      </header>
    </>
  );
};

export default memo(Header);