export const products = [
  {
    id: 'p1',
    name: 'Linen Lounge Set',
    price: 120.0,
    sizes: [
      { name: 'XS', in_stock: true },
      { name: 'S', in_stock: true },
      { name: 'M', in_stock: false },
      { name: 'L', in_stock: true },
      { name: 'XL', in_stock: true },
    ],
    colors: [
      {
        name: 'Sage Green',
        hex: '#B2C2A9',
        media: [
          {
            type: 'video',
            url: '/videos/vid1.mp4',
            thumbnailUrl: '/images/products/sage-lounge-1.jpg',
          },
          { type: 'image', url: '/images/products/sage-lounge-1.jpg' },
          { type: 'image', url: '/images/products/sage-lounge-2.jpg' },
          { type: 'image', url: '/images/products/sage-lounge-3.jpg' },
        ],
      },
      {
        name: 'Cream',
        hex: '#F5F5DC',
        media: [
          {
            type: 'video',
            url: '/videos/vid2.mp4',
            thumbnailUrl: '/images/products/cream-lounge-1.jpg',
          },
          { type: 'image', url: '/images/products/cream-lounge-1.jpg' },
        ],
      },
      {
        name: 'Sky Blue',
        hex: '#87CEEB',
        media: [
          {
            type: 'video',
            url: '/videos/vid3.mp4',
            thumbnailUrl: '/images/products/blue-lounge-1.jpg',
          },
          { type: 'image', url: '/images/products/blue-lounge-1.jpg' },
        ],
      },
      {
        name: 'Charcoal',
        hex: '#36454F',
        media: [
          {
            type: 'video',
            url: '/videos/vid4.mp4',
            thumbnailUrl: '/images/products/charcoal-lounge-1.jpg',
          },
          { type: 'image', url: '/images/products/charcoal-lounge-1.jpg' },
        ],
      },
    ],
    description:
      'A comfortable and stylish linen lounge set, perfect for relaxing at home.',
    details: [
      'Lightweight linen fabric',
      'Button-front top',
      'Elastic waist shorts',
    ],
    fit_details: ['True to size', 'Relaxed fit'],
    fabric_details: ['100% Linen', 'Machine washable'],
    rating_summary: {
      average: 4.5,
      count: 120,
      distribution: [
        { stars: 5, count: 100 },
        { stars: 4, count: 15 },
        { stars: 3, count: 5 },
        { stars: 2, count: 0 },
        { stars: 1, count: 0 },
      ],
    },
    reviews: [
      {
        id: 'rev1',
        author: 'Jane D.',
        verified_buyer: true,
        rating: 5,
        title: 'So comfortable!',
        content:
          'I love this set. The linen is so soft and it is perfect for lounging.',
        date: '2025-07-15',
        size: 'M',
        usual_size: 'M',
        fit: 'True to size',
      },
    ],
  },
]
