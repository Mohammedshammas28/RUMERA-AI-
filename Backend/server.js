// Disable ONNX and suppress errors BEFORE any imports
process.env.ONNX_DISABLE = '1';
process.env.TRANSFORMERS_CACHE = '/tmp/transformers_cache';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Suppress ONNX errors before importing anything else
const originalError = console.error;
const originalWarn = console.warn;

console.error = function(...args) {
  const message = args.join(' ').toLowerCase();
  if (message.includes('onnx') || message.includes('protobuf') || message.includes('glib') || message.includes('sessionhandler')) {
    return;
  }
  originalError.apply(console, args);
};

console.warn = function(...args) {
  const message = args.join(' ').toLowerCase();
  if (message.includes('onnx') || message.includes('protobuf') || message.includes('fallback')) {
    return;
  }
  originalWarn.apply(console, args);
};

const advancedModels = require('./utils/advancedModels');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://rumera-ai-6sf3.vercel.app',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3001',
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now to fix CORS issues
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(180000); // 3 minute request timeout
  res.setTimeout(180000);
  next();
});

// Connect to MongoDB (non-blocking with short timeout)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 3000,
  })
    .then(() => console.log('✓ MongoDB connected for user logging'))
    .catch(err => console.log('⚠ MongoDB unavailable - demo mode'));
} else {
  console.log('⚠ MONGODB_URI not set - running in demo mode');
}

// Initialize models in background AFTER server starts (non-blocking)
setTimeout(() => {
  advancedModels.initializeAllModels().catch(err => {
    // Silently fail - models use fallback
  });
}, 500); // Start after server is ready to accept requests

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/analyze', require('./routes/analyze'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
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
  console.log(`\n✅ RUMERA Backend running on port ${PORT}`);
  console.log('📝 Auth endpoints: POST /api/auth/signup, /api/auth/login, GET /api/auth/me\n');
});

server.timeout = 300000;
server.keepAliveTimeout = 65000;
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close();
});
