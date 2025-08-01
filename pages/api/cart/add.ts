import { NextApiRequest, NextApiResponse } from 'next'
import { withSession, Session } from '@/lib/withSession'
import { CartItem, Product } from '@/types'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const {
      product,
      quantity,
      selectedColor,
      selectedSize,
    }: {
      product: Product
      quantity: number
      selectedColor: string
      selectedSize: string
    } = req.body

    // Basic validation
    if (!product || !quantity || !selectedColor || !selectedSize) {
      return res.status(400).json({ message: 'Missing required fields.' })
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity.' })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available.' })
    }

    if (!session.cart) {
      session.cart = { items: [], total: 0 }
    }
    const cart = session.cart

    const existingItemIndex = cart.items.findIndex(
      (item: CartItem) =>
        item.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    )

    if (existingItemIndex > -1) {
      // Item exists, update quantity
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Item does not exist, add as new
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

    // Recalculate total
    cart.total = cart.items.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    )

    await session.save()

    return res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An internal server error occurred.' })
  }
}

export default withSession(handler)
