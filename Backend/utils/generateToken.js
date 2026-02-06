const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, email, name) => {
  const secret = process.env.JWT_SECRET || 'demo_secret_key';
  return jwt.sign({ id, email, name }, secret, {
    expiresIn: '7d',
  });
};

module.exports = { generateToken };
