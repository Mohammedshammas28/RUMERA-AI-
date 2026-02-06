const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const advancedModels = require('./utils/advancedModels');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// CORS configuration for production and development
const allowedOrigins = [
  'https://rumera-ai-6sf3.vercel.app',  // Production Vercel frontend
  'http://localhost:3000',               // Local development
  'http://localhost:3001',               // Alternative local port
  'http://127.0.0.1:3000',              // Localhost alias
  process.env.CORS_ORIGIN || 'http://localhost:3000'
];

// Dynamic CORS to allow any compatible origin
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches our allowed list or is a Vercel/Railway deployment
    if (allowedOrigins.includes(origin) || origin.includes('vercel.app') || origin.includes('railway.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for development - restrict in production as needed
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Advanced AI Models on startup
console.log('\n========================================');
console.log('🤖 RUMERA AI Models Initialization');
console.log('========================================');
advancedModels.initializeAllModels()
  .then(status => {
    console.log('Model Status:', status);
    console.log('✓ All AI models initialized successfully\n');
  })
  .catch(err => {
    console.error('⚠ Warning: Some models failed to initialize:', err);
    console.log('Service will still run with available models\n');
  });

// Connect to MongoDB (non-blocking, optional for analysis features)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    })
    .then(() => {
      console.log('✓ MongoDB connected');
    })
    .catch((err) => {
      console.error('⚠ MongoDB unavailable - analysis features work without it');
    });
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/analyze', require('./routes/analyze'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'RUMERA Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`\n🚀 RUMERA Backend running on http://localhost:${PORT}`);
  console.log(`\n🎯 Advanced AI Models Integrated:`);
  console.log(`   • OpenAI Whisper - Audio transcription`);
  console.log(`   • OpenAI CLIP - Image-text understanding`);
  console.log(`   • Hugging Face Transformers - Text classification`);
  console.log(`   • ToxicBERT - Hate speech detection`);
  console.log(`   • XceptionNet - Deepfake detection`);
  console.log(`\n📝 API Documentation:`);
  console.log(`   POST   /api/auth/signup      - Register new user`);
  console.log(`   POST   /api/auth/login       - Login user`);
  console.log(`   GET    /api/auth/me          - Get current user (protected)`);
  console.log(`   POST   /analyze/text         - Analyze text (Toxicity + Classification)`);
  console.log(`   POST   /analyze/image        - Analyze image (CLIP + XceptionNet)`);
  console.log(`   POST   /analyze/audio        - Analyze audio (Whisper + Toxicity)`);
  console.log(`   POST   /analyze/video        - Analyze video (XceptionNet)`);
  console.log(`   GET    /analyze/health       - AI models health status`);
  console.log(`   GET    /health               - Backend health check\n`);
});
