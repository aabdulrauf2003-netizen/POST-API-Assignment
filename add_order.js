import Order from '../models/Order.js';

export default async function addOrder(req, res) {
  try {
    const { orderId, email, total, items = [], ...optionalFields } = req.body;
    if (!orderId || !email || total === undefined) {
      return res.status(400).json({ message: 'orderId, email, and total are required' });
    }
    if (!Array.isArray(items)) return res.status(400).json({ message: 'items must be an array' });
    const order = await Order.create({ orderId, email, total, items, ...optionalFields });
    return res.status(201).json({ message: 'Order created successfully', data: order });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'orderId already exists' });
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: 'Failed to create order' });
  }
}
