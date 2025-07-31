import { useState } from 'react'
import { FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi'

const navLinks = [
  { name: 'NEW ARRIVALS', href: '#' },
  { name: 'BEST SELLERS', href: '#' },
  { name: 'SPRING / SUMMER', href: '#' },
  { name: 'DRESSES', href: '#' },
  { name: 'THE WEDDING SUITE', href: '#' },
  { name: 'CLOTHING', href: '#' },
  { name: 'COLLECTIONS', href: '#' },
  { name: 'EDITS', href: '#' },
  { name: 'SHOES', href: '#' },
  { name: 'ACCESSORIES', href: '#' },
  { name: 'END OF SEASON SALE', href: '#' },
]

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className='bg-white shadow-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <a href='#' className='text-3xl font-bold tracking-wider uppercase'>
              Elmas
            </a>
          </div>

          {/* Desktop Utility Links */}
          <div className='hidden lg:flex items-center justify-end flex-grow space-x-5 text-xs uppercase tracking-wider'>
            <a href='#' className='text-gray-500 hover:text-black'>
              Rechercher
            </a>
            <a href='#' className='text-gray-500 hover:text-black'>
              Se Connecter
            </a>
            <a href='#' className='text-gray-500 hover:text-black'>
              <FiUser />
            </a>
            <a href='#' className='text-gray-500 hover:text-black'>
              <FiHeart />
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-black flex items-center'
            >
              <FiShoppingBag />
              <span className='ml-1'>(0)</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className='lg:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
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
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden absolute top-20 left-0 w-full bg-white z-20'>
          <ul className='flex flex-col items-center space-y-4 py-8'>
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className='text-gray-500 hover:text-black text-sm uppercase tracking-wider'
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
