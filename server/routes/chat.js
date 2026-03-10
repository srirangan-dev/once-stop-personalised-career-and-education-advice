const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { messages, system } = req.body;
  if (!messages || !system) return res.status(400).json({ error: "Missing fields" });

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: system },
          ...messages
        ],
        temperature: 0.4,
        max_tokens: 512
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data?.error?.message });

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) return res.status(500).json({ error: "Empty response" });

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;