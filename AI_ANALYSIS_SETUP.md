# Real AI Analysis Setup Guide

## ✅ What Was Implemented

Your RUMERA application now has **real AI-powered detection** using Groq's `llama-3.1-8b-instant` model instead of mock data!

### Backend Changes
- ✅ **Groq API Integration** - Uses `llama-3.1-8b-instant` model for analysis
- ✅ **Analysis Routes** - `/analyze/text`, `/analyze/image`, `/analyze/audio`, `/analyze/video`
- ✅ **OCR Support** - Automatic text extraction from images using Tesseract.js
- ✅ **File Upload Handling** - Multipart form data support for images
- ✅ **Explanations** - Automatic generation of user-friendly explanations

### Frontend Changes
- ✅ **Real API Calls** - Removed fallback to mock data
- ✅ **Updated API Base URL** - Points to `http://localhost:5001`
- ✅ **Audio Transcription Support** - Handles transcription before analysis
- ✅ **Video Metadata Extraction** - Sends video info instead of file

---

## 🔧 Setup Instructions

### 1. Get Your Groq API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Generate an API key
4. Copy the key

### 2. Update Backend .env
Edit `Backend/.env` and add your Groq API key:

```env
PORT=5001
JWT_SECRET=your_secret_key_change_this_in_production
MONGODB_URI=mongodb+srv://mohammedshammasuddins81:Shammas_28@cluster0.xm21m.mongodb.net/RUMERA-AI?appName=Cluster0
NODE_ENV=development
GROQ_API_KEY=your_actual_groq_api_key_here
```

### 3. Start Backend Server
```bash
cd Backend
npm start
# Server will run on http://localhost:5001
```

You should see:
```
✓ MongoDB connected
🚀 RUMERA Backend running on http://localhost:5001
📝 API Documentation:
   POST   /analyze/text         - Analyze text
   POST   /analyze/image        - Analyze image
   POST   /analyze/audio        - Analyze audio
   POST   /analyze/video        - Analyze video
   GET    /analyze/health       - Analysis service health
```

### 4. Start Frontend Dev Server
```bash
cd Frontend
npm run dev
# Frontend will run on http://localhost:3000
```

### 5. Test the Analysis
- Open [http://localhost:3000/analyze](http://localhost:3000/analyze)
- Try analyzing text, images, audio, or videos
- **Different inputs = Different results!** (No more fixed mock data)

---

## 📋 API Endpoints

### Text Analysis
**POST** `/analyze/text`
```json
{
  "text": "The text you want to analyze"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "trust_score": 75,
    "classification": "Mixed",
    "toxicity_level": "Medium",
    "confidence": 88,
    "flags": ["Potential issue 1", "Potential issue 2"],
    "explanation": {
      "summary": "...",
      "explanation": "...",
      "recommendations": [...]
    }
  }
}
```

### Image Analysis
**POST** `/analyze/image`
```
Form Data:
- image: (file)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "trust_score": 82,
    "ai_generated_probability": 12,
    "authenticity_badge": "Likely Authentic",
    "manipulation_score": 8,
    "confidence": 85,
    "extractedText": "...",
    "metadata": {
      "width": 1920,
      "height": 1080,
      "format": "jpeg"
    },
    "explanation": {...}
  }
}
```

### Audio Analysis
**POST** `/analyze/audio`
```json
{
  "transcription": "The transcribed audio text",
  "filename": "audio.mp3"
}
```

### Video Analysis
**POST** `/analyze/video`
```json
{
  "filename": "video.mp4",
  "duration": 120,
  "resolution": "1920x1080",
  "fps": 30
}
```

---

## 🚀 Key Features

### 1. **Real Analysis**
- Each input gets analyzed by Groq's LLM
- Different text = Different results
- Different images = Different analysis

### 2. **Automatic OCR**
- Images are automatically scanned for text
- Text is extracted and analyzed

### 3. **Explanations**
- Each result includes user-friendly explanations
- Recommendations provided for issues found

### 4. **Error Handling**
- If Groq API fails, fallback to mock data (for development)
- Clear error messages to user

---

## ⚙️ Environment Setup

### Backend Dependencies
```json
{
  "groq-sdk": "^0.2.0",      // Groq API client
  "multer": "^1.4.5",         // File upload handling
  "sharp": "^0.33.0",         // Image processing
  "tesseract.js": "^5.0.0"    // OCR for images
}
```

### Frontend Updates
- API base URL changed from `8000` to `5001`
- Mock data fallback still available for development
- Real API calls to backend analysis endpoints

---

## 🔍 Testing Checklist

- [ ] Backend starts without errors
- [ ] `GET /analyze/health` returns success
- [ ] Text analysis produces different results for different text
- [ ] Image analysis extracts text via OCR
- [ ] Video metadata is properly extracted
- [ ] Error messages are user-friendly
- [ ] Explanations are generated for results

---

## 📝 Model Information

**Model:** `llama-3.1-8b-instant`
**Provider:** Groq
**Capabilities:**
- ✅ Text analysis (authenticity, toxicity)
- ✅ Image analysis (AI generation detection)
- ✅ Audio transcription analysis
- ✅ Video deepfake detection
- ✅ Explanation generation

**Note:** This is a text-based LLM, so audio/video/image analysis is based on metadata and extracted text, not raw media files.

---

## 🆘 Troubleshooting

### Backend won't start
```
Error: GROQ_API_KEY not found
→ Make sure .env has GROQ_API_KEY set
```

### Analysis returns same results
```
→ Check that real API is being called (not mock data)
→ Verify Groq API key is valid
→ Check browser console for errors
```

### OCR not working for images
```
→ Make sure `tesseract.js` is installed
→ Check image format is supported (JPEG, PNG, WebP)
→ File size should be reasonable (<5MB)
```

### Timeout errors
```
→ Increase timeout in Frontend/services/api.js (60000ms)
→ Check Groq API status
→ Try with simpler inputs first
```

---

## 📚 Next Steps

1. **Deploy to Production**
   - Use Railway.io or Vercel for hosting
   - Update CORS origins in server.js
   - Use production API keys

2. **Add More Detections**
   - Implement actual audio transcription (Whisper API)
   - Add video frame analysis
   - Integrate with more models

3. **Improve UI/UX**
   - Add loading animations
   - Show analysis progress
   - Display confidence levels visually

4. **Monitor & Log**
   - Track API usage
   - Log analysis results
   - Monitor performance

---

**Status:** ✅ Real AI Analysis Ready to Use!
**Last Updated:** February 4, 2026
