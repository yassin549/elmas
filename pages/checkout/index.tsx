import React, { useState } from 'react'
import { useUI } from '@/context/UIContext'
import { FiCreditCard, FiLock, FiLoader } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import Link from 'next/link'

const CheckoutPage = () => {
  const router = useRouter()
  const { cartItems, cartTotal, clearCart } = useUI()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: 'Tunisia',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    }

    if (!formData.addressLine1.trim()) {
      errors.addressLine1 = 'Address is required'
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required'
    }

    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal code is required'
    }

    return errors
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormErrors(prev => ({ ...prev, [name]: '' })) // Clear error when field is modified
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setFormErrors({})

    try {
      // Submit order to API
      const [firstName, ...lastNameParts] = formData.fullName.trim().split(' ')
      const lastName = lastNameParts.join(' ')

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipping: {
            firstName,
            lastName,
            address: formData.addressLine1,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
            email: formData.email,
          },
          items: cartItems,
          total: cartTotal,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to place order')
      }

      const data = await response.json()
      clearCart()

      // Redirect to confirmation page
      router.push(`/order/success?orderId=${data.order.id}`)
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
      console.error('Order submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (cartItems.length === 0) {
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

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-12'>
          {/* Checkout Form (2/3 width) */}
          <div className='lg:col-span-2 bg-white rounded-xl shadow-md p-4 md:p-8'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>
              Shipping Information
            </h2>

            <form
              id='checkout-form'
              onSubmit={handleSubmit}
              className='space-y-6'
            >
              {/* Personal Info */}
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

              {/* Shipping Address */}
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

          {/* Order Summary (1/3 width) */}
          <div className='lg:col-span-1 bg-white rounded-xl shadow-md p-6 md:p-8 h-fit'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>
              Order Summary
            </h2>

            <div className='space-y-4'>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className='flex justify-between items-center border-b border-gray-200 pb-4'
                >
                  <div>
                    <p className='font-semibold text-gray-700'>{item.name}</p>
                    <p className='text-sm text-gray-500'>
                      Color: {item.selectedColor}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Size: {item.selectedSize}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className='font-semibold text-gray-800'>
                    {(item.price * item.quantity).toFixed(3)} TND
                  </p>
                </div>
              ))}
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200 space-y-3'>
              <div className='flex justify-between text-gray-600'>
                <p>Subtotal</p>
                <p className='font-medium text-gray-800'>
                  {cartTotal.toFixed(3)} TND
                </p>
              </div>
              <div className='flex justify-between text-gray-600'>
                <p>Shipping</p>
                <p className='font-medium text-gray-800'>Free</p>
              </div>
              <div className='flex justify-between font-bold text-xl text-gray-800 mt-2'>
                <p>Total</p>
                <p>{cartTotal.toFixed(3)} TND</p>
              </div>
            </div>

            <button
              type='submit'
              className='w-full mt-8 bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isLoading}
              form='checkout-form' // Link to the form in the other column
            >
              {isLoading ? (
                <FiLoader className='animate-spin' />
              ) : (
                <>
                  <FiCreditCard className='mr-2' />
                  Place Order
                </>
              )}
            </button>

            <div className='mt-6 text-center text-gray-500 text-sm flex items-center justify-center'>
              <FiLock className='mr-2' />
              Your payment and personal information is secure.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
