import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import CartPanel from '../cart/CartPanel'
import SideMenu from '../SideMenu';
import HamburgerMenu from '../HamburgerMenu';

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isCartOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen, isCartOpen])

  return (
    <div className='flex flex-col min-h-screen font-sans bg-white text-gray-800'>
      <HamburgerMenu isOpen={isMenuOpen} toggle={toggleMenu} />
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <Navbar toggleMenu={toggleMenu} onCartToggle={toggleCart} />
      <CartPanel isOpen={isCartOpen} onClose={toggleCart} />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
