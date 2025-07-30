import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const OrderSuccessPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div className='container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]'>
      <div className='bg-white p-6 md:p-10 rounded-xl shadow-lg text-center max-w-lg w-full'>
        <FiCheckCircle className='text-green-500 text-6xl mx-auto mb-4' />
        <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>Thank You for Your Order!</h1>
        <p className='text-gray-600 mb-6'>Your order has been placed successfully.</p>
        
        {orderId && (
          <div className='bg-gray-100 rounded-lg px-4 py-3 mb-6 text-sm text-gray-700'>
            <p>Your Order ID is: <span className='font-semibold text-black'>{orderId}</span></p>
          </div>
        )}

        <Link href='/' className='inline-block'>
          <button className='bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center'>
            <FiArrowLeft className='mr-2' />
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
