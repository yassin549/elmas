import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import { Cart, CartItem } from '@/types'
import toast from 'react-hot-toast'

interface UIContextType {
  cart: Cart | null
  isCartOpen: boolean
  isWishlistOpen: boolean
  isSideMenuOpen: boolean
  wishlistItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'> & { id: string }) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  toggleCart: () => void
  toggleWishlist: () => void
  toggleSideMenu: () => void
  addToWishlist: (item: CartItem) => void
  removeFromWishlist: (id: string) => void
  clearCart: () => Promise<void>
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
  const [cart, setCart] = useState<Cart | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([])

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCart(data)
      } else {
        setCart({ items: [], total: 0 })
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      setCart({ items: [], total: 0 })
    }
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const addToCart = async (newItem: Omit<CartItem, 'id'> & { id: string }) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: newItem, quantity: newItem.quantity }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
        toast.success(`${newItem.name} added to cart!`)
      } else {
        toast.error('Failed to add item to cart.')
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
      toast.error('An error occurred.')
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
        toast.success('Item removed from cart.')
      } else {
        toast.error('Failed to remove item.')
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      toast.error('An error occurred.')
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 0) return

    try {
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
      } else {
        toast.error('Failed to update quantity.')
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
      toast.error('An error occurred.')
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'POST',
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
      } else {
        toast.error('Failed to clear cart.')
      }
    } catch (error) {
      console.error('Failed to clear cart:', error)
      toast.error('An error occurred.')
    }
  }

  const toggleCart = () => setIsCartOpen(prev => !prev)
  const toggleWishlist = () => setIsWishlistOpen(prev => !prev)
  const toggleSideMenu = () => setIsSideMenuOpen(prev => !prev)

  // Wishlist remains client-side for now
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

  const cartCount =
    cart?.items.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0
    ) ?? 0
  const cartTotal =
    cart?.items.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    ) ?? 0

  const value = {
    cart,
    isCartOpen,
    isWishlistOpen,
    isSideMenuOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    toggleWishlist,
    toggleSideMenu,
    clearCart,
    cartCount,
    cartTotal,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
