import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'
import { CartItem } from '@/types'

export default async function addToCartRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getIronSession(req, res, sessionOptions)
    const { product, quantity, selectedColor, selectedSize } = req.body

    const cart = session.cart || { items: [], total: 0 }

    const existingItemIndex = cart.items.findIndex(
      (item: CartItem) => item.id === product.id
    )

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      const newCartItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity,
        selectedColor,
        selectedSize,
      }
      cart.items.push(newCartItem)
    }

    cart.total = cart.items.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    )

    session.cart = cart
    await session.save()

    res.status(200).json(cart)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
