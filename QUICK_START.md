# RUMERA Quick Start Guide

## 🚀 30-Second Overview

RUMERA is a production-ready AI trust platform for verifying content authenticity. Built with Next.js 16, fully responsive, dark mode supported, and production-ready.

## 📦 What You Get

```
Landing Page      → Marketing & CTAs
Analyze Dashboard → Text/Image/Video verification
History Page      → View & manage past analyses
About Page        → Mission & ethics transparency
```

## ⚡ Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

## 🔌 Connect Backend

Set this environment variable:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Or for production:
```env
NEXT_PUBLIC_API_URL=https://api.rumera.example.com
```

## 📁 Project Structure

```
app/                    # Pages
├── page.jsx            # Landing
├── analyze/page.jsx    # Analyze
├── history/page.jsx    # History
├── about/page.jsx      # About
└── globals.css         # Design tokens

components/             # UI Components
├── navigation.jsx      # Header
├── trust-score.jsx     # Score display
├── *-analyzer.jsx      # Analysis tools

services/
└── api.js             # API client
```

## 🎨 Design System

**Colors**:
- Primary: Violet/Blue
- Success: Emerald
- Warning: Amber
- Error: Rose
- Neutral: Grays

**Fonts**: Geist (sans-serif)

**Dark Mode**: Fully supported

## 🧩 Key Components

| Component | Purpose |
|-----------|---------|
| `TrustScore` | Animated 0-100 score |
| `ExplainabilityPanel` | AI model explanation |
| `TextAnalyzer` | Text verification UI |
| `ImageAnalyzer` | Image upload & analysis |
| `VideoAnalyzer` | Video upload & analysis |
| `Navigation` | Header with theme toggle |

## 📡 API Endpoints

Your FastAPI backend should implement:

```python
# Text analysis
POST /analyze/text
{
  "text": "Content to analyze"
}

# Image analysis
POST /analyze/image
FormData with image file

# Video analysis
POST /analyze/video
FormData with video file
```

## 💾 Response Format

```javascript
{
  trust_score: 0-100,           // Required
  classification: "string",      // e.g., "Clean", "Suspicious"
  confidence: 0-100,            // Confidence %
  flags: ["issue1", "issue2"],  // Flagged items
  // + analysis-specific fields
}
```

## 🌙 Dark Mode

Automatic system detection. User can toggle in header.

```bash
# No setup needed - works out of box
```

## 📱 Mobile Support

Fully responsive from 320px to 2560px+

- Touch-friendly buttons
- Optimized forms
- Responsive grids
- Mobile-optimized navigation

## 🔒 Security Features

- ✅ No data retention
- ✅ HTTPS ready
- ✅ Input validation ready
- ✅ Error handling
- ✅ Privacy-first messaging

## 🚀 Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys
# No extra configuration needed
```

## 🧪 Testing APIs

The app includes mock data at `/lib/mock-data.js`:

```javascript
import {
  mockTextAnalysis,
  mockImageAnalysis,
  mockVideoAnalysis,
} from '@/lib/mock-data';
```

Great for testing UI without backend.

## 🎯 Usage Examples

### Text Analysis
1. User opens /analyze
2. Clicks "Text Verification" tab
3. Pastes or types content
4. Clicks "Analyze Text"
5. See trust score, classification, explanations

### Image Analysis
1. Click "Image Verification" tab
2. Upload or drag image
3. Click "Analyze Image"
4. See authenticity badge, manipulation score

### Video Analysis
1. Click "Video Verification" tab
2. Upload video file
3. Click "Analyze Video"
4. See deepfake likelihood, face consistency

### History
1. Navigate to /history
2. View all past analyses
3. Filter by type
4. Download reports

## 🛠️ Development Tips

### Hot Reload
Changes auto-reload during development

### Debug
```javascript
console.log("[v0] Message:", value)
```

### Add Component
1. Create in `/components`
2. Import in page
3. Use in JSX

### Modify Styling
Edit `/app/globals.css` for design tokens

## 🚨 Common Issues

**API not connecting?**
- Check backend is running
- Verify NEXT_PUBLIC_API_URL
- Look at browser console

**Build errors?**
```bash
rm -rf .next
npm run build
```

**Dark mode not working?**
- Clear browser cache
- Check next-themes in layout.tsx

## 📚 Full Documentation

- **RUMERA_GUIDE.md** - Complete guide
- **DEPLOYMENT.md** - Production deployment
- **PROJECT_SUMMARY.md** - Project overview

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://framer.com/motion)

## ✅ Pre-Deployment Checklist

- [ ] Backend API configured
- [ ] Environment variables set
- [ ] Test all three analyzers
- [ ] Check dark mode works
- [ ] Test on mobile
- [ ] Verify all links work
- [ ] Check accessibility
- [ ] Run final build: `npm run build`

## 🚀 Ready to Deploy?

### Vercel
```bash
npm run build
# Push to GitHub, Vercel auto-deploys
```

### Docker
```bash
docker build -t rumera .
docker run -p 3000:3000 rumera
```

### Self-Hosted
```bash
npm run build
npm run start
```

## 💡 Pro Tips

1. **Use mock data for testing** - `/lib/mock-data.js`
2. **Theme persists** - User's dark/light choice saved
3. **Responsive by default** - No mobile-specific code needed
4. **Animations smooth** - Framer Motion handles performance
5. **Keyboard accessible** - Full keyboard navigation works

## 🎉 You're Ready!

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

Your production-ready RUMERA platform is running!

---

**Need Help?** Check the full documentation files or contact support.

**Built with trust and transparency** 🛡️
