export const products = [
  {
    id: 1,
    name: 'Linen Lounge Set',
    price: 120.0,
    // ... other product details
  },
  {
    id: 2,
    name: 'Silk Robe',
    price: 250.0,
    // ... other product details
  },
  {
    id: 3,
    name: 'Cotton Pajama Set',
    price: 95.0,
    // ... other product details
  },
  {
    id: 12345, // Adding the product that was causing the error
    name: 'Cashmere Sweater',
    price: 450.0,
    sizes: [
      { name: 'S', in_stock: true },
      { name: 'M', in_stock: true },
      { name: 'L', in_stock: false },
    ],
    colors: [
      {
        name: 'Heather Grey',
        hex: '#B2B2B2',
        media: [{ type: 'image', url: '/images/products/1.webp' }],
      },
    ],
    description: 'A luxurious cashmere sweater.',
    details: ['100% Cashmere', 'Dry clean only'],
    fit_details: ['Classic fit'],
    fabric_details: ['Sustainably sourced cashmere'],
    rating_summary: { average: 5, count: 10 },
    reviews: [],
  },
]
