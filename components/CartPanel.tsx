import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, cartTotal } = useCart();

  const panelVariants: Variants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] } },
    exit: { x: '100%', transition: { duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black bg-opacity-50 z-40'
          />
          {/* Panel */}
          <motion.div
            variants={panelVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={e => e.stopPropagation()}
            className='fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-2xl flex flex-col font-sans z-50'
          >
            <div className='flex justify-between items-center p-6 border-b'>
              <h2 className='text-lg font-semibold uppercase tracking-wider'>Panier</h2>
              <button onClick={onClose} className='text-2xl'>
                <FiX />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className='flex-grow flex flex-col justify-center items-center text-center p-6'>
                <p className='text-gray-500'>Votre panier est vide.</p>
                <Link href='/' onClick={onClose} className='mt-4 px-6 py-2 bg-black text-white text-sm uppercase tracking-wider'>
                  Continuer vos achats
                </Link>
              </div>
            ) : (
              <div className='flex-grow overflow-y-auto p-6'>
                {cartItems.map(item => (
                  <div key={item.id} className='flex items-center space-x-4 mb-4'>
                    <Image src={item.images[0]} alt={item.name} width={80} height={120} className='object-cover' />
                    <div className='flex-grow'>
                      <p className='font-semibold text-sm'>{item.name}</p>
                      <p className='text-xs text-gray-500'>Quantité: {item.quantity}</p>
                      <p className='text-sm font-bold'>{(item.price * item.quantity).toFixed(2)} TND</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className='text-gray-400 hover:text-red-500'>
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className='p-6 border-t'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='text-lg font-semibold uppercase'>Sous-total</span>
                  <span className='text-lg font-bold'>{cartTotal.toFixed(2)} TND</span>
                </div>
                <Link href='/checkout' onClick={onClose} className='w-full block text-center py-3 bg-black text-white text-sm uppercase tracking-wider'>
                  Passer la commande
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
