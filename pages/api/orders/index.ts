import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
import { Order } from '@/types'

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order[] | { message: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }

  try {
    let orders: Order[] = []
    try {
      const fileData = await fs.readFile(ordersFilePath, 'utf-8')
      orders = JSON.parse(fileData)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
      // If file does not exist, return an empty array, which is fine.
    }

    // Sort orders by most recent
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return res.status(200).json(orders)
  } catch (error) {
    console.error('Failed to retrieve orders:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
