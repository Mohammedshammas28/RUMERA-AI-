# RUMERA Authentication Setup Guide

Complete setup guide for the Node.js backend with authentication.

## Architecture

```
RUMERA-AI/
├── Frontend/          (Next.js)
│   ├── app/
│   │   ├── login/    (Login page)
│   │   ├── signup/   (Signup page)
│   │   └── ...
│   └── services/
│       └── authService.js  (Authentication API calls)
│
└── Backend/           (Node.js + Express)
    ├── models/
    │   └── User.js   (MongoDB User model)
    ├── controllers/
    │   └── authController.js (Auth logic)
    ├── routes/
    │   └── auth.js   (Auth routes)
    ├── middleware/
    │   └── auth.js   (JWT verification)
    └── server.js     (Main server)
```

## Backend Setup

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Configure Environment Variables

Update `.env` file:

```
PORT=5000
JWT_SECRET=your_very_secure_secret_key_here
MONGODB_URI=mongodb://localhost:27017/rumera
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rumera?retryWrites=true&w=majority
```

### 3. Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
🚀 RUMERA Backend running on http://localhost:5000
📝 API Documentation:
   POST   /api/auth/signup - Register new user
   POST   /api/auth/login  - Login user
   GET    /api/auth/me     - Get current user (protected)
   GET    /health          - Health check
```

## Frontend Setup

### 1. Configure Environment Variables

Create `.env.local` in the `Frontend` directory:

```
NEXT_PUBLIC_AUTH_API_URL=http://localhost:5000
```

### 2. Start Frontend Development Server

```bash
cd Frontend
npm run dev
```

Access at: `http://localhost:3000`

## Testing API Endpoints

### Using cURL

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
```

### Using Postman

1. **Create Signup Request:**
   - Method: POST
   - URL: http://localhost:5000/api/auth/signup
   - Body (raw JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Create Login Request:**
   - Method: POST
   - URL: http://localhost:5000/api/auth/login
   - Body (raw JSON):
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Create Protected Request:**
   - Method: GET
   - URL: http://localhost:5000/api/auth/me
   - Headers:
     - Key: Authorization
     - Value: Bearer [token_from_login_response]

## Frontend Features

### Login Page (`/login`)
- Email and password input
- Form validation
- Error handling
- Redirects to home after successful login

### Signup Page (`/signup`)
- Full name, email, and password inputs
- Password confirmation
- Form validation
- Error handling
- Redirects to home after successful signup

### Navigation Updates
- Sign In button links to `/login`
- Sign Up button links to `/signup`

## Storage

### User Data Storage
- **JWT Token:** Stored in `localStorage` as `authToken`
- **User Info:** Stored in `localStorage` as `user` (JSON)
- **Backend:** MongoDB (optional, file storage as fallback)

## Security Features

✓ Password Hashing with bcryptjs
✓ JWT Token Authentication
✓ Protected Routes
✓ CORS Enabled
✓ Password Validation (min 6 characters)
✓ Email Validation
✓ HTTP-only cookies ready (can be added)

## Common Issues & Solutions

### MongoDB Connection Fails
**Problem:** "MongoError: connect ECONNREFUSED"
**Solution:** 
1. Ensure MongoDB is running: `mongod` or MongoDB Atlas is connected
2. Or remove MongoDB requirement for development (server still works)

### CORS Errors
**Problem:** "Access to XMLHttpRequest blocked by CORS policy"
**Solution:**
- Backend already has CORS enabled
- Ensure frontend is calling correct API URL in `.env.local`

### Token Expired
**Problem:** "Not authorized to access this route"
**Solution:**
- Token is valid for 7 days
- Login again to get a new token

### Port Already in Use
**Problem:** "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in .env
PORT=5001
```

## Next Steps

1. ✅ Backend is ready for signup/login
2. ✅ Frontend pages created for signup/login
3. ✅ Navigation updated with auth links

### To Add Later:
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile page
- [ ] OAuth integration (Google, GitHub)
- [ ] Refresh token mechanism
- [ ] User roles and permissions
- [ ] Protected analysis endpoints

## Database Management

### View Users (MongoDB)
```bash
# Open MongoDB shell
mongo

# Use database
use rumera

# View all users
db.users.find()

# Delete a user
db.users.deleteOne({ email: "john@example.com" })
```

## Troubleshooting

Run health check:
```bash
curl http://localhost:5000/health
```

Check backend logs in console for detailed error messages.

For frontend debugging:
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for JavaScript errors
- Check Application tab for localStorage values

## Support

For issues with:
- **Backend:** Check Backend/server.js logs
- **Frontend:** Check browser console and Network tab
- **Database:** Check MongoDB connection string in .env
