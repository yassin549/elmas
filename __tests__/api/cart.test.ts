import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import { IronSession } from 'iron-session'

import addHandler from '../../pages/api/cart/add'
import getHandler from '../../pages/api/cart/index'
import { Product, Cart } from '../../types'

interface TestSessionData {
  cart?: Cart
}

// Helper to create a session for a mock request
async function createSession(): Promise<IronSession<TestSessionData>> {
  // This is a simplified mock of getIronSession for testing purposes
  const session = {
    cart: { items: [], total: 0 },
    save: jest.fn(),
    destroy: jest.fn(),
  } as unknown as IronSession<TestSessionData>
  return session
}

const mockProduct: Product = {
  id: 'prod1',
  name: 'Test Product',
  price: 100,
  images: ['/test.jpg'],
  category: 'Test',
  colors: [],
  sizes: [],
  description: '',
  quantity: 1,
  stock: 10,
  details: [],
  fit_details: [],
  fabric_details: [],
  reviews: [],
  rating_summary: {
    average: 0,
    count: 0,
    distribution: [],
  },
}

describe('Cart API', () => {
  it('should keep user carts separate', async () => {
    // --- User 1 --- //
    const { req: req1, res: res1 } = createMocks<
      NextApiRequest,
      NextApiResponse
    >()
    const session1 = await createSession()

    // Add item to User 1's cart
    req1.method = 'POST'
    req1.body = { product: mockProduct, quantity: 1 }
    // Manually attach the session to the mocked request for the handler
    Object.assign(req1, { session: session1 })
    await addHandler(req1, res1)

    expect(res1._getStatusCode()).toBe(200)
    const cart1 = JSON.parse(res1._getData())
    expect(cart1.items).toHaveLength(1)
    expect(cart1.items[0].id).toBe('prod1')

    // --- User 2 --- //
    const { req: req2, res: res2 } = createMocks<
      NextApiRequest,
      NextApiResponse
    >()
    const session2 = await createSession()

    // User 2's cart should be empty initially
    req2.method = 'GET'
    Object.assign(req2, { session: session2 })
    await getHandler(req2, res2)

    expect(res2._getStatusCode()).toBe(200)
    const cart2 = JSON.parse(res2._getData())
    expect(cart2.items).toHaveLength(0)

    // --- Verify User 1's cart is unchanged --- //
    const { req: req1Get, res: res1Get } = createMocks<
      NextApiRequest,
      NextApiResponse
    >()
    // We need to re-apply the cookies from the first response to simulate the same user
    req1Get.headers.cookie = res1.getHeaders()['set-cookie'] as string
    const session1Again = await createSession()
    Object.assign(req1Get, { session: session1Again })

    await getHandler(req1Get, res1Get)
    expect(res1Get._getStatusCode()).toBe(200)
    const cart1Again = JSON.parse(res1Get._getData())
    expect(cart1Again.items).toHaveLength(1)
    expect(cart1Again.items[0].id).toBe('prod1')
  })
})
