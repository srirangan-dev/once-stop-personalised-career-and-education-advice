const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS defined once before routes
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://project-finder.vercel.app"   // ✅ replace with your real Vercel URL
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.get('/api/test', (req, res) => res.json({ ok: true }));

// Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});