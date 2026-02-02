# RUMERA Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+ and npm
- FastAPI backend running on `http://localhost:8000` (for local testing)

### Setup

```bash
# Clone or download the project
cd rumera

# Install dependencies
npm install

# Set environment variables (optional)
# cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Production Deployment

### Vercel (Recommended)

RUMERA is built with Next.js and deploys optimally to Vercel.

#### Step 1: Prepare Repository
```bash
# Push to GitHub
git add .
git commit -m "Initial RUMERA deployment"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings

#### Step 3: Environment Variables
In Vercel dashboard:
1. Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_API_URL` with your backend API URL

Example:
```
NEXT_PUBLIC_API_URL=https://api.rumera.example.com
```

#### Step 4: Deploy
```bash
# Auto-deploys on git push to main
# Or manually deploy via dashboard
```

### Self-Hosted (Docker)

#### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run
```bash
# Build image
docker build -t rumera:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://api.rumera.example.com \
  rumera:latest
```

### Environment Variables for Production

```env
# Required: Backend API URL
NEXT_PUBLIC_API_URL=https://api.rumera.example.com

# Optional: Analytics
# (Vercel Analytics configured automatically if using Vercel)
```

## Backend Integration

### FastAPI Backend Setup

RUMERA frontend expects a FastAPI backend with these endpoints:

```python
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/text")
async def analyze_text(request: dict):
    text = request.get("text", "")
    # Your analysis logic here
    return {
        "trust_score": 85,
        "classification": "Clean",
        "toxicity_level": "Low",
        "confidence": 92,
        "flags": []
    }

@app.post("/analyze/image")
async def analyze_image(image: UploadFile = File(...)):
    # Image analysis logic
    return {
        "trust_score": 72,
        "ai_generated_probability": 28,
        "authenticity_badge": "Likely Authentic",
        "manipulation_score": 15,
        "confidence": 82
    }

@app.post("/analyze/video")
async def analyze_video(video: UploadFile = File(...)):
    # Video analysis logic
    return {
        "trust_score": 58,
        "deepfake_likelihood": 35,
        "face_consistency": 78,
        "risk_label": "Suspicious",
        "frames_analyzed": 240,
        "confidence": 79
    }
```

### Running Backend Locally

```bash
# Install FastAPI and Uvicorn
pip install fastapi uvicorn

# Run server
uvicorn main:app --reload --port 8000
```

## Performance Optimization

### Image Optimization
- Images are served via next/image (automatic optimization)
- SVG icons from lucide-react (smallest size)
- No large unoptimized assets

### Code Splitting
- Each page automatically code-split by Next.js
- Lazy loading for heavy components
- SWR ready for data caching

### Monitoring
Add monitoring in production:

```javascript
// app/page.jsx
import { Analytics } from '@vercel/analytics/next'

// Already included in layout.tsx
```

## Security Checklist

- [ ] Environment variables configured (API_URL)
- [ ] CORS properly configured on backend
- [ ] HTTPS enabled in production
- [ ] No sensitive data in client-side code
- [ ] API requests validated on backend
- [ ] File upload limits set
- [ ] Error messages don't expose internals
- [ ] Rate limiting on backend

## Scaling Considerations

### Database (Future)
```javascript
// When adding database (e.g., Supabase):
// - Store analysis history
// - User accounts and authentication
// - Model versioning
// - Analytics data
```

### Caching
```javascript
// Implement SWR for data fetching
import useSWR from 'swr'

const { data, error, isLoading } = useSWR('/api/history', fetcher)
```

### Load Balancing
- Vercel automatically load-balances
- For self-hosted: use Nginx or HAProxy
- Backend should scale independently

## Maintenance

### Regular Tasks
- Monitor API response times
- Check error logs
- Update dependencies monthly
- Review security advisories
- Backup user data (when available)

### Updating Dependencies
```bash
npm update
npm audit fix
npm run build  # Test build
```

## Troubleshooting

### API Connection Issues
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Verify backend is running
3. Check CORS headers on backend
4. Look at browser console for errors

### Build Errors
```bash
# Clear cache
rm -rf .next

# Rebuild
npm run build
```

### Performance Issues
1. Check Network tab in DevTools
2. Analyze bundle size: `npm run build` shows sizes
3. Monitor API response times
4. Use Lighthouse for audits

## Support

For deployment questions, refer to:
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- RUMERA_GUIDE.md for project structure

## License

RUMERA — A New Era of Truth
