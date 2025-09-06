import { memo } from 'react';

const Footer = () => {
  return (
      <>
        <footer className='w-full py-[24px] bg-gray-300 '>
          <div className='container'>
              <h2 className='font-bold text-center'>Footer</h2>
          </div>
        </footer>
      </>
  );
};

export default memo(Footer);