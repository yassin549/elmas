import React from 'react'
import Link from 'next/link'
import { FiSearch, FiHeart } from 'react-icons/fi'
import HamburgerIcon from './HamburgerIcon'
import { useUI } from '@/context/UIContext'

const Navbar: React.FC = () => {
  const { toggleWishlist, toggleSideMenu, isSideMenuOpen } = useUI()

  return (
    <header className='relative top-0 left-0 w-full z-10 font-sans bg-white'>
      <div className='bg-[#D8B28E] text-white text-center py-2 text-sm tracking-widest font-semibold uppercase hover:bg-[#C7A17A] transition-colors'>
        SHOP WITH CONFIDENCE
      </div>
      <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Left side: Hamburger */}
          <div className='flex items-center'>
            <HamburgerIcon
              isOpen={isSideMenuOpen}
              onClick={toggleSideMenu}
              className='w-8 h-8'
            />
          </div>

          {/* Center: Logo */}
          <div className='absolute left-1/2 transform -translate-x-1/2'>
            <Link
              href='/'
              className='text-2xl md:text-3xl font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase'
            >
              Elmas
            </Link>
          </div>

          {/* Right side: Icons */}
          <div className='flex items-center justify-end space-x-4'>
            <button className='hover:text-gray-700'>
              <FiSearch className='h-6 w-6' strokeWidth={1.5} />
            </button>
            <button onClick={toggleWishlist} className='hover:text-gray-700'>
              <FiHeart className='h-6 w-6' strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
