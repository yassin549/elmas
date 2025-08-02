import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useReducer,
} from 'react'
import { Cart, CartItem } from '@/types'
import toast from 'react-hot-toast'

interface UIContextType {
  cart: Cart | null
  isWishlistOpen: boolean
  isSideMenuOpen: boolean
  wishlistItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'> & { id: string }) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  toggleWishlist: () => void
  toggleSideMenu: () => void
  addToWishlist: (item: CartItem) => void
  removeFromWishlist: (id: string) => void
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

interface WishlistState {
  wishlistItems: CartItem[]
  isWishlistOpen: boolean
}

const initialState: WishlistState = {
  wishlistItems: [],
  isWishlistOpen: false,
}

type WishlistAction =
  | { type: 'TOGGLE_WISHLIST' }
  | { type: 'ADD_TO_WISHLIST'; payload: CartItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }

const wishlistReducer = (state: WishlistState, action: WishlistAction) => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST':
      return { ...state, isWishlistOpen: !state.isWishlistOpen }
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          item => item.id !== action.payload
        ),
      }
    default:
      return state
  }
}

export const UIProvider = ({ children }: UIProviderProps) => {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [wishlistState, dispatch] = useReducer(wishlistReducer, initialState)

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

  const toggleWishlist = () => dispatch({ type: 'TOGGLE_WISHLIST' })
  const toggleSideMenu = () => setIsSideMenuOpen(prev => !prev)

  const addToWishlist = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item })
  }

  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id })
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
    isWishlistOpen: wishlistState.isWishlistOpen,
    isSideMenuOpen,
    wishlistItems: wishlistState.wishlistItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    toggleSideMenu,
    addToWishlist,
    removeFromWishlist,
    cartCount,
    cartTotal,
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
