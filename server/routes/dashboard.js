const express = require('express')
const router  = express.Router()
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')

// ── Auth middleware ───────────────────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Support both { userId } and { id } in token payload
    req.userId = decoded.userId || decoded.id
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// ── GET dashboard data ────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('quizResult savedColleges activityLog')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({
      quizResult:    user.quizResult    || null,
      savedColleges: user.savedColleges || [],
      activityLog:   user.activityLog   || [],
    })
  } catch (err) {
    console.error('Dashboard GET error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── SAVE quiz result ──────────────────────────────────────────────────────────
router.post('/quiz', auth, async (req, res) => {
  try {
    const result = { ...req.body, takenAt: new Date().toISOString() }
    await User.findByIdAndUpdate(
      req.userId,
      {
        $set:  { quizResult: result },
        $push: {
          activityLog: {
            $each:     [{ emoji: '🎯', title: `Quiz completed — Top match: ${result.topCareer}`, desc: result.fieldTitle || '', time: new Date().toISOString() }],
            $position: 0,
            $slice:    50,
          }
        }
      }
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('Dashboard quiz error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── SAVE college ──────────────────────────────────────────────────────────────
router.post('/colleges/save', auth, async (req, res) => {
  try {
    const college = { ...req.body, savedAt: new Date().toISOString() }
    const user    = await User.findById(req.userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    if (user.savedColleges?.find(c => c.id === college.id)) {
      return res.json({ ok: true, message: 'Already saved' })
    }

    await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          savedColleges: { $each: [college], $position: 0 },
          activityLog:   {
            $each:     [{ emoji: '🏫', title: `Saved college: ${college.name}`, desc: college.location || '', time: new Date().toISOString() }],
            $position: 0,
            $slice:    50,
          }
        }
      }
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('Dashboard save college error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ── REMOVE college ────────────────────────────────────────────────────────────
router.post('/colleges/remove', auth, async (req, res) => {
  try {
    const { id } = req.body
    await User.findByIdAndUpdate(req.userId, { $pull: { savedColleges: { id } } })
    res.json({ ok: true })
  } catch (err) {
    console.error('Dashboard remove college error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router