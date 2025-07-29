import React, { useEffect, useState, useCallback } from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { Product } from '@/types'
import toast from 'react-hot-toast'
import ProductForm, { ProductFormData } from '@/components/admin/ProductForm'
import { FiTrash2 } from 'react-icons/fi'

const AdminProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch product')
      const data = await response.json()
      // The API now returns an array with 0 or 1 products
      setProduct(data.products[0] || null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not load product.'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleSave = async (data: ProductFormData) => {
    setIsSubmitting(true)
    const method = product ? 'PUT' : 'POST'
    const url = product ? `/api/products/${product.id}` : '/api/products'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save product')
      }

      toast.success(`Product ${product ? 'updated' : 'created'} successfully!`)
      fetchProduct() // Refresh data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not save product.'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!product) return
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setIsSubmitting(true)
      try {
        const response = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
        if (!response.ok) throw new Error('Failed to delete product')
        toast.success('Product deleted successfully!')
        setProduct(null) // Immediately update UI
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Could not delete product.'
        toast.error(message)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderContent = () => {
    if (loading) {
      return <div>Loading product information...</div>
    }
    if (error) {
      return <div>Error: {error}</div>
    }

    const formTitle = product ? 'Edit Product' : 'Create Product'
    const defaultValues = product ? {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      images: product.images,
    } : {}

    return (
      <>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white'>
            {formTitle}
          </h1>
          {product && (
            <button
              onClick={handleDelete}
              disabled={isSubmitting}
              className='flex items-center gap-2 bg-red-600 text-white py-2.5 px-5 text-sm font-medium tracking-widest uppercase hover:bg-red-700 disabled:bg-red-400 transition-colors duration-300 rounded-md'
            >
              <FiTrash2 />
              Delete Product
            </button>
          )}
        </div>
        <ProductForm
          onSubmit={handleSave}
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
        />
      </>
    )
  }

  return (
    <AdminLayout>
      <div className='bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg font-sans'>
        {renderContent()}
      </div>
    </AdminLayout>
  )
}

export default AdminProductPage
