import React from 'react'

const Copyright = () => {
  return (
    <div className='bg-[#f3e9df] text-gray-600 text-xs py-4'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center'>
        <p>&copy; {new Date().getFullYear()} Elmas. All Rights Reserved.</p>
        <div className='flex space-x-4'>
          <p>Payment methods icons here</p>
        </div>
      </div>
    </div>
  )
}

export default Copyright
