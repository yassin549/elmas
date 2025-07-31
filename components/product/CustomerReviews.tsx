import React from 'react'
import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import { Product } from '@/types'

interface CustomerReviewsProps {
  product: Product
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ product }) => {
  const { rating_summary, reviews } = product

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
      className='w-full mt-20 py-16 font-sans bg-gray-50/50'
      initial='hidden'
      whileInView='visible'
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.h2
          className='text-center text-3xl font-lora tracking-wide mb-12 text-gray-800'
          variants={itemVariants}
        >
          Customer Reviews
        </motion.h2>

        <motion.div
          className='flex flex-col items-center text-center p-8 mb-12 bg-white rounded-xl shadow-sm border border-gray-100'
          variants={itemVariants}
        >
          <span className='text-7xl font-lora text-gray-800'>
            {rating_summary.average.toFixed(1)}
          </span>
          <div className='flex my-3 text-[#D8B28E]'>
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-7 h-7 ${i < Math.round(rating_summary.average) ? 'fill-current' : ''}`}
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

        <div className='flex space-x-8 pb-4 overflow-x-auto'>
          {reviews.map(review => (
            <motion.div
              key={review.id}
              className='bg-white p-6 rounded-lg shadow-md border border-gray-100 flex-shrink-0 w-96'
              variants={itemVariants}
            >
              <div className='flex items-center mb-3'>
                <div className='flex text-[#D8B28E]'>
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <h3 className='font-semibold text-lg font-lora tracking-wide ml-4'>
                  {review.title}
                </h3>
              </div>
              <p className='text-gray-700 text-sm leading-relaxed mb-4'>
                {review.content}
              </p>
              <p className='text-xs text-gray-500 text-right'>
                {review.author.toUpperCase()} on{' '}
                {new Date(review.date).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default CustomerReviews
