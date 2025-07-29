import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AdminLayout from '@/layouts/AdminLayout'
import ProductForm, { ProductFormData } from '@/components/admin/ProductForm'
import toast from 'react-hot-toast'

const NewProductPage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create product')
      }

      toast.success('Product created successfully!')
      router.push('/admin/products')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not create product.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className='bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg font-sans'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white'>
            Create New Product
          </h1>
          <Link
            href='/admin/products'
            className='text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors'
          >
            &larr; Back to Products
          </Link>
        </div>
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </AdminLayout>
  )
}

export default NewProductPage
