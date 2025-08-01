import React from 'react'
import Link from 'next/link'

import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    'Customer Care': [
      { name: 'Shipping & Delivery', href: '/about' },
      { name: 'Returns', href: '/about' },
      { name: 'Size Guide', href: '/about' },
      { name: 'Privacy Policy', href: '/about' },
    ],
    Information: [
      { name: 'Help And FAQs', href: '/about' },
      { name: 'Contact', href: '/about' },
      { name: 'Careers', href: '/about' },
      { name: 'Sustainability', href: '/about' },
      { name: 'Refund Policy', href: '/about' },
      { name: 'Student Discount', href: '/about' },
      { name: 'Blog', href: '/about' },
      { name: 'Terms Of Service', href: '/about' },
      { name: 'Promotions', href: '/about' },
      { name: 'About Us', href: '/about' },
    ],
  }

  return (
    <footer className='bg-[#f3e9df] text-gray-700 font-sans relative pt-12 pb-8'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-300 w-full absolute top-0 left-0'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* About Section */}
          <div className='space-y-4 pr-8'>
            <p className='text-xs leading-relaxed'>
              At Billy J, We Believe In Celebrating Individuality And Making
              Fashion Fun. Our Mission Is To Empower Everyone To Look And Feel
              Their Best, No Matter The Occasion.
            </p>
            <div className='flex space-x-3 pt-2'>
              <Link
                href='/about'
                className='w-8 h-8 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 transition-colors'
              >
                <FaFacebookF />
              </Link>
              <Link
                href='/about'
                className='w-8 h-8 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 transition-colors'
              >
                <FaPinterestP />
              </Link>
              <Link
                href='/about'
                className='w-8 h-8 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 transition-colors'
              >
                <FaInstagram />
              </Link>
            </div>
          </div>

          {/* Customer Care & Information Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className='font-semibold text-sm tracking-wider mb-4'>
                {title}
              </h3>
              <ul className='space-y-2'>
                {links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className='text-xs hover:underline'>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stores Section */}
          <div>
            <h3 className='font-semibold text-sm tracking-wider mb-4'>
              Stores
            </h3>
            <p className='text-xs'>Kawana Shopping World, Sunshine Coast</p>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className='absolute bottom-4 right-4 bg-black text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-800 transition-colors'
        aria-label='Back to top'
      >
        <FiArrowUp className='w-5 h-5' />
      </button>
    </footer>
  )
}

export default Footer
