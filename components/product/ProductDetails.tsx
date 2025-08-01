import { useState, FC } from 'react'
import { useRouter } from 'next/router'
import { useUI } from '@/context/UIContext'
import { Product, Size } from '@/types'
import StarRating from '@/components/product/StarRating'
import { RiRuler2Line } from 'react-icons/ri'

interface ProductDetailsProps {
  product: Product
  selectedColorName: string
  setSelectedColorName: (name: string) => void
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  selectedColorName,
  setSelectedColorName,
}) => {
  const router = useRouter()
  const { addToWishlist } = useUI()
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount))
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size.')
      return
    }

    router.push({
      pathname: '/checkout',
      query: {
        productId: product.id,
        quantity,
        size: selectedSize.name,
        color: selectedColorName,
      },
    })
  }

  const handleAddToWishlist = () => {
    if (!selectedSize) {
      alert('Please select a size.')
      return
    }
    addToWishlist({
      ...product,
      images: selectedColor.media.map(m => m.url),
      quantity: 1, // Wishlist adds one item
      selectedSize: selectedSize.name,
      selectedColor: selectedColorName,
    })
    alert('Added to wishlist!') // Provide user feedback
  }

  const selectedColor =
    product.colors.find(c => c.name === selectedColorName) || product.colors[0]

  return (
    <div className='flex flex-col space-y-2 md:space-y-4 font-sans'>
      <div className='font-lora text-3xl md:text-4xl text-black flex flex-col md:flex-row md:space-x-2'>
        <h1>{product.name} -</h1>
        <h1>{selectedColor.name}</h1>
      </div>
      <div className='text-lg font-sans text-gray-900'>
        <p className='text-xl md:text-2xl'>{product.price.toFixed(3)} TND</p>
      </div>
      {product.rating_summary && (
        <StarRating
          rating={product.rating_summary.average}
          count={product.rating_summary.count}
        />
      )}

      <div className='pt-4'>
        <p className='text-xs text-gray-500 mb-2 tracking-widest'>COLOUR</p>
        <div className='flex space-x-2'>
          {product.colors.map(color => (
            <button
              key={color.name}
              onClick={() => setSelectedColorName(color.name)}
              className={`w-8 h-8 md:w-10 md:h-10 border ${selectedColor.name === color.name ? 'border-black' : 'border-gray-300'}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className='pt-4'>
        <p className='text-xs text-gray-500 tracking-widest mb-2'>SIZE: AU</p>
        <div className='flex space-x-2 mb-3'>
          {product.sizes.map(size => (
            <button
              key={size.name}
              onClick={() => setSelectedSize(size)}
              disabled={!size.in_stock}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sm font-medium transition-colors duration-200
                ${
                  selectedSize?.name === size.name
                    ? 'bg-[#D8B28E] text-white'
                    : size.in_stock
                      ? 'bg-[#f3e9df] text-gray-800 hover:bg-[#e9dccc]'
                      : 'bg-[#f3e9df] text-gray-400 opacity-50 cursor-not-allowed'
                }`}
            >
              {size.name}
            </button>
          ))}
        </div>
        <a
          href='#'
          className='text-xs text-gray-800 underline flex items-center space-x-2 hover:text-black'
        >
          <RiRuler2Line size={16} />
          <span>VIEW SIZE GUIDE</span>
        </a>
      </div>

      <div className='pt-4'>
        <p className='text-xs text-gray-500 mb-2 tracking-widest'>QUANTITY</p>
        <div className='flex items-center border border-black w-fit divide-x divide-black'>
          <button
            onClick={() => handleQuantityChange(-1)}
            className='w-10 h-8 md:w-12 md:h-10 flex items-center justify-center bg-gray-100 text-black text-xl font-medium hover:bg-gray-200 transition-colors'
          >
            -
          </button>
          <span className='w-10 h-8 md:w-12 md:h-10 flex items-center justify-center bg-gray-100 text-sm select-none text-black'>
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className='w-10 h-8 md:w-12 md:h-10 flex items-center justify-center bg-gray-100 text-black text-xl font-medium hover:bg-gray-200 transition-colors'
          >
            +
          </button>
        </div>
      </div>

      <div className='flex flex-col space-y-3 pt-4 font-sans'>
        {!selectedSize && (
          <p className='text-sm text-gray-600'>Please select a size</p>
        )}
        <button
          onClick={handleBuyNow}
          disabled={!selectedSize}
          className='w-full bg-[#D8B28E] text-white py-3 uppercase tracking-widest font-semibold text-sm hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
        >
          BUY NOW
        </button>
        <button
          onClick={handleAddToWishlist}
          disabled={!selectedSize}
          className='w-full bg-white text-[#D8B28E] border border-[#D8B28E] py-3 uppercase tracking-widest font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          ADD TO WISHLIST
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
