import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { withAdminAuthApi } from '@/lib/withAdminAuthApi'
import { Product } from '@/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const database = await db.read()
    const product: Product | undefined = database.products[0]

    let metrics

    if (product) {
      const stockData = [{
        id: product.id,
        name: product.name,
        stock: product.quantity,
      }]

      const lowStockThreshold = 10
      const lowStockProducts = product.quantity < lowStockThreshold && product.quantity > 0 ? [product] : []

      metrics = {
        kpis: {
          totalProducts: 1,
          totalInventory: product.quantity,
          averagePrice: product.price,
        },
        stockData,
        lowStockProducts,
      }
    } else {
      metrics = {
        kpis: {
          totalProducts: 0,
          totalInventory: 0,
          averagePrice: 0,
        },
        stockData: [],
        lowStockProducts: [],
      }
    }

    return res.status(200).json(metrics)
  } catch (error) {
    console.error('Error fetching analytics metrics:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Protect the endpoint with admin authentication
export default withAdminAuthApi(handler)
