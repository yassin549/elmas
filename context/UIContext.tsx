import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { CartItem } from '@/types'

interface UIContextType {
  cartItems: CartItem[]
  isCartOpen: boolean
  isWishlistOpen: boolean
  wishlistItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleCart: () => void
  toggleWishlist: () => void
  addToWishlist: (item: CartItem) => void
  removeFromWishlist: (id: string) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}

interface UIProviderProps {
  children: ReactNode
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('liquid-glass-cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('liquid-glass-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedSize === newItem.selectedSize
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        const existingItem = updatedItems[existingItemIndex]
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
        }
        return updatedItems
      } else {
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const toggleCart = () => setIsCartOpen(prev => !prev)
  const toggleWishlist = () => setIsWishlistOpen(prev => !prev)

  const addToWishlist = (item: CartItem) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      } else {
        return [...prevItems, item]
      }
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const value = {
    cartItems,
    isCartOpen,
    isWishlistOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    toggleWishlist,
    clearCart,
    cartCount,
    cartTotal,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
