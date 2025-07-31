export interface Review {
  id: string
  author: string
  verified_buyer: boolean
  rating: number
  title: string
  content: string
  date: string
  size: string
  usual_size: string
  fit: 'True to size' | 'Runs small' | 'Runs large'
}

export interface Size {
  name: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  in_stock: boolean
}

export interface Media {
  type: 'image' | 'video'
  url: string
  thumbnailUrl?: string // Optional, only for videos
}

export interface Color {
  name: string
  hex: string
  media: Media[]
}

export interface Product {
  id: string
  name: string
  category: string
  images: string[]
  price: number
  quantity: number
  colors: Color[]
  sizes: Size[]
  description: string
  details: string[]
  fit_details: string[]
  fabric_details: string[]
  reviews: Review[]
  rating_summary: {
    average: number
    count: number
    distribution: {
      stars: number
      count: number
    }[]
  }
}

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface Address {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  postalCode: string
  country: string
}

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shipping: Address
  paymentMethod: 'Credit Card' | 'Cash on Delivery'
  status: OrderStatus
  createdAt: string
  updatedAt?: string
}

export interface User {
  id: string
  email: string
  passwordHash: string
  roles: ('user' | 'admin')[]
}

export interface DecodedToken {
  userId: string
  roles: ('user' | 'admin')[]
  iat: number
  exp: number
}
