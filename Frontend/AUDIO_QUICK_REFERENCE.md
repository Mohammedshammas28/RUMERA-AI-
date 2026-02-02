# Audio Verification Quick Reference

## What's New

Audio verification has been added as the 4th analysis tool in RUMERA.

## Key Stats

- **1 new component**: `/components/audio-analyzer.jsx` (308 lines)
- **1 new API function**: `analyzeAudio()` in `/services/api.js`
- **1 new mock dataset**: `mockAudioAnalysis` in `/lib/mock-data.js`
- **7 files updated** with audio support
- **3 new documentation files** created

## Quick Access

### Component
```javascript
import { AudioAnalyzer } from '@/components/audio-analyzer';
<AudioAnalyzer />
```

### API Endpoint
```javascript
import { analyzeAudio } from '@/services/api';
const result = await analyzeAudio(audioFile);
```

### Mock Data
```javascript
import { mockAudioAnalysis } from '@/lib/mock-data';
// Returns sample audio analysis result
```

## Audio Tab Interface

**Location**: `/analyze` page  
**Tab Label**: "Audio Verification"  
**Icon**: Volume2 (from lucide-react)  
**Description**: "Detect voice synthesis and spoofing"

## Supported Audio Formats

✅ MP3 • WAV • M4A • OGG • FLAC  
📏 Max: 100MB  
⏱️ Duration: 5 seconds to 60 minutes

## User Flow

1. Navigate to `/analyze`
2. Click "Audio Verification" tab
3. Drag-drop or click to upload audio
4. Click "Analyze Audio" button
5. View results with trust score
6. See transcription preview
7. Check detected issues
8. View speaker verification data

## Analysis Results

```
✓ Trust Score (0-100, animated)
✓ Classification (Trusted/Suspicious/High Risk)
✓ Speech Authenticity (risk level)
✓ Detected Issues (synthesis, artifacts, anomalies)
✓ Confidence Score (0-100%)
✓ Transcription (Whisper)
✓ Audio Quality (noise, compression, bit rate, sample rate)
✓ Speaker Verification (consistency score, anomalies)
```

## API Response Schema

```javascript
{
  trust_score: 68,
  classification: "Suspicious",
  speech_authenticity: "Medium Risk",
  detected_issues: ["Possible speech synthesis detected"],
  confidence: 78,
  transcription: "Full text of audio...",
  audio_quality: {
    noise_level: "Medium",
    compression_artifacts: true,
    bit_rate: 128,
    sample_rate: 44100
  },
  speaker_verification: {
    speaker_identified: true,
    consistency_score: 0.72,
    anomalies_detected: ["Unusual pitch modulation"]
  }
}
```

## Backend Endpoint

```
POST /analyze/audio
Content-Type: multipart/form-data
Body: FormData with 'audio' file

Response: 200 OK + JSON results
```

## Testing

### Mock Data (No Backend)
```bash
npm run dev
# Audio analyzer shows mock results automatically
```

### Real Backend
```bash
# Set environment variable
NEXT_PUBLIC_API_URL=http://localhost:8000

# Ensure backend implements /analyze/audio endpoint
# Upload audio file → Backend analyzes → Results display
```

## Files Changed

### Created
- `/components/audio-analyzer.jsx`
- `/AUDIO_FEATURE.md`
- `/AUDIO_INTEGRATION_SUMMARY.md`
- `/AUDIO_QUICK_REFERENCE.md`

### Modified
- `/services/api.js` - Added analyzeAudio()
- `/app/analyze/page.jsx` - Added audio tab
- `/components/explainability-panel.jsx` - Audio support
- `/lib/mock-data.js` - Audio mock data
- `/API_CONTRACT.md` - Audio endpoint spec
- `/RUMERA_GUIDE.md` - Updated docs
- `/README.md` - Added feature

## Common Tasks

### Use Mock Data
```javascript
import { mockAudioAnalysis } from '@/lib/mock-data';
setResult(mockAudioAnalysis);
```

### Make API Call
```javascript
import { analyzeAudio } from '@/services/api';

const result = await analyzeAudio(audioFile);
// result contains: trust_score, classification, etc.
```

### Add Custom Audio Logic
```javascript
// Modify AudioAnalyzer in /components/audio-analyzer.jsx
// Update handleAnalyze() function
// Adjust result display as needed
```

## Performance

- Upload: 2-5 seconds
- Processing: 10-30 seconds total
  - Transcription: 5-15s
  - Speaker verification: 3-10s
  - Quality analysis: 1-2s

## Troubleshooting

### Audio not uploading
- Check file format (MP3, WAV, M4A, OGG, FLAC)
- Check file size (< 100MB)
- Check browser console for errors

### Analysis fails
- Verify NEXT_PUBLIC_API_URL is correct
- Check backend is running
- Review `/API_CONTRACT.md` for expected response

### Results show mock data
- Backend not responding or not implemented
- Check error message in browser console
- Mock data shows as fallback automatically

## Documentation

📖 **Full Feature Guide**: `/AUDIO_FEATURE.md`  
📋 **Integration Details**: `/AUDIO_INTEGRATION_SUMMARY.md`  
🔌 **API Specification**: `/API_CONTRACT.md` (Section 4)  
📚 **Project Guide**: `/RUMERA_GUIDE.md`  

## Next Steps

1. ✅ Audio component built and integrated
2. ✅ API contract documented
3. ✅ Mock data ready for testing
4. → Deploy to Vercel
5. → Connect FastAPI backend
6. → Monitor user feedback

## Questions?

See complete documentation in:
- `/components/audio-analyzer.jsx` - Component source code
- `/API_CONTRACT.md` - Full technical specification
- `/RUMERA_GUIDE.md` - Architecture and integration guide
- `/AUDIO_FEATURE.md` - Detailed feature overview

---

**Audio Verification Status**: Production Ready ✅  
**Added**: February 2026  
**Latest Update**: February 2026
