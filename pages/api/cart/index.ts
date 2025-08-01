import { NextApiRequest, NextApiResponse } from 'next'
import { withSession, Session } from '@/lib/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  if (req.method === 'GET') {
    const cart = session.cart || { items: [], total: 0 }
    res.status(200).json(cart)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end('Method Not Allowed')
  }
}

export default withSession(handler)
