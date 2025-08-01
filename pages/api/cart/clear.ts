import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '@/lib/session'

export default async function clearCartRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getIronSession(req, res, sessionOptions)
    session.cart = { items: [], total: 0 }
    await session.save()
    res.status(200).json(session.cart)
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
