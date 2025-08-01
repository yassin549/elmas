import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Product } from '@/types'

import ProductImageGallery from '@/components/product/ProductImageGallery'
import ProductDetails from '@/components/product/ProductDetails'
import ProductInfoAccordion from '@/components/product/ProductInfoAccordion'
import CustomerReviews from '@/components/product/CustomerReviews'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

const product: Product = {
  id: '12345',
  name: 'Iveena Top and Shorts Set',
  price: 93.0,
  category: 'Sets',
  quantity: 10,
  stock: 10,
  images: [
    '/images/products/1.webp',
    '/images/products/2.webp',
    '/images/products/3.webp',
    '/images/products/4.webp',
    '/images/products/5.webp',
    '/images/products/6.webp',
  ],
  colors: [
    {
      name: 'Green',
      hex: '#A3B899',
      media: [
        {
          type: 'video',
          url: '/images/products/vid4.mp4',
          thumbnailUrl: '/images/products/1.webp',
        },
        { type: 'image', url: '/images/products/1.webp' },
        { type: 'image', url: '/images/products/2.webp' },
        { type: 'image', url: '/images/products/3.webp' },
        { type: 'image', url: '/images/products/4.webp' },
        { type: 'image', url: '/images/products/5.webp' },
        { type: 'image', url: '/images/products/6.webp' },
      ],
    },
    {
      name: 'White',
      hex: '#FFFFFF',
      media: [
        {
          type: 'video',
          url: '/images/products/vid1.mp4',
          thumbnailUrl: '/images/products/7.webp',
        },
        { type: 'image', url: '/images/products/7.webp' },
        { type: 'image', url: '/images/products/8.webp' },
        { type: 'image', url: '/images/products/9.webp' },
        { type: 'image', url: '/images/products/10.webp' },
        { type: 'image', url: '/images/products/11.webp' },
        { type: 'image', url: '/images/products/12.webp' },
        { type: 'image', url: '/images/products/13.webp' },
        { type: 'image', url: '/images/products/14.webp' },
        { type: 'image', url: '/images/products/15.webp' },
        { type: 'image', url: '/images/products/16.webp' },
        { type: 'image', url: '/images/products/17.webp' },
        { type: 'image', url: '/images/products/18.webp' },
        { type: 'image', url: '/images/products/19.webp' },
      ],
    },
  ],
  sizes: [
    { name: 'S', in_stock: true },
    { name: 'M', in_stock: true },
    { name: 'L', in_stock: true },
    { name: 'XL', in_stock: true },
  ],
  description:
    'The Iveena Top and Shorts Set is the perfect combination of comfort and style. Made from a lightweight and breathable fabric, this set is perfect for warm days and nights.',
  details: [
    'Top and shorts set',
    'Elasticated waistband',
    'Functional pockets',
    'Lined',
  ],
  fit_details: ['True to size', 'Model is wearing a size 8'],
  fabric_details: ['100% Cotton', 'Cold hand wash'],
  rating_summary: {
    average: 4.9,
    count: 62,
    distribution: [
      { stars: 5, count: 54 },
      { stars: 4, count: 8 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  reviews: [
    {
      id: 'rev1',
      author: 'chaima ben amor',
      verified_buyer: true,
      rating: 4,
      title: 'Great Styling!',
      content:
        'raw3a, tissu tayara, bsara7a 2a7sen meli kont netsawer. bch na3tiha 4 stars, sinon 10/10 styling 👗💖',
      date: '07/30/25',
      size: 'M',
      usual_size: 'M',
      fit: 'True to size',
    },
    {
      id: 'rev2',
      author: 'malek hasnaoui',
      verified_buyer: true,
      rating: 5,
      title: 'Truly Luxurious',
      content: '7aja barka n9oulha: vraiment luxe. Merci elmas 💕',
      date: '07/28/25',
      size: 'S',
      usual_size: 'S',
      fit: 'True to size',
    },
  ],
}

const ProductPage = () => {
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors[0].name
  )

  const breadcrumbs = [
    { name: 'Home', href: '#' },
    { name: 'Iveena Top and Shorts Set', href: '#' },
    { name: 'Sage', href: '#' },
  ]

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        delay: i * 0.1,
      },
    }),
  }

  return (
    <div className='bg-white overflow-x-hidden'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        <motion.div
          className='mb-6'
          initial='hidden'
          whileInView='visible'
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Breadcrumbs crumbs={breadcrumbs} />
        </motion.div>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-12'>
          <motion.div
            className='lg:col-span-6'
            initial='hidden'
            whileInView='visible'
            variants={sectionVariants}
            custom={1}
            viewport={{ once: true, amount: 0.2 }}
          >
            <ProductImageGallery
              colors={product.colors}
              selectedColorName={selectedColorName}
            />
          </motion.div>
          <motion.div
            className='lg:col-span-6 mt-8 lg:mt-0'
            initial='hidden'
            whileInView='visible'
            variants={sectionVariants}
            custom={1.5}
            viewport={{ once: true, amount: 0.2 }}
          >
            <ProductDetails
              product={product}
              selectedColorName={selectedColorName}
              setSelectedColorName={setSelectedColorName}
            />
            <ProductInfoAccordion />
          </motion.div>
        </div>
        <div className='mt-12 md:mt-16'>
          <CustomerReviews product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
