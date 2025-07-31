import React, { useState, useEffect } from 'react'
import { useUI } from '@/context/UIContext'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartPanel from '../cart/CartPanel'
import WishlistPanel from './WishlistPanel'
import SideMenu from '../SideMenu'
import HamburgerMenu from '../HamburgerMenu'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const { isCartOpen, toggleCart, isWishlistOpen, toggleWishlist } = useUI()

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen || isCartOpen || isWishlistOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen, isCartOpen, isWishlistOpen])

  return (
    <div className='flex flex-col min-h-screen font-sans bg-white text-gray-800'>
      <HamburgerMenu isOpen={isMenuOpen} toggle={toggleMenu} />
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
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
