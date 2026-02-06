const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const advancedModels = require('./utils/advancedModels');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://rumera-ai-6sf3.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✓ MongoDB connected for user logging'))
    .catch(err => console.log('⚠ MongoDB unavailable - demo mode'));
} else {
  console.log('⚠ MONGODB_URI not set - running in demo mode');
}

// Initialize models in background (non-blocking)
advancedModels.initializeAllModels().catch(err => {
  console.log('Models initializing...');
});

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

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down...');
  server.close();
});

process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close();
});
