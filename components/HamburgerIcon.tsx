import React from 'react'
import { motion, Variants } from 'framer-motion'

interface HamburgerIconProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  isOpen,
  onClick,
  className = '',
}) => {
  const topVariants: Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 5 }, // Adjusted for a 20px height container
  }

  const middleVariants: Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  }

  const bottomVariants: Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -5 }, // Adjusted for a 20px height container
  }

  const transition = { duration: 0.3, ease: 'easeInOut' }

  return (
    <button
      onClick={onClick}
      className={`relative w-8 h-8 ${className}`}
      aria-label='Toggle menu'
    >
      <motion.div
        className='absolute w-full h-full flex flex-col justify-between items-center'
        style={{ height: '20px', top: 'calc(50% - 10px)' }}
        animate={isOpen ? 'open' : 'closed'}
        initial={false}
      >
        <motion.div
          className='bg-gray-800 dark:bg-white rounded-full'
          style={{ width: '100%', height: '2px' }} // Thinner line
          variants={topVariants}
          transition={transition}
        />
        <motion.div
          className='bg-gray-800 dark:bg-white rounded-full'
          style={{ width: '100%', height: '2px' }} // Thinner line
          variants={middleVariants}
          transition={transition}
        />
        <motion.div
          className='bg-gray-800 dark:bg-white rounded-full'
          style={{ width: '100%', height: '2px' }} // Thinner line
          variants={bottomVariants}
          transition={transition}
        />
      </motion.div>
    </button>
  )
}

export default HamburgerIcon
