import React, { useState, useEffect } from 'react'
import { useUI } from '@/context/UIContext'
import { CartItem, Product } from '@/types'
import { FiLock, FiLoader } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import CircleLoader from '@/components/CircleLoader'

interface BuyNowItem extends CartItem {
  product: Product
}

const CheckoutPage = () => {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useUI()
  const cartItems = cart?.items ?? []

  const [buyNowItem, setBuyNowItem] = useState<BuyNowItem | null>(null)
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(true)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: 'Tunisia',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (router.isReady) {
      const { productId, quantity, size, color } = router.query

      if (productId && quantity && size && color) {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`/api/products/${productId}`)
            if (!response.ok) {
              throw new Error('Product not found.')
            }
            const product: Product = await response.json()
            const selectedColorData = product.colors.find(c => c.name === color)
            const imageSource =
              selectedColorData || (product.colors && product.colors[0])

            setBuyNowItem({
              ...product,
              id: `${product.id}-${size}-${color}`,
              product,
              quantity: parseInt(quantity as string, 10),
              selectedSize: size as string,
              selectedColor: color as string,
              images: imageSource ? imageSource.media.map(m => m.url) : [],
            })
          } catch (error) {
            console.error('Failed to fetch product for Buy Now:', error)
            toast.error('Could not load item details.')
            setCheckoutError(
              'There was a problem loading your item. Please try again or contact support.'
            )
          } finally {
            setIsBuyNowLoading(false)
          }
        }
        fetchProduct()
      } else {
        setIsBuyNowLoading(false)
      }
    }
  }, [router.isReady, router.query])

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!formData.addressLine1.trim())
      errors.addressLine1 = 'Address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.postalCode.trim())
      errors.postalCode = 'Postal code is required'
    return errors
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setFormErrors({})

    const [firstName, ...lastNameParts] = formData.fullName.trim().split(' ')
    const lastName = lastNameParts.join(' ')

    const orderPayload = {
      shipping: {
        firstName,
        lastName,
        address: formData.addressLine1,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        email: formData.email,
      },
      items: buyNowItem ? [buyNowItem] : cartItems,
      total: buyNowItem ? buyNowItem.price * buyNowItem.quantity : cartTotal,
    }

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) throw new Error('Failed to place order')

      const data = await response.json()
      if (!buyNowItem) {
        clearCart()
      }

      router.push(`/checkout/confirmation?orderId=${data.order.id}`)
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
      console.error('Order submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isBuyNowLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircleLoader visible={true} />
      </div>
    )
  }

  if (checkoutError) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4 text-red-500'>
            An Error Occurred
          </h1>
          <p className='text-gray-400'>{checkoutError}</p>
          <Link href='/' className='inline-block'>
            <button className='mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all'>
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (!buyNowItem && cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>Your cart is empty</h1>
          <p className='text-gray-400'>
            Please add some items to your cart before proceeding to checkout.
          </p>
          <Link href='/' className='inline-block'>
            <button className='mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const itemsToDisplay = buyNowItem ? [buyNowItem] : cartItems
  const totalAmount = buyNowItem
    ? buyNowItem.price * buyNowItem.quantity
    : cartTotal

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-12'>
          {/* Checkout Form */}
          <div className='lg:col-span-2 bg-white rounded-xl shadow-md p-4 md:p-8'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>
              Shipping Information
            </h2>
            <form
              id='checkout-form'
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              {/* Form fields */}
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    required
                  />
                  {formErrors.fullName && (
                    <p className='text-sm text-red-500 mt-1'>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    required
                  />
                  {formErrors.email && (
                    <p className='text-sm text-red-500 mt-1'>
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>
                    Phone
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    required
                  />
                  {formErrors.phone && (
                    <p className='text-sm text-red-500 mt-1'>
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className='space-y-4 pt-4'>
                <h3 className='text-xl font-semibold text-gray-700'>
                  Shipping Address
                </h3>
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>
                    Address
                  </label>
                  <input
                    type='text'
                    name='addressLine1'
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    required
                  />
                  {formErrors.addressLine1 && (
                    <p className='text-sm text-red-500 mt-1'>
                      {formErrors.addressLine1}
                    </p>
                  )}
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      City
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      required
                    />
                    {formErrors.city && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-600 mb-1'>
                      Postal Code
                    </label>
                    <input
                      type='text'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      required
                    />
                    {formErrors.postalCode && (
                      <p className='text-sm text-red-500 mt-1'>
                        {formErrors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>
                    Country
                  </label>
                  <select
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  >
                    <option value='Tunisia'>Tunisia</option>
                    <option value='United States'>United States</option>
                    <option value='Canada'>Canada</option>
                    <option value='United Kingdom'>United Kingdom</option>
                    <option value='Australia'>Australia</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1 bg-white rounded-xl shadow-md p-6 md:p-8 h-fit'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>
              Order Summary
            </h2>
            <div className='space-y-4'>
              {itemsToDisplay.map(item => (
                <div key={item.id} className='flex items-center space-x-4'>
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    width={80}
                    height={80}
                    className='w-20 h-20 object-cover rounded-lg'
                  />
                  <div className='flex-1'>
                    <p className='font-semibold text-gray-800'>{item.name}</p>
                    <p className='text-sm text-gray-500'>
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className='font-semibold text-gray-800'>
                    {(item.price * item.quantity).toFixed(3)} TND
                  </p>
                </div>
              ))}
            </div>
            <div className='border-t border-gray-200 mt-6 pt-6 space-y-4'>
              <div className='flex justify-between text-gray-600'>
                <span>Subtotal</span>
                <span>{totalAmount.toFixed(3)} TND</span>
              </div>
              <div className='flex justify-between text-gray-600'>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className='flex justify-between font-bold text-lg text-gray-800'>
                <span>Total</span>
                <span>{totalAmount.toFixed(3)} TND</span>
              </div>
            </div>
            <button
              type='submit'
              form='checkout-form'
              className='w-full mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center space-x-2 disabled:opacity-50'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FiLoader className='animate-spin' />
              ) : (
                <FiLock />
              )}
              <span>{isSubmitting ? 'Processing...' : 'Place Order'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
