require('dotenv').config();
const key = process.env.GEMINI_KEY;

fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + key, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'say hello' }] }] })
}).then(r => r.json()).then(d => console.log(JSON.stringify(d, null, 2))).catch(console.error);