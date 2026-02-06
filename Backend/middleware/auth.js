const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo_secret_key');
    
    // Try to get user from database
    let user = null;
    try {
      user = await User.findById(decoded.id);
    } catch (dbErr) {
      // MongoDB not available - use decoded token data (demo mode)
      console.log('Auth middleware - Demo mode: using decoded token');
      req.user = {
        _id: decoded.id,
        email: decoded.email,
        name: decoded.name || 'Demo User',
      };
      return next();
    }

    if (!user) {
      // In demo mode without database, allow access with decoded token
      req.user = {
        _id: decoded.id,
        email: decoded.email,
        name: decoded.name || 'Demo User',
      };
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};
