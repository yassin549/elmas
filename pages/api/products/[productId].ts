import { NextApiRequest, NextApiResponse } from 'next'
import { products } from '../../../data/products.js'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query

  if (typeof productId !== 'string') {
    return res.status(400).json({ message: 'Invalid product ID' })
  }

  const product = products.find(p => p.id === parseInt(productId, 10))

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  switch (req.method) {
    case 'GET':
      res.status(200).json(product)
      break

    // Note: PUT and DELETE operations will not work with a static file.
    // These would need to be re-implemented if you need to modify the products data.
    case 'PUT':
    case 'DELETE':
      return res.status(501).json({ message: 'Not Implemented' })

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
