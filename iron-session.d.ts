import 'iron-session'
import { CartItem } from './types'

declare module 'iron-session' {
  export interface IronSession {
    cart?: {
      items: CartItem[]
      total: number
    }
  }
}
