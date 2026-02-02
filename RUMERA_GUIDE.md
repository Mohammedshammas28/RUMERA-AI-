# RUMERA — A New Era of Truth

## Project Overview

RUMERA is a production-quality, AI-powered trust platform designed to help individuals, journalists, educators, and organizations identify misinformation, hate speech, AI-generated content, and deepfakes in digital media.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (not TypeScript)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: lucide-react
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Themes**: next-themes (dark mode support)
- **Backend**: FastAPI (AI inference) - not included in this frontend

## Project Structure

```
/
├── app/
│   ├── page.jsx                    # Landing page
│   ├── layout.tsx                  # Root layout with theme support
│   ├── globals.css                 # Design system & theme tokens
│   ├── analyze/
│   │   └── page.jsx                # Analyze dashboard with tabs
│   ├── history/
│   │   └── page.jsx                # Analysis history & reports
│   └── about/
│       └── page.jsx                # Mission, ethics, and privacy info
├── components/
│   ├── navigation.jsx              # Header nav with theme toggle
│   ├── theme-toggle.jsx            # Dark/light mode switcher
│   ├── trust-score.jsx             # Circular trust score component
│   ├── explainability-panel.jsx    # AI model explanation UI
│   ├── text-analyzer.jsx           # Text analysis interface
│   ├── image-analyzer.jsx          # Image upload & analysis
│   ├── video-analyzer.jsx          # Video upload & analysis
│   ├── audio-analyzer.jsx          # Audio upload & analysis
│   └── ui/                         # shadcn/ui components
├── services/
│   └── api.js                      # API client with error handling
└── RUMERA_GUIDE.md                 # This file
```

## Key Features

### 1. Landing Page (/)
- Hero section with trust indicators
- "Why RUMERA?" feature showcase
- Trust score system explanation
- Call-to-action buttons
- Footer with links

### 2. Analyze Dashboard (/analyze)
Tabbed interface with three content analysis tools:

**Text Verification**
- Paste/type text to detect hate speech and toxic language
- Trust score output (0-100)
- Toxicity level and classification
- Flagged content indicators
- Explainability panel

**Image Verification**
- Upload images for AI-generation detection
- Authenticity badge
- Manipulation score with visual bar
- Confidence percentage
- Transparent model information

**Video Verification**
- Upload videos for deepfake detection
- Deepfake likelihood score
- Face consistency analysis
- Risk assessment
- Frame-level analysis details

### 3. History & Reports (/history)
- View all past analyses
- Filter by content type (text, image, video, audio)
- Download individual reports
- Bulk delete with multi-select
- Exportable analysis history

### 4. About & Ethics (/about)
- Mission statement
- Why misinformation matters
- Responsible AI principles:
  - Explainability
  - Privacy-first approach
  - Fairness & bias mitigation
  - Human-centric design
- Tools & models used
- Commitments list
- Privacy policy preview

## Design System

### Color Palette (Blue + Violet + Neutrals)
- **Primary**: Deep violet/blue for main actions
- **Accent**: Lighter violet for secondary actions
- **Destructive**: Rose/red for warnings
- **Success**: Emerald/teal for positive results
- **Neutral**: Grays for text and backgrounds

### Typography
- **Headlines**: Geist (sans-serif)
- **Body**: Geist (sans-serif)
- **Mono**: Geist Mono (code)

### Dark Mode
Full dark mode support via next-themes. Toggle in navigation header.

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hidden navigation links on mobile (shown in sidebar in future)
- Touch-friendly buttons (min 44px tap target)

## API Integration

### Base Configuration
- **Base URL**: `http://localhost:8000` (configurable via `NEXT_PUBLIC_API_URL`)
- **Timeout**: 30 seconds
- **Headers**: Content-Type application/json

### Endpoints

```javascript
// Text Analysis
POST /analyze/text
{ text: string }

// Image Analysis
POST /analyze/image
FormData with image file

// Video Analysis
POST /analyze/video
FormData with video file

// Audio Analysis
POST /analyze/audio
FormData with audio file
```

### Response Format (Mock)
```javascript
{
  trust_score: 0-100,
  classification: string,
  toxicity_level: string,
  confidence: percentage,
  flags: string[],
  ai_generated_probability: number,
  authenticity_badge: string,
  manipulation_score: number,
  deepfake_likelihood: number,
  face_consistency: number
}
```

## Component Hierarchy

### TrustScore Component
- Animated circular progress (0-100)
- Dynamic color based on score
- Confidence label and explanation
- Smooth entrance animation

### ExplainabilityPanel Component
- Expandable details section
- Shows which AI model was used
- Displays confidence scores
- Flagged categories
- Privacy/ethics statement

### Analyzers (Text/Image/Video/Audio)
- File upload or text input
- Loading states with spinner
- Error handling with user-friendly messages
- Audio analyzer includes inline player and transcription preview
- Results display with score
- Action buttons (analyze another, download report)

## Environment Variables

```env
# Optional - defaults to http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Future Features (Placeholders Ready)

- API access for developers
- Paid plans for organizations
- "For Journalists" specialized section
- Enterprise features
- Custom model fine-tuning
- Batch analysis
- Webhook integrations
- Advanced reporting

## Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` in your browser.

## Mobile Optimization

- Responsive grid layouts
- Touch-friendly buttons (44px minimum)
- Mobile-optimized navigation
- Scalable SVG icons
- Optimized file uploads
- Accessible forms and inputs

## Accessibility

- Semantic HTML (main, header, nav, section, footer)
- ARIA labels and roles
- Screen reader-friendly text
- Keyboard navigation support
- Color contrast compliance
- Alt text on images
- Focus visible indicators

## Performance Considerations

- Framer Motion animations use GPU acceleration
- SWR caching ready (implement via hooks)
- Image lazy loading
- Code splitting by route
- CSS-in-JS optimization

## Security

- No sensitive data stored locally
- API calls over HTTPS recommended
- CORS headers ready
- Input sanitization
- Error messages don't expose internals

## Error Handling

- Network error fallbacks
- File upload validation
- Graceful error messages
- Retry mechanisms
- Loading states prevent double-submission

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Database Integration**: Store analysis history
2. **User Accounts**: Authentication with Supabase/Auth0
3. **Batch Processing**: Upload multiple files at once
4. **Advanced Filtering**: Search and filter history
5. **Webhooks**: Real-time notifications
6. **API Keys**: For programmatic access
7. **Custom Models**: Fine-tune for specific domains
8. **Social Integration**: Share results safely

## Contributing

The codebase is organized for clarity and maintainability:
- Components are self-contained and reusable
- API calls are centralized in `/services/api.js`
- Design tokens are in `/app/globals.css`
- No hardcoded colors outside the design system

## License

RUMERA is built for trust and transparency in the digital age.

## Support

For issues or questions, refer to the About page for ethics and privacy information.
