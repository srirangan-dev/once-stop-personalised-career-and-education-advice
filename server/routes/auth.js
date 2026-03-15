const express  = require('express')
const router   = express.Router()
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const User     = require('../models/User')

// ── Auth middleware ───────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId || decoded.id
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ── REGISTER ──────────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, stream, grade } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ error: 'Email already registered' })

    const hashed = await bcrypt.hash(password, 10)
    const user   = await User.create({ name, username, email, password: hashed, stream, grade })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email, stream: user.stream, grade: user.grade },
    })
  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── LOGIN ─────────────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid email or password' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: 'Invalid email or password' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({
      token,
      user: { id: user._id, name: user.name, username: user.username, email: user.email, stream: user.stream, grade: user.grade },
    })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── GET profile ───────────────────────────────────────────────────────────────
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── UPDATE profile (stream, grade, name) ──────────────────────────────────────
router.put('/profile', auth, async (req, res) => {
  try {
    const { stream, grade, name } = req.body
    const updated = await User.findByIdAndUpdate(
      req.userId,
      { $set: { stream, grade, name } },
      { new: true }
    ).select('-password')

    if (!updated) return res.status(404).json({ error: 'User not found' })
    res.json({ ok: true, user: updated })
  } catch (err) {
    console.error('Profile update error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router