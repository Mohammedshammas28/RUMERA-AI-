# RUMERA Backend

Node.js + Express backend for RUMERA AI authentication and analysis APIs.

## Features

- User Registration (Signup)
- User Login with JWT
- Protected Routes
- Password Hashing with bcryptjs
- MongoDB Integration
- CORS enabled

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file with:

```
PORT=5000
JWT_SECRET=your_secret_key_change_this_in_production
MONGODB_URI=mongodb://localhost:27017/rumera
NODE_ENV=development
```

## Running the Server

```bash
# Development with nodemon
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

#### Register (Signup)
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Health Check
```
GET /health

Response:
{
  "status": "OK",
  "message": "RUMERA Backend is running"
}
```

## Database

### MongoDB Setup (Optional)

For development, MongoDB is optional. The server will work without it initially.

#### Using MongoDB locally:

```bash
# On Windows with MongoDB installed
mongod

# On macOS with Homebrew
brew services start mongodb-community
```

#### Using MongoDB Atlas (Cloud):

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rumera
   ```

## Project Structure

```
Backend/
├── models/           # Database models
│   └── User.js       # User schema
├── controllers/      # Route controllers
│   └── authController.js
├── middleware/       # Custom middleware
│   └── auth.js      # JWT verification
├── routes/           # API routes
│   └── auth.js      # Auth routes
├── utils/            # Utility functions
│   └── generateToken.js
├── server.js         # Main server file
├── package.json      # Dependencies
├── .env             # Environment variables
└── README.md        # This file
```

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **nodemon** - Auto-reload development server
