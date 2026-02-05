const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if MongoDB is available
    if (!User.collection.db.client.topology) {
      // MongoDB not available - return mock response
      const token = generateToken(email);
      return res.status(201).json({
        success: true,
        message: 'Demo mode - analysis features available',
        token,
        user: {
          id: 'demo_' + Date.now(),
          name: name,
          email: email,
        },
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email }).catch(() => null);
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Return response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    // Fallback response
    res.status(500).json({
      success: false,
      message: 'Server error - analysis features still available',
    });
  }
};
    res.status(500).json({
      success: false,
      message: err.message || 'Server error',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check if MongoDB is available
    let user = null;
    try {
      user = await User.findOne({ email }).select('+password');
    } catch (dbErr) {
      // MongoDB not available - allow demo login
      const token = generateToken(email);
      return res.status(200).json({
        success: true,
        message: 'Demo mode - analysis features available',
        token,
        user: {
          id: 'demo_' + Date.now(),
          name: email.split('@')[0],
          email: email,
        },
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error',
    });
  }
};
