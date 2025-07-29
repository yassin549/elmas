import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

interface SearchBarProps {
  isOpen: boolean
  onClose: () => void
}

const searchVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: { opacity: 1, width: '100%' },
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={searchVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className='flex items-center justify-end w-full'
        >
          <input
            type='text'
            placeholder='SEARCH'
            className='w-full bg-transparent border-b border-gray-800 focus:outline-none text-sm font-semibold tracking-wider'
            autoFocus
          />
          <button onClick={onClose} className='ml-4 text-gray-800'>
            <FiX size={20} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchBar
