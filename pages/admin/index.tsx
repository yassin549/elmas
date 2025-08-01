import React from 'react'
import AdminLayout from '@/layouts/AdminLayout'
import { useAuth } from '@/context/AuthContext'
import { withAdminAuth } from '@/lib/withAdminAuth'
import useSWR from 'swr'
import SalesOverTimeChart from '@/components/admin/SalesOverTimeChart'
import { Order } from '@/types'
import { FiPackage } from 'react-icons/fi'
import { useRouter } from 'next/router'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const OrdersTable = ({
  orders,
  isLoading,
  error,
}: {
  orders: Order[]
  isLoading: boolean
  error: Error
}) => {
  const router = useRouter()
  if (isLoading)
    return <div className='text-center py-16'>Loading orders...</div>
  if (error)
    return (
      <div className='text-center py-16 text-red-500'>
        Error loading orders.
      </div>
    )
  if (!orders || orders.length === 0) {
    return (
      <div className='text-center py-16 text-gray-500'>
        <FiPackage className='w-10 h-10 mx-auto mb-3' />
        No orders found.
      </div>
    )
  }

  const getStatusClass = (status: string) => {
    return (
      {
        Pending:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Processing:
          'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Shipped:
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
        Delivered:
          'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Cancelled:
          'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
      }[status] || 'bg-gray-100 text-gray-800'
    )
  }

  return (
    <div>
      {/* Mobile View - Card List */}
      <div className='md:hidden space-y-4'>
        {orders.map(order => (
          <div
            key={order.id}
            onClick={() => router.push(`/admin/orders/${order.id}`)}
            className='bg-gray-800/50 p-4 rounded-lg shadow-md cursor-pointer'
          >
            <div className='flex justify-between items-start mb-2'>
              <div>
                <p className='font-bold text-white'>
                  {order.shipping
                    ? `${order.shipping.firstName} ${order.shipping.lastName}`
                    : 'N/A'}
                </p>
                <p className='text-xs text-gray-400'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className='font-mono text-xs text-gray-400'>
                #{order.id.substring(0, 8)}
              </p>
            </div>
            <div className='flex justify-between items-center text-sm'>
              <p className='font-medium text-gray-300'>
                {order.total.toFixed(3)} TND
              </p>
              <span
                className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='min-w-full text-sm text-left'>
          <thead className='border-b border-gray-200 dark:border-gray-700 text-xs text-gray-500 uppercase tracking-wider'>
            <tr>
              <th className='px-6 py-4 font-medium'>Order ID</th>
              <th className='px-6 py-4 font-medium'>Customer</th>
              <th className='px-6 py-4 font-medium'>Date</th>
              <th className='px-6 py-4 font-medium'>Total</th>
              <th className='px-6 py-4 font-medium'>Status</th>
              <th className='px-6 py-4 font-medium'>Location</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-800'>
            {orders.map(order => (
              <tr
                key={order.id}
                onClick={() => router.push(`/admin/orders/${order.id}`)}
                className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer'
              >
                <td className='px-6 py-4 font-mono text-xs text-gray-700 dark:text-gray-400'>
                  #{order.id.substring(0, 8)}
                </td>
                <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
                  {order.shipping
                    ? `${order.shipping.firstName} ${order.shipping.lastName}`
                    : 'N/A'}
                </td>
                <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>
                  {order.total.toFixed(3)} TND
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>
                  {order.shipping
                    ? `${order.shipping.address}, ${order.shipping.city}, ${order.shipping.postalCode}, ${order.shipping.country}`
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  const { logout } = useAuth()

  const { data: dashboardData, error: dashboardError } = useSWR(
    '/api/analytics/dashboard',
    fetcher,
    { refreshInterval: 5000 }
  )

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
  } = useSWR<Order[]>('/api/orders', fetcher, { refreshInterval: 5000 })

  return (
    <AdminLayout>
      <h1 className='text-2xl md:text-3xl font-bold mb-6'>Admin Dashboard</h1>

      {/* Sales Chart */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Sales Chart */}
        <div className='bg-white/5 dark:bg-gray-800/50 p-4 md:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white/10'>
          <h2 className='text-xl font-semibold text-white mb-4'>
            Sales - Last 30 Days
          </h2>
          <div className='h-96'>
            <SalesOverTimeChart
              data={dashboardData?.salesOverTime}
              isLoading={!dashboardData && !dashboardError}
              error={dashboardError}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className='bg-white/5 dark:bg-gray-800/50 p-4 md:p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white/10'>
          <h2 className='text-xl font-semibold text-white mb-4'>
            Recent Orders
          </h2>
          <OrdersTable
            orders={ordersData || []}
            isLoading={ordersLoading}
            error={ordersError}
          />
        </div>
      </div>

      <button
        onClick={logout}
        className='mt-8 px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors'
      >
        Logout
      </button>
    </AdminLayout>
  )
}

export default withAdminAuth(AdminDashboard)
