# Quick Start Guide

## Current Status

✅ Firebase is **installed** (v12.6.0)
✅ Firebase integration code is **ready**
⚠️ Firebase is currently **disabled** (using mock data)

## To Use Firebase

### 1. Get Your Firebase Credentials

1. Go to https://console.firebase.google.com/
2. Create a new project or select existing one
3. Go to Project Settings > General
4. Scroll down to "Your apps" and click the Web icon (`</>`)
5. Copy your Firebase configuration

### 2. Update .env.local

Replace these values in `.env.local`:

```env
VITE_USE_FIREBASE=true

VITE_FIREBASE_API_KEY=AIzaSyC27AA6NbjD0D6NAG4kYjP3FxQ5eEdJUtw
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Enable Firebase Services

In Firebase Console:

**Authentication:**
- Go to Build > Authentication
- Click "Get started"
- Enable "Email/Password"

**Firestore Database:**
- Go to Build > Firestore Database
- Click "Create database"
- Start in **test mode** (for development)

**Storage:**
- Go to Build > Storage
- Click "Get started"
- Start in **test mode** (for development)

### 4. Add Sample Data

In Firestore, create a collection called `rooms` and add:

```json
{
  "name": "Conference Room A",
  "capacity": 50,
  "location": "Building 1, Floor 2"
}
```

### 5. Restart Your App

```bash
npm run dev
```

## To Continue Using Mock Data

Keep `.env.local` as:

```env
VITE_USE_FIREBASE=false
```

The app will use the mock data with localStorage.

## Test Accounts (Mock Mode Only)

- **Admin:** admin@test.com (any password)
- **Faculty:** faculty@test.com (any password)
- **Student:** student@test.com (any password)

## Files Created

- `services/firebase.ts` - Firebase initialization
- `services/firebaseApi.ts` - Firebase API functions
- `services/api.ts` - Updated to support both mock and Firebase
- `FIREBASE_SETUP.md` - Detailed setup guide
- `QUICK_START.md` - This file

## Need Help?

See `FIREBASE_SETUP.md` for detailed instructions and troubleshooting.
