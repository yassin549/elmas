import React from 'react'
import { useUI } from '@/context/UIContext'
import { FiX, FiPlus, FiMinus } from 'react-icons/fi'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useUI()

  const panelVariants: Variants = {
    hidden: { x: '100%' },
    visible: {
      x: '0%',
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-50 backdrop-blur-sm'
          onClick={onClose}
        >
          <motion.div
            variants={panelVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={e => e.stopPropagation()}
            className='absolute right-0 top-0 w-full max-w-sm h-full bg-white text-gray-800 shadow-2xl flex flex-col font-sans'
          >
            {/* Header */}
            <div className='p-5 flex justify-between items-center border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Shopping Bag
              </h2>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-800 transition-colors'
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Cart Items */}
            <div className='flex-grow p-6 overflow-y-auto space-y-6'>
              {cartItems.length === 0 ? (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-gray-500'>Your shopping bag is empty.</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div
                    key={item.id}
                    className='flex space-x-4 border-b border-gray-200 pb-4'
                  >
                    <div className='w-20 h-28 bg-gray-100 relative rounded-md overflow-hidden'>
                      <Image
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : '/placeholder.png'
                        }
                        alt={item.name}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <div className='flex-grow flex flex-col'>
                      <p className='font-semibold text-gray-800'>{item.name}</p>
                      <p className='text-gray-600 mt-1'>
                        {item.price.toFixed(3)} TND
                      </p>
                      <div className='flex items-center mt-4 text-sm'>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition'
                        >
                          <FiMinus />
                        </button>
                        <span className='px-4 font-medium'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='h-8 w-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition'
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className='flex-grow'></div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-red-500 hover:text-red-700 transition self-end font-medium text-sm'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className='p-6 border-t border-gray-200'>
                <div className='flex justify-between items-center font-semibold text-lg mb-4'>
                  <p>Subtotal</p>
                  <p>{cartTotal.toFixed(3)} TND</p>
                </div>
                <p className='text-sm text-gray-500 mb-4'>
                  Shipping and taxes calculated at checkout.
                </p>
                <Link
                  href='/checkout'
                  onClick={onClose}
                  className='block w-full bg-black text-white text-center py-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors'
                >
                  Process Order
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CartPanel
