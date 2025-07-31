import React from 'react'
import { Toaster } from 'react-hot-toast'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-black'>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#333',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          },
          error: {
            style: {
              background: 'rgba(255, 50, 50, 0.8)',
              color: '#fff',
            },
          },
        }}
      />
      <main className='flex-1 p-4 md:p-8'>{children}</main>
    </div>
  )
}

export default AdminLayout
