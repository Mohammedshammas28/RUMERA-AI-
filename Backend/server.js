const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
// CORS configuration for production
const allowedOrigins = [
  'https://rumera-ai-6sf3.vercel.app',
  'http://localhost:3000',
  process.env.CORS_ORIGIN || 'https://rumera-ai-6sf3.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 RUMERA Backend running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST   /api/auth/signup      - Register new user`);
  console.log(`   POST   /api/auth/login       - Login user`);
  console.log(`   GET    /api/auth/me          - Get current user (protected)`);
  console.log(`   POST   /analyze/text         - Analyze text`);
  console.log(`   POST   /analyze/image        - Analyze image`);
  console.log(`   POST   /analyze/audio        - Analyze audio`);
  console.log(`   POST   /analyze/video        - Analyze video`);
  console.log(`   GET    /analyze/health       - Analysis service health`);
  console.log(`   GET    /health               - Health check\n`);
});
