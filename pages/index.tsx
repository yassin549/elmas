import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import AddToCartNotification from '@/components/AddToCartNotification'
import { AnimatePresence } from 'framer-motion'

const ProductPage = () => {
  const { addToCart } = useCart()
  const [showNotification, setShowNotification] = useState(false)

  const product = {
    id: '2727019-119',
    name: 'TOP EN POPELINE À FLEURS',
    price: 139.0,
    image: '/images/products/1.webp',
    quantity: 1,
    description:
      'Top à manches longues larges. Coupe ample. Fermeture réglable sur le devant avec lien. Encolure en V. 100% coton. Jupe taille haute. Lien décoratif à la ceinture. Taille élastique. Doublée. 100% coton.',
    images: [
      '/images/products/1.webp',
      '/images/products/3.webp',
      '/images/products/2.webp',
      '/images/products/5.webp',
      '/images/products/6.webp',
    ],
  }

  const handleAddToCart = () => {
    addToCart(product)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 5000) // Auto-hide after 5 seconds
  }

  const infoLinks = [
    'DIMENSIONS DU PRODUIT',
    'COMPOSITION & ENTRETIEN',
    'VOIR DISPONIBILITÉ EN MAGASIN',
    'LIVRAISON, ÉCHANGE ET RETOURS',
  ]

  return (
    <div className='bg-white font-sans text-[#1C1C1C]'>
      <div className='max-w-[1200px] mx-auto px-5'>
        {/* 1. HERO SECTION */}
        <section className='relative -top-[60px] flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-[50px] pt-8 pb-8'>
          {/* Left Column: Main Image */}
          <div className='w-full md:w-1/2'>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={900}
              className='w-full h-auto object-cover'
            />
          </div>

          {/* Right Column: Product Details */}
          <div className='w-full md:w-1/2 flex flex-col justify-center'>
            <div className='flex justify-between items-baseline mb-[10px]'>
              <h1 className='text-2xl font-bold uppercase'>{product.name}</h1>
              <svg
                className='w-5 h-5 text-black'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                  d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                ></path>
              </svg>
            </div>
            <p className='text-lg font-normal'>
              {product.price.toFixed(2)} TND
            </p>
            <hr className='border-t border-black my-3' />
            <p className='text-xs text-[#6E6E6E] mb-5'>JUNE | {product.id}</p>
            <button
              onClick={handleAddToCart}
              className='h-[44px] w-full text-sm uppercase border border-black bg-white px-5 mb-[30px] hover:bg-black hover:text-white transition-colors duration-300'
            >
              AJOUTER
            </button>
            <div className='text-sm leading-relaxed font-normal mb-[25px]'>
              <p>
                Top à manches longues larges. Coupe ample. Fermeture réglable
                sur le devant avec lien. Encolure en V. 100% coton.
              </p>
              <p>
                Jupe taille haute. Lien décoratif à la ceinture. Taille
                élastique. Doublée. 100% coton.
              </p>
            </div>
            <div className='flex flex-col space-y-2'>
              {infoLinks.map(link => (
                <a
                  href='#'
                  key={link}
                  className='text-xs uppercase text-[#6E6E6E] no-underline'
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 2. GALLERY SECTION */}
        <section className='py-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-[30px]'>
            {/* Row 1 */}
            <div className='w-full flex items-center justify-center bg-white p-8 text-center'>
              <div className='text-sm leading-relaxed'>
                <p className='font-bold'>TOP</p>
                <p>- Wide long sleeves</p>
                <p>- Relaxed fit</p>
                <p>- Adjustable tie up design on front</p>
                <p>- V-neckline</p>
                <p>- 100% Cotton</p>
                <br />
                <p className='font-bold'>SKIRT</p>
                <p>- High waisted</p>
                <p>- Decorative tie on waistband</p>
                <p>- Elastic waistband</p>
                <p>- Lined</p>
                <p>- 100% Cotton</p>
              </div>
            </div>
            <div className='w-full'>
              <Image
                src='/images/products/3.webp'
                alt='Gallery image 2'
                width={570}
                height={855}
                className='w-full h-auto object-cover bg-white'
              />
            </div>

            {/* Row 2 */}
            <div className='w-full'>
              <Image
                src='/images/products/2.webp'
                alt='Gallery image 1'
                width={570}
                height={855}
                className='w-full h-auto object-cover bg-white'
              />
            </div>
            <div className='w-full'>
              <Image
                src='/images/products/5.webp'
                alt='Gallery image 4'
                width={570}
                height={855}
                className='w-full h-auto object-cover bg-white'
              />
            </div>

            {/* Centered 5th Item */}
            <div className='md:col-span-2 flex justify-center'>
              <div className='w-full md:w-[calc(50%-15px)]'>
                <Image
                  src='/images/products/6.webp'
                  alt='Gallery image 5'
                  width={570}
                  height={855}
                  className='w-full h-auto object-cover bg-white'
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. NEWSLETTER FOOTER */}
        <section className='text-center py-12'>
          <h2 className='text-base font-bold text-[#1C1C1C] mb-[10px]'>
            ABONNEZ-VOUS À NOTRE NEWSLETTER
          </h2>
          <div className='flex justify-center'>
            <input
              type='email'
              placeholder='Entrez votre e-mail'
              className='w-full max-w-sm h-[36px] border-b border-black text-center placeholder-[#6E6E6E] focus:outline-none'
            />
          </div>
        </section>
      </div>
      {/* 4. GLOBAL FOOTER will be rendered by MainLayout */}
      <AnimatePresence>
        {showNotification && (
          <AddToCartNotification onClose={() => setShowNotification(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductPage
