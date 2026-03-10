import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  stream: String,
  grade: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  await connectDB();
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { name: user.name, email: user.email, stream: user.stream, grade: user.grade } });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
}