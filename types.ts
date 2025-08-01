export interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  images: string[]
  quantity: number
  selectedColor: string
  selectedSize: string
}
