import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface AddToCartNotificationProps {
  onClose: () => void
}

const AddToCartNotification: React.FC<AddToCartNotificationProps> = ({
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='fixed bottom-5 right-5 bg-white p-6 rounded-lg shadow-2xl w-80 border border-gray-200 z-50'
    >
      <p className='text-lg font-semibold text-gray-800 mb-4'>
        Ajouté au panier!
      </p>
      <div className='flex flex-col space-y-3'>
        <Link
          href='/checkout'
          className='w-full text-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium'
        >
          COMMANDER
        </Link>
        <button
          onClick={onClose}
          className='w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium'
        >
          CONTINUER MES ACHATS
        </button>
      </div>
    </motion.div>
  )
}

export default AddToCartNotification
