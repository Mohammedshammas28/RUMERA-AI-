const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Disable ONNX completely before any module loads it
process.env.ONNX_DISABLE = '1';
process.env.TRANSFORMERS_CACHE = '/tmp/transformers_cache';
process.env.HF_HUB_DISABLE_SYMLINKS_WARNING = '1';

// Suppress ONNX errors before importing anything else
const originalError = console.error;
const originalWarn = console.warn;
const originalLog = console.log;

console.error = function(...args) {
  const message = args.join(' ').toLowerCase();
  // Suppress ONNX, protobuf, and model loading errors
  if (message.includes('onnx') || 
      message.includes('protobuf') ||
      message.includes('missing operation') ||
      message.includes('sessionhandler') ||
      message.includes('glib')) {
    return;
  }
  originalError.apply(console, args);
};

console.warn = function(...args) {
  const message = args.join(' ').toLowerCase();
  // Suppress ONNX and model warnings
  if (message.includes('onnx') || 
      message.includes('protobuf') ||
      message.includes('transformers') ||
      message.includes('glib')) {
    return;
  }
  originalWarn.apply(console, args);
};

console.log = function(...args) {
  const message = args.join(' ').toLowerCase();
  // Suppress ONNX model loading logs during initialization
  if (message.includes('fallback') || message.includes('wasm as a fallback')) {
    return;
  }
  originalLog.apply(console, args);
};

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

// Middleware with limits for production stability
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(120000); // 2 minute request timeout
  res.setTimeout(120000);
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Initialize Advanced AI Models on startup (non-blocking)
console.log('\n========================================');
console.log('🤖 RUMERA AI Models Initialization');
console.log('========================================');
console.log('⏳ Models initializing in background...\n');

// Don't wait for models to finish - let them load asynchronously
advancedModels.initializeAllModels()
  .then(status => {
    console.log('✓ Model Status:', status);
    console.log('✓ All AI models initialized\n');
  })
  .catch(err => {
    console.error('⚠ Warning: Some models failed to initialize:', err.message);
    console.log('✓ Service will still run with available models and fallbacks\n');
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

// Keep-alive endpoint for production
app.get('/keep-alive', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 RUMERA Backend running on http://0.0.0.0:${PORT}`);
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

// Set server timeout to prevent hanging connections
server.timeout = 300000; // 5 minutes
server.keepAliveTimeout = 65000; // Keep-alive timeout
server.headersTimeout = 66000; // Headers timeout slightly longer than keep-alive

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  // Force exit after 30 seconds if not done
  setTimeout(() => {
    console.error('Force exiting due to timeout');
    process.exit(1);
  }, 30000);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
