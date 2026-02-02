const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rumera')
  .then(() => {
    console.log('✓ MongoDB connected');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
    // Continue without MongoDB for development
  });

// Routes
app.use('/api/auth', require('./routes/auth'));

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
  console.log(`   POST   /api/auth/signup - Register new user`);
  console.log(`   POST   /api/auth/login  - Login user`);
  console.log(`   GET    /api/auth/me     - Get current user (protected)`);
  console.log(`   GET    /health          - Health check\n`);
});
