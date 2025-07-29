import React from 'react';
import useSWR from 'swr';
import AdminLayout from '@/layouts/AdminLayout';
import { Order } from '@/types';
import { FiPackage } from 'react-icons/fi';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AdminOrdersPage = () => {
  const { data: orders, error, isLoading } = useSWR<Order[]>('/api/orders', fetcher);

  const renderContent = () => {
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

  return (
    <AdminLayout>
      <div className='bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg font-sans'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white flex items-center gap-3'>
            <FiPackage />
            Orders
          </h1>
        </div>
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
