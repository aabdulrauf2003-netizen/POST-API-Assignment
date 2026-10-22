import Product from '../models/Product.js';

export default async function addProduct(req, res) {
  try {
    const { id, cat, name, price, img = '' } = req.body;
    if (!id || !cat || !name || price === undefined) {
      return res.status(400).json({ message: 'id, cat, name, and price are required' });
    }
    const product = await Product.create({ id, cat, name, price, img });
    return res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Product id already exists' });
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: 'Failed to create product' });
  }
}
