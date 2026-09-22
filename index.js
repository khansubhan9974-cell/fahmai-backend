// Fahm AI - Backend Server Code
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// API Key को सुरक्षित रूप से Environment Variable से पढ़ा जाएगा
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Chat Route - फ्रंटएंड यहाँ से कनेक्ट होगा
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Root Route - सर्वर चेक करने के लिए
app.get('/', (req, res) => {
  res.send('Fahm AI Backend is running securely!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
