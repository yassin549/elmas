import React from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { Product } from '@/types'

interface CustomerReviewsProps {
  product: Product
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ product }) => {
  const { rating_summary } = product

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const RatingBar = ({
    percentage,
    label,
  }: {
    percentage: number
    label: string
  }) => (
    <div className='flex items-center space-x-2 text-sm'>
      <span className='text-gray-600 w-6'>{label} ★</span>
      <div className='w-full bg-gray-200 h-2 rounded-full overflow-hidden'>
        <motion.div
          className='bg-[#D8B28E] h-2 rounded-full'
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
      <span className='text-gray-600 w-10 text-right'>{percentage}%</span>
    </div>
  )

  return (
    <motion.div
      id='reviews'
      className='w-full mt-12 md:mt-20 py-12 md:py-16 font-sans bg-gray-50/50'
      initial='hidden'
      whileInView='visible'
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          className='text-center text-2xl md:text-3xl font-lora tracking-wide mb-10 md:mb-12 text-gray-800'
          variants={itemVariants}
        >
          Customer Reviews
        </motion.h2>

        <motion.div
          className='flex flex-col items-center text-center p-6 md:p-8 mb-12 bg-white rounded-xl shadow-sm border border-gray-100'
          variants={itemVariants}
        >
          <span className='text-6xl md:text-7xl font-lora text-gray-800'>
            {rating_summary.average.toFixed(1)}
          </span>
          <div className='flex my-3 text-[#D8B28E]'>
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-6 h-6 md:w-7 md:h-7 ${i < Math.round(rating_summary.average) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <p className='text-md text-gray-600'>
            Based on {rating_summary.count} reviews
          </p>
          <div className='mt-10 space-y-4 w-full max-w-sm'>
            {rating_summary.distribution.map(dist => (
              <RatingBar
                key={dist.stars}
                percentage={Math.round(
                  (dist.count / rating_summary.count) * 100
                )}
                label={String(dist.stars)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CustomerReviews
