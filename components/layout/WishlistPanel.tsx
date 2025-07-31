import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useUI } from '@/context/UIContext'
import Image from 'next/image'

interface WishlistPanelProps {
  isOpen: boolean
  onClose: () => void
}

const WishlistPanel: React.FC<WishlistPanelProps> = ({ isOpen, onClose }) => {
  const { wishlistItems, removeFromWishlist } = useUI()
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  const cardVariants = {
    visible: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: -50, scale: 0.95 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
          variants={backdropVariants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          onClick={onClose}
        >
          <motion.div
            className='bg-white rounded-lg shadow-2xl w-full max-w-md m-4 p-6 relative'
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={e => e.stopPropagation()} // Prevent closing when clicking on the card
          >
            <button
              onClick={onClose}
              className='absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors'
              aria-label='Close wishlist'
            >
              <FiX size={24} />
            </button>
            <h2 className='text-2xl font-lora text-center mb-6'>My Wishlist</h2>
            <div className='space-y-4 max-h-96 overflow-y-auto'>
              {wishlistItems.length === 0 ? (
                <div className='text-center text-gray-500 py-10'>
                  <p>Your wishlist is currently empty.</p>
                  <p className='text-sm mt-2'>
                    Add items you love to see them here!
                  </p>
                </div>
              ) : (
                wishlistItems.map(item => (
                  <div key={item.id} className='flex items-center space-x-4'>
                    <div className='w-20 h-28 bg-gray-100 relative rounded-md overflow-hidden'>
                      <Image
                        src={item.images?.[0] || '/placeholder.png'}
                        alt={item.name}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <div className='flex-grow'>
                      <p className='font-semibold text-gray-800'>{item.name}</p>
                      <p className='text-sm text-gray-600'>
                        ${item.price.toFixed(2)}
                      </p>
                      <p className='text-xs text-gray-500 capitalize'>
                        {item.selectedColor} / {item.selectedSize}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className='text-gray-400 hover:text-red-500 transition-colors'
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WishlistPanel
