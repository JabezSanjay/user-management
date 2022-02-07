import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='px-10 py-7 mx-auto max-w-full bg-green-700'>
      <div className='relative flex items-center justify-between'>
        <a
          href='/'
          aria-label='Userz'
          title='Userz'
          className='inline-flex items-center'
        >
          <svg
            className='w-8 text-white'
            viewBox='0 0 24 24'
            strokeLinejoin='round'
            strokeWidth='2'
            strokeLinecap='round'
            strokeMiterlimit='10'
            stroke='currentColor'
            fill='none'
          >
            <rect x='3' y='1' width='7' height='12' />
            <rect x='3' y='17' width='7' height='6' />
            <rect x='14' y='1' width='7' height='6' />
            <rect x='14' y='11' width='7' height='12' />
          </svg>
          <span className='ml-2 text-xl font-bold tracking-wide text-white uppercase'>
            Userz
          </span>
        </a>
        <ul className='flex items-center space-x-8 lg:flex'>
          <li>
            <Link
              to='/trash'
              aria-label='Recycle Bin'
              title='Recycle Bin'
              className='font-medium tracking-wide text-white transition-colors duration-200 hover:text-emerald-50'
            >
              Recycle Bin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
