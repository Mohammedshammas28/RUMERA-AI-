# RUMERA Authentication - Testing Guide

## System Status

✅ **Backend:** http://localhost:5001 (Node.js + Express)
✅ **Frontend:** http://localhost:3000 (Next.js)
✅ **Database:** MongoDB Atlas (Connected)

---

## How to Access Auth Pages

### Sign Up Page
📍 **URL:** http://localhost:3000/signup

**How to access:**
1. Open http://localhost:3000 in your browser
2. Click the **"Sign Up"** button in the top navigation
3. Or directly visit http://localhost:3000/signup

**Form Fields:**
- Full Name (required)
- Email (required, must be valid email format)
- Password (required, minimum 6 characters)
- Confirm Password (required, must match password)

**Test Case:**
```
Name: John Doe
Email: john@example.com
Password: password123
Confirm: password123
```

Click "Create Account" and you should see:
- ✅ Success message: "Account created successfully! Redirecting..."
- 🔄 Redirect to home page after 2 seconds
- 💾 User data saved to MongoDB

---

### Sign In (Login) Page
📍 **URL:** http://localhost:3000/login

**How to access:**
1. Open http://localhost:3000 in your browser
2. Click the **"Sign In"** button in the top navigation
3. Or directly visit http://localhost:3000/login

**Form Fields:**
- Email (required)
- Password (required)

**Test Case (using account from above):**
```
Email: john@example.com
Password: password123
```

Click "Sign In" and you should see:
- ✅ Success message: "Login successful! Redirecting..."
- 🔄 Redirect to home page after 2 seconds
- 💾 JWT token saved to localStorage
- 👤 User data saved to localStorage

---

## Error Handling Tests

### Test 1: Missing Fields
**Signup Page:**
- Leave any field empty and click "Create Account"
- Expected: Error message "Please fill in all fields"

**Login Page:**
- Leave email or password empty and click "Sign In"
- Expected: Error message "Please fill in all fields"

---

### Test 2: Password Mismatch (Signup Only)
- Name: John Doe
- Email: test@example.com
- Password: password123
- Confirm: password456
- Click "Create Account"
- Expected: Error message "Passwords do not match"

---

### Test 3: Password Too Short
- Password: 12345 (less than 6 characters)
- Expected: Error message "Password must be at least 6 characters"

---

### Test 4: Invalid Email Format
- Email: notanemail
- Expected: Form validation should prevent submission

---

### Test 5: User Already Exists (Signup)
- Create account with: john@example.com
- Try to signup again with same email
- Expected: Error message "User already exists"

---

### Test 6: Invalid Credentials (Login)
- Email: john@example.com
- Password: wrongpassword
- Click "Sign In"
- Expected: Error message "Invalid email or password"

---

### Test 7: Non-existent User (Login)
- Email: nonexistent@example.com
- Password: password123
- Click "Sign In"
- Expected: Error message "Invalid email or password"

---

## Browser Console Checks

Open Browser Developer Tools (F12) and check:

### After Signup Success:
**Console Tab:**
- Should not have errors
- May have deprecation warnings (safe to ignore)

**Application Tab (Storage > Local Storage):**
- `authToken`: JWT token
- `user`: JSON with user data (id, name, email)

Example:
```
authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
user: {"id":"507f1f77bcf86cd799439011","name":"John Doe","email":"john@example.com"}
```

---

### After Login Success:
**Same as Signup:**
- Check localStorage has `authToken` and `user`
- Check console for errors

---

## Testing with Postman/cURL

### Signup Request
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
}
```

---

### Login Request
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
}
```

---

### Get Current User (Protected Route)
```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
}
```

---

### Verify Token (without token)
```bash
curl -X GET http://localhost:5001/api/auth/me
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

---

## Navigation Links

The navigation bar now shows:
- **Sign In** link → `/login`
- **Sign Up** link → `/signup`

Test by:
1. Open http://localhost:3000
2. Look at top navigation
3. Click "Sign In" or "Sign Up" buttons
4. Should navigate to respective pages

---

## Troubleshooting

### Issue: "Cannot POST /api/auth/signup"
**Solution:**
- Ensure backend is running: `npm start` in Backend folder
- Check backend is on port 5001
- Verify .env.local has correct URL

### Issue: "Module not found: Can't resolve '@/services/authService'"
**Solution:**
- Clear .next cache: `rm -r .next`
- Restart frontend: `npm run dev`

### Issue: "Network Error" on submit
**Solution:**
- Check backend is running
- Check if port 5001 is accessible
- Check browser console for CORS errors

### Issue: "Invalid token" after login
**Solution:**
- Clear localStorage and cookies (DevTools > Application tab)
- Try logging in again
- Restart both backend and frontend

### Issue: Form not submitting
**Solution:**
- Check browser console (F12) for JavaScript errors
- Ensure all required fields are filled
- Check password meets minimum length (6 characters)

---

## Success Checklist

- [ ] Can access http://localhost:3000/signup
- [ ] Can access http://localhost:3000/login
- [ ] Can create new account with valid data
- [ ] Can login with created account
- [ ] localStorage has authToken after signup/login
- [ ] Can see error messages for invalid inputs
- [ ] Successful signup redirects to home
- [ ] Successful login redirects to home
- [ ] Navigation shows Sign In and Sign Up links
- [ ] Backend API responds to requests

---

## Database Verification

To verify data is being saved to MongoDB:

```javascript
// In MongoDB Atlas Web Console
db.users.find()

// Should show created users with:
// {
//   _id: ObjectId(...),
//   name: "John Doe",
//   email: "john@example.com",
//   password: "hashedpassword...",
//   createdAt: ISODate(...)
// }
```

---

## Next Steps

Once authentication is working:

1. **Protect Analysis Routes:** Add authentication to /analyze, /history
2. **User Profile Page:** Create /profile page to show user data
3. **Logout Function:** Add logout functionality to navigation
4. **Password Reset:** Implement forgot password feature
5. **Email Verification:** Add email confirmation on signup
6. **Refresh Tokens:** Implement token refresh mechanism

---

## Support

If you encounter issues:

1. Check backend logs in terminal
2. Check frontend console (F12)
3. Check browser network tab for API calls
4. Verify MongoDB connection status
5. Ensure both services are running on correct ports
