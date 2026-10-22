import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';

export default async function addAdmin(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'username and password are required' });
    }
    const existing = await Admin.findOne({ username: username.trim() });
    if (existing) return res.status(409).json({ message: 'Username already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    return res.status(201).json({ message: 'Admin created successfully', data: { id: admin._id, username: admin.username } });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Username already exists' });
    return res.status(500).json({ message: 'Failed to create admin' });
  }
}
