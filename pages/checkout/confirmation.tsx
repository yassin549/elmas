import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiCheckCircle, FiTruck, FiClock, FiMapPin } from 'react-icons/fi'
import CircleLoader from '@/components/CircleLoader'
import { Order } from '@/types'

interface OrderConfirmationProps {
  order: Order
}

const OrderConfirmationDisplay: React.FC<OrderConfirmationProps> = ({
  order,
}) => {
  const { id, total, shipping, createdAt } = order

  return (
    <div className='container mx-auto px-4 py-8 md:py-16'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <FiCheckCircle className='w-16 h-16 md:w-24 md:h-24 mx-auto text-green-400 mb-4' />
          <h1 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4'>
            Thank You for Your Order!
          </h1>
          <p className='text-gray-400'>
            Your order has been successfully placed and is being processed.
          </p>
        </div>

        <div className='bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-xl font-bold text-white'>Order Summary</h2>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-gray-400'>Order Number</p>
                  <p className='font-medium text-white'>#{id}</p>
                </div>
                <div>
                  <p className='text-gray-400'>Order Date</p>
                  <p className='font-medium text-white'>
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-bold text-white'>
                Shipping Information
              </h2>
              <div className='flex items-center space-x-2'>
                <FiMapPin className='w-5 h-5 text-blue-400' />
                <div>
                  <p className='font-medium text-white'>
                    {shipping.firstName} {shipping.lastName}
                  </p>
                  <p className='text-gray-400'>{shipping.address}</p>
                  <p className='text-gray-400'>
                    {shipping.city}, {shipping.postalCode}
                  </p>
                  <p className='text-gray-400'>{shipping.country}</p>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-bold text-white'>Order Status</h2>
              <div className='bg-white/5 dark:bg-gray-800/50 p-4 rounded-lg border border-white/10'>
                <div className='flex items-center space-x-4'>
                  <FiTruck className='w-6 h-6 text-yellow-400' />
                  <div>
                    <p className='text-sm font-medium text-white'>Processing</p>
                    <p className='text-sm text-gray-400'>
                      Your order is being prepared
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-bold text-white'>
                Estimated Delivery
              </h2>
              <div className='flex items-center space-x-2'>
                <FiClock className='w-5 h-5 text-blue-400' />
                <div>
                  <p className='font-medium text-white'>3-5 business days</p>
                  <p className='text-sm text-gray-400'>Free shipping</p>
                </div>
              </div>
            </div>

            <div className='border-t border-white/10 pt-4 text-right'>
              <p className='text-xl font-bold text-white'>
                Total: {total.toFixed(3)} TND
              </p>
            </div>
          </div>
        </div>

        <div className='text-center mt-12'>
          <Link href='/'>
            <button className='w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all'>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ConfirmationPage = () => {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (router.isReady) {
      const { orderId } = router.query

      if (typeof orderId === 'string') {
        const fetchOrder = async () => {
          try {
            const response = await fetch(`/api/orders/${orderId}`)
            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.message || 'Order not found.')
            }
            const data: Order = await response.json()
            setOrder(data)
          } catch (err) {
            setError((err as Error).message)
          } finally {
            setIsLoading(false)
          }
        }
        fetchOrder()
      } else {
        setError('Order ID is missing or invalid.')
        setIsLoading(false)
      }
    }
  }, [router.isReady, router.query])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CircleLoader visible={true} />
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-2xl text-red-500'>{error}</h1>
        <Link href='/'>
          <button className='mt-4 text-blue-400 hover:underline'>
            Go to Homepage
          </button>
        </Link>
      </div>
    )
  }

  if (!order) {
    return null // Or a fallback UI
  }

  return <OrderConfirmationDisplay order={order} />
}

export default ConfirmationPage
