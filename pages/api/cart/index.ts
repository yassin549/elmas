import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'

export default async function cartRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await getIronSession(req, res, sessionOptions)
    const cart = session.cart || { items: [], total: 0 }
    res.status(200).json(cart)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
