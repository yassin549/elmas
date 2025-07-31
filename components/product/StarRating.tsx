import React from 'react'
import { FiStar } from 'react-icons/fi'

interface StarRatingProps {
  rating: number
  count: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating, count }) => (
  <div className='flex items-center space-x-2 text-sm text-gray-600'>
    <div className='flex items-center text-[#D8B28E]'>
      {[...Array(5)].map((_, i) => (
        <FiStar
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-current' : ''}`}
        />
      ))}
    </div>
    <span className='text-gray-400 font-light'>{Math.round(rating)}</span>
    <span className='text-gray-300'>|</span>
    {count > 0 && (
      <a href='#reviews' className='font-bold hover:underline'>
        {count} Review{count !== 1 ? 's' : ''}
      </a>
    )}
  </div>
)

export default StarRating
