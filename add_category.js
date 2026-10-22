import Category from '../models/Category.js';

export default async function addCategory(req, res) {
  try {
    const { id, name, tagline = '', image = '' } = req.body;
    if (!id || !name) return res.status(400).json({ message: 'id and name are required' });
    const category = await Category.create({ id, name, tagline, image });
    return res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Category id already exists' });
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: 'Failed to create category' });
  }
}
