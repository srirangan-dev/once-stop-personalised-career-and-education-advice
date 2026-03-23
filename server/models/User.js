const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:     { type: String },
  username: { type: String },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  stream:   { type: String },
   grade:    { type: String },
  quizResult:    { type: mongoose.Schema.Types.Mixed, default: null },
  savedColleges: { type: [mongoose.Schema.Types.Mixed], default: [] },
  activityLog:   { type: [mongoose.Schema.Types.Mixed], default: [] },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)