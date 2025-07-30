import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

// Define the structure for shipping and cart items for type safety
interface ShippingDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the structure of an order
interface Order {
  id: string;
  createdAt: string;
  shipping: ShippingDetails;
  items: CartItem[];
  total: number;
}

// Define the structure of the API response
type Data = {
  message: string;
  order?: Order;
};

// Path to the mock database file in a writable directory
const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

// Ensure the data directory exists
const ensureDataDirExists = async () => {
  try {
    await fs.mkdir(path.dirname(ordersFilePath), { recursive: true });
  } catch (error) {
    // Ignore error if directory already exists, but log others
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      console.error('Error creating data directory:', error);
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    await ensureDataDirExists();

    const { shipping, items, total } = req.body;

    // Basic validation
    if (!shipping || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Missing required order data.' });
    }

    const newOrder: Order = {
      id: `ord_${new Date().getTime()}`,
      createdAt: new Date().toISOString(),
      shipping,
      items,
      total,
    };

    let orders: Order[] = [];
    try {
      const fileData = await fs.readFile(ordersFilePath, 'utf-8');
      orders = JSON.parse(fileData);
    } catch (error) {
      // If the file doesn't exist, we'll create it. This is expected.
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error; // Rethrow unexpected errors
      }
    }

    orders.push(newOrder);

    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

    return res
      .status(201)
      .json({ message: 'Order created successfully!', order: newOrder });
  } catch (error) {
    console.error('Failed to process order:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
