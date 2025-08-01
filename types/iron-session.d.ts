import 'iron-session'
import { Cart } from './index'

declare module 'iron-session' {
  interface IronSessionData {
    cart?: Cart
  }
}
