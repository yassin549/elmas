import { NextApiRequest, NextApiResponse } from 'next'
import { withSession, Session } from '@/lib/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) {
  if (req.method === 'POST') {
    session.cart = { items: [], total: 0 }
    await session.save()
    res.status(200).json(session.cart)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Method Not Allowed')
  }
}

export default withSession(handler)
