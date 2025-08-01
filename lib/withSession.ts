import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from './session'
import { Cart } from '@/types'

export interface Session {
  cart?: Cart
  save: () => Promise<void>
  destroy: () => Promise<void>
}

export function withSession(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
  ) => unknown
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = (await getIronSession(req, res, sessionOptions)) as Session
    return handler(req, res, session)
  }
}
