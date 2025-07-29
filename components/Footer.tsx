import React from 'react'
import Link from 'next/link'
import { FaTiktok, FaInstagram, FaFacebookF, FaTwitter, FaPinterestP, FaYoutube, FaSpotify } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-white text-gray-800 py-8 text-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          <div className='flex items-center space-x-4'>
            <Link href='/newsletter' className='font-semibold tracking-wider hover:text-gray-600'>
              JOIN OUR NEWSLETTER
            </Link>
          </div>
          <div className='flex items-center space-x-6'>
            <a href='#' className='hover:text-gray-600'><FaTiktok /></a>
            <a href='#' className='hover:text-gray-600'><FaInstagram /></a>
            <a href='#' className='hover:text-gray-600'><FaFacebookF /></a>
            <a href='#' className='hover:text-gray-600'><FaTwitter /></a>
            <a href='#' className='hover:text-gray-600'><FaPinterestP /></a>
            <a href='#' className='hover:text-gray-600'><FaYoutube /></a>
            <a href='#' className='hover:text-gray-600'><FaSpotify /></a>
          </div>
        </div>
        <div className='mt-8 text-center text-gray-500 text-xs'>
          <p>© Elmas - ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
