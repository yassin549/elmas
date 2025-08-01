import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'
import { CartItem } from '@/types'

export default async function removeFromCartRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getIronSession(req, res, sessionOptions)
    const { itemId } = req.body
    const cart = session.cart

    if (cart) {
      cart.items = cart.items.filter((item: CartItem) => item.id !== itemId)
      cart.total = cart.items.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0
      )
      session.cart = cart
      await session.save()
      res.status(200).json(cart)
    } else {
      res.status(404).json({ message: 'Cart not found' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
