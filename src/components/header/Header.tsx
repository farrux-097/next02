import { memo } from 'react';

const Header = () => {
  return (
    <>
      <header className='w-full py-[24px] bg-green-200'>
          <div className='container'>
              <h2 className='font-bold'>Header</h2>
          </div>
      </header>
    </>
  );
};

export default memo(Header);