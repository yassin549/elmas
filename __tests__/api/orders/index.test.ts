import { createMocks } from 'node-mocks-http'
import handler from '../../../pages/api/orders'
import { db } from '../../../lib/db'

// Mock the db object
jest.mock('../../../lib/db', () => ({
  db: {
    read: jest.fn(),
    write: jest.fn(),
  },
}))

describe('/api/orders', () => {
  let mockDbData

  beforeEach(() => {
    // Reset mocks and setup the mock db before each test
    jest.clearAllMocks()
    mockDbData = {
      orders: [],
      products: [],
      users: [],
    }
    ;(db.read as jest.Mock).mockResolvedValue(mockDbData)
    // Mock the write function to resolve without doing anything
    ;(db.write as jest.Mock).mockResolvedValue(undefined)
  })

  it('should create an order successfully with valid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        items: [
          {
            id: 'prod_1',
            name: 'Test Product',
            price: 100,
            quantity: 1,
            images: ['/test.jpg'],
          },
        ],
        total: 100,
        shippingAddress: {
          fullName: 'Test User',
          address: '123 Test St',
          city: 'Testville',
          postalCode: '12345',
          country: 'Testland',
        },
        paymentMethod: 'Credit Card',
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    const responseData = res._getJSONData()
    expect(responseData.message).toBe('Order created successfully!')
    expect(responseData.order.total).toBe(100)
    expect(db.write).toHaveBeenCalledTimes(1)
    const writtenData = (db.write as jest.Mock).mock.calls[0][0]
    expect(writtenData.orders.length).toBe(1)
  })

  it('should return 400 if required fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        // Missing 'total' and other fields
        items: [
          {
            id: 'prod_1',
            name: 'Test Product',
            price: 100,
            quantity: 1,
            images: ['/test.jpg'],
          },
        ],
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({
      message: 'Missing required order information.',
    })
    expect(db.write).not.toHaveBeenCalled()
  })

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(405)
  })
})
