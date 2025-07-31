import React, { useState, useEffect } from 'react'
import { motion, Transition } from 'framer-motion'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const transition: Transition = {
    duration: 0.3,
    ease: 'easeInOut',
  }

  const lineProps = {
    initial: false,
    transition,
    className:
      'bg-[#111]/80 group-hover:bg-[#111]/100 absolute w-7 h-[0.5px] left-[2px] pointer-events-none md:w-14 md:h-[1px] md:left-[4px]',
  }

  return (
    <button
      onClick={onClick}
      className={`group relative w-8 h-8 md:w-16 md:h-16 ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <motion.div
        {...lineProps}
        animate={{
          y: isOpen ? (isMobile ? 10 : 20) : 0,
          rotate: isOpen ? 45 : 0,
        }}
        className={`${lineProps.className} top-[6px] md:top-[12px]`}
      />
      <motion.div
        {...lineProps}
        animate={{ opacity: isOpen ? 0 : 1 }}
        className={`${lineProps.className} top-[16px] md:top-[32px]`}
      />
      <motion.div
        {...lineProps}
        animate={{
          y: isOpen ? (isMobile ? -10 : -20) : 0,
          rotate: isOpen ? -45 : 0,
        }}
        className={`${lineProps.className} top-[26px] md:top-[52px]`}
      />
    </button>
  )
}

export default HamburgerIcon
