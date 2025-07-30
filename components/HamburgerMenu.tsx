import React from 'react'

interface HamburgerMenuProps {
  isOpen: boolean
  toggle: () => void
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggle }) => {
  const lineStyle = 'absolute h-px w-24 bg-black transition-all duration-300'

  return (
    <button
      onClick={toggle}
      className='fixed top-0 left-6 z-50 w-48 h-48 border-none bg-transparent -mt-5'
    >
      <div className='relative w-full h-full flex items-center justify-center'>
        <div
          className={`${lineStyle}`}
          style={{
            top: isOpen ? '50%' : 'calc(50% - 20px)',
            transform: isOpen ? 'rotate(45deg)' : 'none',
          }}
        />
        <div
          className={`${lineStyle}`}
          style={{ top: '50%', opacity: isOpen ? 0 : 1 }}
        />
        <div
          className={`${lineStyle}`}
          style={{
            top: isOpen ? '50%' : 'calc(50% + 20px)',
            transform: isOpen ? 'rotate(-45deg)' : 'none',
          }}
        />
      </div>
    </button>
  )
}

export default HamburgerMenu
