import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export default async function addUser(req, res) {
  try {
    const { name = '', email, phone, password } = req.body;
    if (!email || !phone || !password) {
      return res.status(400).json({ message: 'email, phone, and password are required' });
    }
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) return res.status(409).json({ message: 'A user with this email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword });
    const result = user.toObject();
    delete result.password;
    return res.status(201).json({ message: 'User created successfully', data: result });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Email already exists' });
    return res.status(500).json({ message: 'Failed to create user' });
  }
}
