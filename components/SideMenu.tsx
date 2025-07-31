import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'

import { useAuth } from '@/context/AuthContext'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const menuVariants: Variants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
    exit: {
      x: '-100%',
      transition: { duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  }

  const listVariants: Variants = {
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { ease: [0.6, 0.05, 0.01, 0.9] } },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for closing the menu when clicking outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 z-30'
          />
          <motion.div
            variants={menuVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={e => e.stopPropagation()}
            className='fixed left-0 top-0 w-full max-w-sm md:max-w-lg h-full bg-white shadow-2xl flex flex-col font-sans z-40'
          >
            <div className='px-8 md:px-12 pt-10 pb-4 flex justify-end'>
              <Link href='/' onClick={onClose}>
                <h1 className='font-lora text-6xl md:text-8xl font-bold tracking-[-0.05em] text-black'>
                  ELMAS
                </h1>
              </Link>
            </div>
            <motion.nav
              variants={listVariants}
              initial='hidden'
              animate='visible'
              className='flex-grow px-8 md:px-12 pt-8 pb-8 flex flex-col'
            >
              {/* Main Navigation */}
              <div className='flex-grow'>
                <motion.div
                  variants={itemVariants}
                  className='flex space-x-6 mb-12 text-sm tracking-widest uppercase'
                >
                  <Link
                    href='/'
                    onClick={onClose}
                    className='font-semibold text-black'
                  >
                    HOME
                  </Link>
                  <Link
                    href='/about'
                    onClick={onClose}
                    className='text-gray-500 hover:text-black transition-colors'
                  >
                    ABOUT
                  </Link>
                  <Link
                    href='/contact'
                    onClick={onClose}
                    className='text-gray-500 hover:text-black transition-colors'
                  >
                    CONTACT
                  </Link>
                </motion.div>

                {/* Secondary Navigation */}
                <ul className='space-y-5 text-xs tracking-widest uppercase'>
                  {!user && (
                    <motion.li variants={itemVariants}>
                      <Link
                        href='/login'
                        onClick={onClose}
                        className='text-gray-500 hover:text-black transition-colors'
                      >
                        LOG IN
                      </Link>
                    </motion.li>
                  )}
                  <motion.li variants={itemVariants}>
                    <Link
                      href='/checkout'
                      onClick={onClose}
                      className='text-gray-500 hover:text-black transition-colors'
                    >
                      CHECKOUT
                    </Link>
                  </motion.li>
                </ul>
              </div>
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SideMenu
