import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'
import { Order, OrderStatus } from '@/types'

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json')

const validStatuses: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

async function getOrders(): Promise<Order[]> {
  try {
    const fileData = await fs.readFile(ordersFilePath, 'utf-8')
    return JSON.parse(fileData)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [] // File not found, return empty array
    }
    throw error
  }
}

async function saveOrders(orders: Order[]): Promise<void> {
  await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query

  if (typeof orderId !== 'string') {
    return res.status(400).json({ message: 'Invalid order ID.' })
  }

  const orders = await getOrders()
  const orderIndex = orders.findIndex(order => order.id === orderId)

  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found.' })
  }

  if (req.method === 'GET') {
    return res.status(200).json(orders[orderIndex])
  }

  if (req.method === 'PUT') {
    try {
      const { status } = req.body as { status: OrderStatus }

      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' })
      }

      orders[orderIndex].status = status
      orders[orderIndex].updatedAt = new Date().toISOString() // Also update the timestamp

      await saveOrders(orders)

      return res.status(200).json(orders[orderIndex])
    } catch (error) {
      console.error(`Failed to update order ${orderId}:`, error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  res.setHeader('Allow', ['GET', 'PUT'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
