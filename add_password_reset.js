import PasswordReset from '../models/PasswordReset.js';

// Expects codeHash, not the plain-text reset code. Generate/hash the code in the reset workflow.
export default async function addPasswordReset(req, res) {
  try {
    const { email, codeHash, expiresAt, attempts = 0 } = req.body;
    if (!email || !codeHash || !expiresAt) {
      return res.status(400).json({ message: 'email, codeHash, and expiresAt are required' });
    }
    const expiry = new Date(expiresAt);
    if (Number.isNaN(expiry.getTime()) || expiry <= new Date()) {
      return res.status(400).json({ message: 'expiresAt must be a valid future date' });
    }
    const reset = await PasswordReset.findOneAndUpdate(
      { email: email.trim().toLowerCase() },
      { email: email.trim().toLowerCase(), codeHash, expiresAt: expiry, attempts },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    return res.status(201).json({ message: 'Password reset record saved', data: { email: reset.email, expiresAt: reset.expiresAt, attempts: reset.attempts } });
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(400).json({ message: error.message });
    return res.status(500).json({ message: 'Failed to save password reset record' });
  }
}
