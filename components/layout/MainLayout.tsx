import React, { useEffect } from 'react'
import { useUI } from '@/context/UIContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import WishlistPanel from './WishlistPanel'
import SideMenu from '../SideMenu'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isSideMenuOpen, isWishlistOpen, toggleWishlist, toggleSideMenu } =
    useUI()

  useEffect(() => {
    document.body.style.overflow =
      isSideMenuOpen || isWishlistOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isSideMenuOpen, isWishlistOpen])

  return (
    <div className='flex flex-col min-h-screen font-sans bg-white text-gray-800'>
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
      <header className='fixed top-0 left-0 w-full z-50 bg-white'>
        <Navbar />
      </header>

      <WishlistPanel isOpen={isWishlistOpen} onClose={toggleWishlist} />
      <main className='flex-grow pt-[88px]'>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
