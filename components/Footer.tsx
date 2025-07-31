import React from 'react'
import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa'
import { FiArrowUp } from 'react-icons/fi'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    'Customer Care': [
      { name: 'Shipping & Delivery', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Size Guide', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
    Information: [
      { name: 'Help And FAQs', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Sustainability', href: '#' },
      { name: 'Refund Policy', href: '#' },
      { name: 'Student Discount', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Terms Of Service', href: '#' },
      { name: 'Promotions', href: '#' },
      { name: 'About Us', href: '#' },
    ],
  }

  return (
    <footer className='bg-[#f3e9df] text-gray-700 font-sans relative pt-12 pb-20 md:pb-8'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='border-t border-gray-300 w-full absolute top-0 left-0'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4 md:pr-8'>
            <p className='text-xs leading-relaxed'>
              At Elmas, We Believe In Celebrating Individuality And Making
              Fashion Fun. Our Mission Is To Empower Everyone To Look And Feel
              Their Best, No Matter The Occasion.
            </p>
            <div className='flex space-x-3 pt-2'>
              <a
                href='#'
                className='w-8 h-8 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 transition-colors'
              >
                <FaFacebookF />
              </a>
              <a
                href='#'
                className='w-8 h-8 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 transition-colors'
              >
                <FaPinterestP />
              </a>
              <a
                href='#'
                className='w-8 h-8 flex items-center justify-center bg-white text-gray-700 hover:bg-gray-200 transition-colors'
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className='font-semibold text-sm tracking-wider mb-4'>
                {title}
              </h3>
              <ul className='space-y-2'>
                {links.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className='text-xs hover:underline'>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className='font-semibold text-sm tracking-wider mb-4'>
              Stores
            </h3>
            <p className='text-xs'>Kawana Shopping World, Sunshine Coast</p>
          </div>
        </div>

        <div className='border-t border-gray-300 mt-8 pt-4 text-xs text-gray-600 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-2 md:space-y-0'>
          <p>&copy; {new Date().getFullYear()} Elmas. All Rights Reserved.</p>
          <div>
            {/* Payment method icons can go here */}
            <p>Payment methods icons here</p>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className='absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-black text-white w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-800 transition-colors'
        aria-label='Back to top'
      >
        <FiArrowUp className='w-5 h-5' />
      </button>
    </footer>
  )
}

export default Footer
