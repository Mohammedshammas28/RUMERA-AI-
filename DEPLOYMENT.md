# RUMERA Deployment Guide
## Vercel Frontend + Railway Backend

---

## 🚀 Phase 1: Deploy Backend to Railway

### Prerequisites
- Railway.app account (free tier available)
- Git repository pushed to GitHub
- MongoDB Atlas cluster (already set up)

### Step 1: Connect Railway to GitHub
1. Go to [Railway.app](https://railway.app)
2. Sign up / Login
3. Click **"Create Project"** → **"Deploy from GitHub repo"**
4. Authorize GitHub and select `RUMERA-AI` repository
5. Select the `Backend` directory as root

### Step 2: Set Environment Variables on Railway
In Railway dashboard, go to **Variables** tab and add:

```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rumera?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
CORS_ORIGIN=https://rumera.vercel.app
```

**Getting MongoDB URI:**
1. Go to MongoDB Atlas → Your Cluster → Connect
2. Copy connection string (replace username/password)
3. Paste into Railway

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Deploy Backend
- Railway auto-deploys on git push or you can trigger manually
- Railway assigns a URL: `https://your-project-xxxx.railway.app`
- Test health check: `https://your-project-xxxx.railway.app/health`

✅ **Note:** Save this URL, you'll need it for Frontend deployment

---

## 🌐 Phase 2: Deploy Frontend to Vercel

### Step 1: Update Frontend Environment Variables
Edit `Frontend/.env.production`:

```env
NEXT_PUBLIC_AUTH_API_URL=https://your-project-xxxx.railway.app
```

Replace `your-project-xxxx.railway.app` with your actual Railway URL.

### Step 2: Push to GitHub
```bash
git add .
git commit -m "✅ Configure production env for Railway backend"
git push origin main
```

### Step 3: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Click **"Add New Project"** → Select `RUMERA-AI` repo
3. **Root Directory:** Set to `Frontend`
4. **Environment Variables:**
   - Name: `NEXT_PUBLIC_AUTH_API_URL`
   - Value: `https://your-railway-backend.railway.app`
5. Click **Deploy**

✅ Vercel assigns URL: `https://rumera.vercel.app`

---

## 🔗 Update Backend CORS for Production

After getting your Vercel URL, update Railway environment variables:

```env
CORS_ORIGIN=https://rumera.vercel.app
```

This allows frontend on Vercel to call backend on Railway.

---

## ✅ Testing the Production Deployment

### Test Health Check (Backend)
```bash
curl https://your-railway-backend.railway.app/health
```
Expected: `{"status":"OK","message":"RUMERA Backend is running"}`

### Test Signup Flow (Frontend)
1. Go to `https://rumera.vercel.app`
2. Click **Sign Up**
3. Create account: `test@example.com` / `password123`
4. Should redirect to `/` (dashboard)
5. Check MongoDB Atlas → should see new user document

### Test Login Flow (Frontend)
1. Sign out
2. Go to **Sign In**
3. Login with credentials
4. Should redirect instantly to `/`

### Check Logs

**Railway Backend Logs:**
```bash
railway logs
```

**Vercel Frontend Logs:**
- Vercel Dashboard → Project → Deployments → Recent deployment

---

## 🛠️ Debugging Connection Issues

### 1. Frontend can't reach Backend
**Error:** `ERR_CONNECTION_REFUSED` or `Failed to fetch`

**Fix:**
```bash
# Test backend is reachable
curl https://your-railway-backend.railway.app/health

# Check env variable on Vercel
# Dashboard → Project Settings → Environment Variables
```

### 2. CORS Error on Login/Signup
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Fix:**
- Ensure Backend has `CORS_ORIGIN=https://rumera.vercel.app`
- Railway redeploy after env change: Settings → Redeploy

### 3. JWT/Auth Not Working
**Error:** `Invalid token` or `401 Unauthorized`

**Fix:**
- Both environments must use **same** `JWT_SECRET`
- Check: `JWT_SECRET` is set in Railway
- Test: Signup creates token → Login verifies token

---

## 📊 Monitoring & Maintenance

### Railway Dashboard
- Logs: Check for errors in real-time
- Metrics: CPU, Memory, Network usage
- Billing: Monitor free tier usage

### Vercel Dashboard
- Analytics: Page performance, errors
- Deployments: Rollback if needed
- Preview URLs: Test staging deploys before production

### MongoDB Atlas
- Collections: Verify user data being stored
- Backups: Enable automated backups
- Alerts: Set up notifications for issues

---

## 🚀 Future Improvements

### Add Custom Domain
1. **Vercel:** Project Settings → Domains → Add `rumera.ai`
2. **Railway:** Set custom domain in project settings

### Enable CI/CD
- Both platforms auto-deploy on `main` branch push
- Add GitHub Actions for automated testing before deploy

### Scale as Needed
- **Frontend:** Vercel auto-scales globally (CDN)
- **Backend:** Railway can upgrade from free → hobby ($5/month) → pro

---

## 📋 Deployment Checklist

- [ ] MongoDB Atlas cluster running
- [ ] JWT_SECRET configured on Railway
- [ ] Backend deployed to Railway + health check passing
- [ ] Railway URL noted
- [ ] Frontend env vars updated with Railway URL
- [ ] Frontend deployed to Vercel
- [ ] Signup flow works end-to-end
- [ ] Login flow works end-to-end
- [ ] CORS properly configured for Vercel domain
- [ ] Database storing users correctly
- [ ] Logs checked for any errors

---

## 🎯 Current Status

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | 🟡 Ready for Deploy | `https://rumera.vercel.app` (pending) |
| Backend | 🟡 Ready for Deploy | `https://your-railway.railway.app` (pending) |
| Database | ✅ Ready | MongoDB Atlas |

**Next Step:** Deploy Backend to Railway → Get URL → Update Frontend Env → Deploy to Vercel
