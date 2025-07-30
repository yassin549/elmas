import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import AdminLayout from '@/layouts/AdminLayout'
import { Order, OrderStatus } from '@/types'
import {
  FiArrowLeft,
  FiBox,
  FiUser,
  FiMapPin,
  FiCreditCard,
  FiLoader,
  FiSave,
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const validStatuses: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

const OrderDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { mutate } = useSWRConfig()

  const { data: order, error } = useSWR<Order>(
    id ? `/api/orders/${id}` : null,
    fetcher
  )
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (order && order.status) {
      setSelectedStatus(order.status)
    }
  }, [order])

  if (!id) return null

  if (error)
    return (
      <AdminLayout>
        <div className='text-red-500'>Failed to load order details.</div>
      </AdminLayout>
    )
  if (!order)
    return (
      <AdminLayout>
        <div className='flex justify-center items-center h-full'>
          <FiLoader className='animate-spin text-2xl' />
        </div>
      </AdminLayout>
    )

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return
    setIsUpdating(true)
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selectedStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update status')
      }

      const updatedOrder = await res.json()
      // Update the local cache for this specific order immediately
      mutate(`/api/orders/${id}`, updatedOrder, false)
      // Trigger a revalidation of the main orders list for the dashboard
      mutate('/api/orders')
      toast.success('Order status updated!')
    } catch (err) {
      toast.error('Failed to update status. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <AdminLayout>
      <div className='mb-6'>
        <button
          onClick={() => router.push('/admin')}
          className='flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors'
        >
          <FiArrowLeft className='mr-2' />
          Back to Dashboard
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Order Details */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Order Items */}
          <div className='bg-gray-800/50 p-4 md:p-6 rounded-lg shadow-lg'>
            <h2 className='text-lg md:text-xl font-semibold text-white mb-4 flex items-center'>
              <FiBox className='mr-3' />
              Order Items
            </h2>
            <div className='space-y-4'>
              {order.items.map(item => (
                <div
                  key={item.id}
                  className='flex justify-between items-center border-b border-gray-700 pb-3 last:border-b-0 last:pb-0'
                >
                  <div>
                    <p className='font-semibold text-white'>{item.name}</p>
                    <p className='text-sm text-gray-400'>
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className='font-medium text-gray-300'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className='mt-4 pt-4 border-t border-gray-700 text-right'>
              <p className='text-lg font-bold text-white'>
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className='bg-gray-800/50 p-4 md:p-6 rounded-lg shadow-lg'>
            <h2 className='text-lg md:text-xl font-semibold text-white mb-4 flex items-center'>
              <FiMapPin className='mr-3' />
              Shipping Information
            </h2>
            <div className='space-y-2 text-gray-300'>
              <p>
                <strong>Name:</strong> {order.shipping.firstName}{' '}
                {order.shipping.lastName}
              </p>
              <p>
                <strong>Email:</strong> {order.shipping.email}
              </p>
              <p>
                <strong>Address:</strong> {order.shipping.address},{' '}
                {order.shipping.city}, {order.shipping.postalCode},{' '}
                {order.shipping.country}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary & Actions */}
        <div className='lg:col-span-1 space-y-8'>
          <div className='bg-gray-800/50 p-4 md:p-6 rounded-lg shadow-lg'>
            <h2 className='text-lg md:text-xl font-semibold text-white mb-4 flex items-center'>
              <FiUser className='mr-3' />
              Order Summary
            </h2>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Order ID:</span>{' '}
                <span className='font-mono text-gray-300'>{order.id}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Created:</span>{' '}
                <span className='text-gray-300'>
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-400'>Last Updated:</span>{' '}
                <span className='text-gray-300'>
                  {new Date(order.updatedAt).toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Payment:</span>{' '}
                <span className='flex items-center text-gray-300'>
                  <FiCreditCard className='mr-2' />
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-700'>
              <label
                htmlFor='status'
                className='block text-sm font-medium text-gray-400 mb-2'
              >
                Order Status
              </label>
              <select
                id='status'
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as OrderStatus)}
                className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                {validStatuses.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating || selectedStatus === order.status}
                className='w-full mt-4 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isUpdating ? (
                  <FiLoader className='animate-spin' />
                ) : (
                  <>
                    <FiSave className='mr-2' />
                    Save Status
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default OrderDetailPage
