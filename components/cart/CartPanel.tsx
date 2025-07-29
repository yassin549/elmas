import React from 'react';
import { useCart } from '@/context/CartContext';
import { FiX, FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { x: '0%', transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { x: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
  };

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
            className='absolute right-0 top-0 w-full max-w-sm h-full bg-white dark:bg-black text-black dark:text-white shadow-2xl flex flex-col font-sans'
          >
            {/* Header */}
            <div className='p-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-800'>
              <h2 className='text-sm font-normal tracking-[.2em] uppercase'>
                Shopping Bag
              </h2>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-black dark:hover:text-white transition-colors'
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Cart Items */}
            <div className='flex-grow p-6 overflow-y-auto space-y-6'>
              {cartItems.length === 0 ? (
                <div className='flex items-center justify-center h-full'>
                  <p className='text-xs text-gray-500 tracking-widest uppercase'>
                    Your shopping bag is empty.
                  </p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className='flex space-x-4'>
                    <div className='w-20 h-28 bg-gray-100 dark:bg-gray-900 relative'>
                      <Image
                        src={item.images[0] || '/placeholder.png'}
                        alt={item.name}
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                    <div className='flex-grow flex flex-col text-xs tracking-wider'>
                      <p className='uppercase'>{item.name}</p>
                      <p className='text-gray-600 dark:text-gray-400 mt-1'>
                        ${item.price.toFixed(2)}
                      </p>
                      <div className='flex items-center mt-4 text-xs'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='px-2 py-1'
                        >
                          -
                        </button>
                        <span className='px-3'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='px-2 py-1'
                        >
                          +
                        </button>
                      </div>
                      <div className='flex-grow'></div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className='text-gray-400 hover:text-black dark:hover:text-white transition self-end uppercase text-[10px] tracking-widest'
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
              <div className='p-6 border-t border-gray-200 dark:border-gray-800'>
                <div className='flex justify-between items-center text-xs tracking-widest mb-4'>
                  <p>SUBTOTAL</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className='text-[10px] text-gray-500 tracking-wider mb-4'>
                  SHIPPING OPTIONS CALCULATED AT CHECKOUT.
                </p>
                <Link href='/checkout' passHref>
                  <a
                    onClick={onClose}
                    className='block w-full bg-black text-white text-center py-3.5 text-xs font-normal tracking-widest uppercase hover:bg-gray-800 transition-colors'
                  >
                    PROCESS ORDER
                  </a>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;

