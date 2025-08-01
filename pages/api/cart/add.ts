import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'
import { CartItem, Product } from '@/types'

export default async function addToCartRoute(
  req: NextApiRequest,
  res: NextApiResponse
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

    const session = await getIronSession(req, res, sessionOptions)
    const cart = session.cart || { items: [], total: 0 }

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

    session.cart = cart
    await session.save()

    return res.status(200).json(cart)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'An internal server error occurred.' })
  }
}
