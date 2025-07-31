import React from 'react'
import Link from 'next/link'
import { FiSearch, FiShoppingBag, FiHeart } from 'react-icons/fi'
import { useUI } from '@/context/UIContext'

const Navbar: React.FC = () => {
  const { cartCount, toggleCart, toggleWishlist, toggleSideMenu } = useUI()

  return (
    <header className='relative top-0 left-0 w-full z-10 font-sans bg-white'>
      <div className='bg-[#D8B28E] text-white text-center py-2 text-sm tracking-widest font-semibold uppercase hover:bg-[#C7A17A] transition-colors'>
        SHOP WITH CONFIDENCE
      </div>
      <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Left side: Hamburger */}
          <div className='flex-1 flex justify-start'>
            <button
              onClick={toggleSideMenu}
              className='text-gray-600 hover:text-gray-800'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <div className='flex-1 flex justify-center'>
            <Link
              href='/'
              className='text-2xl md:text-3xl font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase'
            >
              Elmas
            </Link>
          </div>

          {/* Right side: Links */}
          <div className='flex-1 flex justify-end items-center'>
            <div className='flex items-center justify-end space-x-3 md:space-x-6 text-sm tracking-wider'>
              <Link
                href='/account'
                className='hidden md:block hover:text-gray-700 font-semibold uppercase'
              >
                LOG IN
              </Link>
              <button className='hover:text-gray-700'>
                <FiSearch className='h-6 w-6' strokeWidth={1.5} />
              </button>
              <button onClick={toggleWishlist} className='hover:text-gray-700'>
                <FiHeart className='h-6 w-6' strokeWidth={1.5} />
              </button>
              <button
                onClick={toggleCart}
                className='relative hover:text-gray-700'
              >
                <FiShoppingBag className='h-6 w-6' strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className='absolute -top-1 -right-1.5 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-black rounded-full'>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
