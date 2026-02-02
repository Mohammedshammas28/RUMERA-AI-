# RUMERA API Contract

## Overview

This document defines the API contract between the RUMERA frontend and FastAPI backend. The frontend expects these endpoints and response formats.

## Base Configuration

```
Base URL: http://localhost:8000 (development)
Base URL: https://api.rumera.example.com (production)
Content-Type: application/json or multipart/form-data
Timeout: 30 seconds
```

## Endpoints

### 1. Text Analysis

Analyze text for hate speech, toxic language, and harmful content.

**Endpoint**: `POST /analyze/text`

**Request**:
```json
{
  "text": "The text content to analyze"
}
```

**Response** (200 OK):
```json
{
  "trust_score": 75,
  "classification": "Mixed",
  "toxicity_level": "Medium",
  "confidence": 88,
  "flags": [
    "Potential harassment",
    "Heated language"
  ]
}
```

**Response Fields**:
- `trust_score` (int, 0-100): Overall trust score
- `classification` (string): "Clean", "Mixed", "Toxic"
- `toxicity_level` (string): "None", "Low", "Medium", "High"
- `confidence` (int, 0-100): Confidence of analysis
- `flags` (array of strings): Specific issues detected

**Error Response** (400):
```json
{
  "error": "Text is required",
  "status": 400
}
```

---

### 2. Image Analysis

Detect AI-generated and manipulated images.

**Endpoint**: `POST /analyze/image`

**Request**:
```
Content-Type: multipart/form-data
- image: File (JPEG, PNG, WebP)
```

**Response** (200 OK):
```json
{
  "trust_score": 82,
  "ai_generated_probability": 12,
  "authenticity_badge": "Likely Authentic",
  "manipulation_score": 8,
  "confidence": 85
}
```

**Response Fields**:
- `trust_score` (int, 0-100): Overall authenticity score
- `ai_generated_probability` (int, 0-100): % chance image is AI-generated
- `authenticity_badge` (string): "Likely Authentic", "Suspicious", "AI-Generated"
- `manipulation_score` (int, 0-100): Likelihood of manipulation
- `confidence` (int, 0-100): Confidence of analysis

**Image Requirements**:
- Format: JPEG, PNG, WebP, GIF
- Max size: 50MB recommended
- Resolution: 100x100 to 4096x4096px

**Error Response** (400):
```json
{
  "error": "Invalid image format",
  "status": 400
}
```

---

### 3. Video Analysis

Detect deepfakes and face manipulations in video.

**Endpoint**: `POST /analyze/video`

**Request**:
```
Content-Type: multipart/form-data
- video: File (MP4, WebM, MOV)
```

**Response** (202 Accepted - Processing may be async):
```json
{
  "trust_score": 61,
  "deepfake_likelihood": 28,
  "face_consistency": 85,
  "risk_label": "Moderate Risk",
  "frames_analyzed": 240,
  "confidence": 79,
  "processing_time_seconds": 45
}
```

**Response Fields**:
- `trust_score` (int, 0-100): Overall authenticity score
- `deepfake_likelihood` (int, 0-100): % chance video contains deepfakes
- `face_consistency` (int, 0-100): Consistency of facial features across frames
- `risk_label` (string): "Trusted", "Suspicious", "High Risk"
- `frames_analyzed` (int): Number of frames processed
- `confidence` (int, 0-100): Confidence of analysis
- `processing_time_seconds` (int): Time taken to analyze

**Video Requirements**:
- Format: MP4, WebM, MOV, AVI
- Max size: 500MB recommended
- Duration: 5 seconds to 10 minutes
- Resolution: 480p to 4K

**Error Response** (400):
```json
{
  "error": "Video file too large",
  "status": 400
}
```

---

### 4. Audio Analysis

Detect voice synthesis, speech spoofing, and audio deepfakes using Whisper transcription and speaker verification.

**Endpoint**: `POST /analyze/audio`

**Request**:
```
Content-Type: multipart/form-data
- audio: File (MP3, WAV, M4A, OGG, FLAC)
```

**Response** (200 OK):
```json
{
  "trust_score": 68,
  "classification": "Suspicious",
  "speech_authenticity": "Medium Risk",
  "detected_issues": [
    "Possible speech synthesis detected",
    "Audio compression artifacts present",
    "Unusual speech patterns identified"
  ],
  "confidence": 78,
  "transcription": "Full text transcription of the audio content...",
  "audio_quality": {
    "noise_level": "Medium",
    "compression_artifacts": true,
    "bit_rate": 128,
    "sample_rate": 44100
  },
  "speaker_verification": {
    "speaker_identified": true,
    "consistency_score": 0.72,
    "anomalies_detected": ["Unusual pitch modulation"]
  }
}
```

**Response Fields**:
- `trust_score` (int, 0-100): Overall authenticity score
- `classification` (string): "Trusted", "Suspicious", "High Risk"
- `speech_authenticity` (string): Risk assessment of voice authenticity
- `detected_issues` (array): Specific issues found in audio
- `confidence` (int, 0-100): Confidence of analysis
- `transcription` (string): Full text transcription via Whisper
- `audio_quality` (object): Technical metrics of audio file
- `speaker_verification` (object): Speaker consistency analysis

**Audio Requirements**:
- Format: MP3, WAV, M4A, OGG, FLAC
- Max size: 100MB
- Duration: 5 seconds to 60 minutes
- Sample rate: 8kHz to 48kHz

**Error Response** (400):
```json
{
  "error": "Invalid audio format",
  "status": 400
}
```

---

## Error Handling

### Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 202 | Accepted (async processing) |
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized |
| 413 | Payload too large |
| 500 | Server error |
| 503 | Service unavailable |

### Error Response Format

```json
{
  "error": "Human-readable error message",
  "status": 400,
  "details": {
    "field": "text",
    "issue": "Field is required"
  }
}
```

### Frontend Error Handling

Frontend catches errors and shows user-friendly messages:

```javascript
try {
  const result = await analyzeText(text);
  // Success
} catch (err) {
  // Shows: "Analysis failed. Please try again."
  // Logs: err.message
}
```

---

## CORS Requirements

Backend must allow requests from frontend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",           # Dev
        "https://rumera.example.com"       # Production
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
```

---

## Rate Limiting

Recommended rate limits:

```
Text Analysis: 100 requests/minute per IP
Image Analysis: 10 requests/minute per IP
Video Analysis: 5 requests/minute per IP
```

Frontend respects these limits with appropriate messaging.

---

## Authentication (Future)

Reserved for future authentication:

```
Header: Authorization: Bearer {token}
```

Currently not implemented but structure is ready.

---

## Sample Implementation (FastAPI)

```python
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import asyncio

app = FastAPI()

# Add CORS middleware
# (see above)

@app.post("/analyze/text")
async def analyze_text(request: dict):
    """Analyze text for hate speech and toxicity"""
    text = request.get("text", "").strip()
    
    if not text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    if len(text) > 5000:
        raise HTTPException(status_code=400, detail="Text too long (max 5000 chars)")
    
    # Your analysis logic
    try:
        result = await your_text_model.analyze(text)
        return {
            "trust_score": result.score,
            "classification": result.class_label,
            "toxicity_level": result.toxicity,
            "confidence": result.confidence,
            "flags": result.flags
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/image")
async def analyze_image(image: UploadFile = File(...)):
    """Analyze image for AI-generation and manipulation"""
    if not image.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        raise HTTPException(status_code=400, detail="Invalid image format")
    
    if image.size > 50 * 1024 * 1024:  # 50MB
        raise HTTPException(status_code=413, detail="Image too large")
    
    # Your analysis logic
    try:
        contents = await image.read()
        result = await your_image_model.analyze(contents)
        return {
            "trust_score": result.score,
            "ai_generated_probability": result.ai_prob,
            "authenticity_badge": result.badge,
            "manipulation_score": result.manipulation,
            "confidence": result.confidence
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/video")
async def analyze_video(video: UploadFile = File(...)):
    """Analyze video for deepfakes and face manipulation"""
    if not video.filename.lower().endswith(('.mp4', '.webm', '.mov', '.avi')):
        raise HTTPException(status_code=400, detail="Invalid video format")
    
    if video.size > 500 * 1024 * 1024:  # 500MB
        raise HTTPException(status_code=413, detail="Video too large")
    
    # Async processing
    try:
        contents = await video.read()
        # Process in background
        result = await your_video_model.analyze(contents)
        return {
            "trust_score": result.score,
            "deepfake_likelihood": result.deepfake_prob,
            "face_consistency": result.face_consistency,
            "risk_label": result.risk_label,
            "frames_analyzed": result.frames,
            "confidence": result.confidence,
            "processing_time_seconds": result.time_taken
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/audio")
async def analyze_audio(audio: UploadFile = File(...)):
    """Analyze audio for voice synthesis, spoofing, and deepfakes"""
    if not audio.filename.lower().endswith(('.mp3', '.wav', '.m4a', '.ogg', '.flac')):
        raise HTTPException(status_code=400, detail="Invalid audio format")
    
    if audio.size > 100 * 1024 * 1024:  # 100MB
        raise HTTPException(status_code=413, detail="Audio file too large")
    
    # Analysis using Whisper for transcription and speaker verification
    try:
        contents = await audio.read()
        result = await your_audio_model.analyze(contents)
        return {
            "trust_score": result.score,
            "classification": result.classification,
            "speech_authenticity": result.authenticity,
            "detected_issues": result.issues,
            "confidence": result.confidence,
            "transcription": result.transcription,
            "audio_quality": {
                "noise_level": result.noise_level,
                "compression_artifacts": result.has_artifacts,
                "bit_rate": result.bit_rate,
                "sample_rate": result.sample_rate
            },
            "speaker_verification": {
                "speaker_identified": result.speaker_identified,
                "consistency_score": result.consistency,
                "anomalies_detected": result.anomalies
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Testing the API

### Using curl

```bash
# Text analysis
curl -X POST http://localhost:8000/analyze/text \
  -H "Content-Type: application/json" \
  -d '{"text":"Sample text to analyze"}'

# Image analysis
curl -X POST http://localhost:8000/analyze/image \
  -F "image=@path/to/image.jpg"

# Video analysis
curl -X POST http://localhost:8000/analyze/video \
  -F "video=@path/to/video.mp4"

# Audio analysis
curl -X POST http://localhost:8000/analyze/audio \
  -F "audio=@path/to/audio.mp3"
```

### Using Frontend Mock Data

For testing without backend:

```javascript
import {
  mockTextAnalysis,
  mockImageAnalysis,
  mockVideoAnalysis,
} from '@/lib/mock-data';

// Use these in components during development
```

---

## Performance Considerations

### Expected Response Times

- **Text**: < 2 seconds (small texts)
- **Image**: 5-15 seconds (depends on size)
- **Video**: 30-120 seconds (depends on duration)

### Optimization Tips

1. Implement caching for repeated analyses
2. Use async processing for video
3. Validate file size before upload
4. Return results in chunks for large videos
5. Implement progress endpoints for long operations

---

## Versioning

Current API version: **v1** (default)

Reserve `/v2/` for future breaking changes:
```
POST /v1/analyze/text  (current)
POST /v2/analyze/text  (future)
```

---

## Support & Questions

For API integration questions:
1. Check this contract first
2. Review sample implementations
3. Check frontend `/services/api.js`
4. Test with mock data
5. Check browser console for errors

---

**API Contract Version**: 1.0
**Last Updated**: February 2026
**Status**: Production Ready
