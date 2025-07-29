import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { withAdminAuth } from '@/lib/withAdminAuth';
import useSWR from 'swr';
import SalesOverTimeChart from '@/components/admin/SalesOverTimeChart';
import { Order } from '@/types';
import { FiPackage } from 'react-icons/fi';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const OrdersTable = ({ orders, isLoading, error }) => {
  if (isLoading) return <div className='text-center py-16'>Loading orders...</div>;
  if (error) return <div className='text-center py-16 text-red-500'>Error loading orders.</div>;
  if (!orders || orders.length === 0) {
    return (
      <div className='text-center py-16 text-gray-500'>
        <FiPackage className='w-10 h-10 mx-auto mb-3' />
        No orders found.
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
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
            <tr key={order.id} className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200'>
              <td className='px-6 py-4 font-mono text-xs text-gray-700 dark:text-gray-400'>#{order.id.substring(0, 8)}</td>
              <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>{order.shippingAddress.fullName}</td>
              <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>${order.total.toFixed(2)}</td>
              <td className='px-6 py-4'>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${{
                    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                    Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
                    Shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300',
                    Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
                  }[order.status] || 'bg-gray-100 text-gray-800'}`}>
                  {order.status}
                </span>
              </td>
              <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>
                {`${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AdminDashboard = () => {
  const { logout } = useAuth();

  const { data: dashboardData, error: dashboardError } = useSWR(
    '/api/analytics/dashboard',
    fetcher,
    { refreshInterval: 5000 }
  );

  const { data: ordersData, error: ordersError, isLoading: ordersLoading } = useSWR<Order[]>('/api/orders', fetcher);

  return (
    <AdminLayout>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

      {/* Sales Chart */}
      <div className='bg-white/5 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white/10 mb-8'>
        <h2 className='text-xl font-semibold text-white mb-4'>Sales - Last 30 Days</h2>
        <div className='h-80'>
          <SalesOverTimeChart
            data={dashboardData?.salesOverTime}
            isLoading={!dashboardData && !dashboardError}
            error={dashboardError}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className='bg-white/5 dark:bg-gray-800/50 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-white/10'>
        <h2 className='text-xl font-semibold text-white mb-4'>Recent Orders</h2>
        <OrdersTable orders={ordersData} isLoading={ordersLoading} error={ordersError} />
      </div>

      <button
        onClick={logout}
        className='mt-8 px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors'
      >
        Logout
      </button>
    </AdminLayout>
  );
};

export default withAdminAuth(AdminDashboard);
