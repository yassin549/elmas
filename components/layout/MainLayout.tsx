import React, { useEffect } from 'react'
import { useUI } from '@/context/UIContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartPanel from '../cart/CartPanel'
import WishlistPanel from './WishlistPanel'
import SideMenu from '../SideMenu'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const {
    isCartOpen,
    toggleCart,
    isWishlistOpen,
    toggleWishlist,
    isSideMenuOpen,
    toggleSideMenu,
  } = useUI()

  useEffect(() => {
    document.body.style.overflow =
      isSideMenuOpen || isCartOpen || isWishlistOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isSideMenuOpen, isCartOpen, isWishlistOpen])

  return (
    <div className='flex flex-col min-h-screen font-sans bg-white text-gray-800'>
      <SideMenu isOpen={isSideMenuOpen} onClose={toggleSideMenu} />
      <header className='fixed top-0 left-0 w-full z-20 bg-white'>
        <Navbar />
      </header>
      <CartPanel isOpen={isCartOpen} onClose={toggleCart} />
      <WishlistPanel isOpen={isWishlistOpen} onClose={toggleWishlist} />
      <main className='flex-grow pt-[88px]'>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
