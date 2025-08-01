import { NextApiRequest, NextApiResponse } from 'next'
import { withSession, Session } from '@/lib/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  if (req.method === 'POST') {
    const { itemId, quantity } = req.body
    const cart = session.cart

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.id === itemId)
      if (itemIndex > -1) {
        if (quantity > 0) {
          cart.items[itemIndex].quantity = quantity
        } else {
          cart.items.splice(itemIndex, 1)
        }

        cart.total = cart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )

        session.cart = cart
        await session.save()
        res.status(200).json(cart)
      } else {
        res.status(404).json({ message: 'Item not found in cart' })
      }
    } else {
      res.status(404).json({ message: 'Cart not found' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Method Not Allowed')
  }
}

export default withSession(handler)
