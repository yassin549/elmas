import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface NavbarProps {
  onCartToggle: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onCartToggle }) => {
  const { cartCount } = useCart()

  return (
    <>
      <header className='fixed top-0 left-0 w-full z-10 font-sans bg-transparent'>
        <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Left side: Hamburger */}
            <div className='flex-shrink-0'></div>

            {/* Right side: Links */}
            <nav className='flex items-center space-x-6 text-xs uppercase tracking-wider'>
              <Link
                href='/contact'
                className='hover:text-gray-600 underline underline-offset-4'
              >
                RECHERCHER
              </Link>
              <Link href='/login' className='hover:text-gray-600'>
                SE CONNECTER
              </Link>
              <Link href='/contact' className='hover:text-gray-600'>
                AIDE
              </Link>
              <button onClick={onCartToggle} className='hover:text-gray-600'>
                PANIER ({cartCount})
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
