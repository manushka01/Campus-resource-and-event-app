<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CampusConnect - Campus Management Portal

A centralized portal for campus event registration, room bookings, announcements, and feedback for students, faculty, and administrators.

## Features

- 🔐 **Authentication** - Role-based access (Student, Faculty, Admin)
- 📅 **Events** - Create, browse, and register for campus events
- 🏢 **Room Booking** - Request and manage campus room bookings
- 📢 **Announcements** - Post and view campus-wide announcements
- ⭐ **Feedback** - Rate and review events
- 👤 **Profile Management** - Update profile and avatar
- 📊 **Dashboard** - Role-specific dashboards with stats

## Tech Stack

- React 19.2.0 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Firebase (Authentication, Firestore, Storage)
- React Router for navigation

## Run Locally

**Prerequisites:** Node.js

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run with mock data (no setup needed):**
   ```bash
   npm run dev
   ```
   
   Test accounts:
   - admin@test.com (any password)
   - faculty@test.com (any password)
   - student@test.com (any password)

3. **Or set up Firebase (optional):**
   - See [QUICK_START.md](QUICK_START.md) for Firebase setup
   - Update `.env.local` with your Firebase credentials
   - Set `VITE_USE_FIREBASE=true`

## Firebase Setup

This app supports both **mock data** (for development) and **Firebase** (for production).

### Quick Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Create Firestore Database (test mode)
4. Create Storage bucket (test mode)
5. Copy your Firebase config to `.env.local`
6. Set `VITE_USE_FIREBASE=true`

See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions.

## Project Structure

```
├── components/
│   ├── layout/        # Header, navigation
│   └── ui/            # Reusable UI components
├── contexts/          # React context (Auth)
├── hooks/             # Custom hooks
├── pages/             # Page components
├── router/            # Routing configuration
├── services/          # API services (mock & Firebase)
└── types.ts           # TypeScript types
```

## Documentation

- [QUICK_START.md](QUICK_START.md) - Quick reference guide
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Detailed Firebase setup
- [FIREBASE_INTEGRATION_SUMMARY.md](FIREBASE_INTEGRATION_SUMMARY.md) - Integration details

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

See `.env.local` for configuration options:

- `VITE_USE_FIREBASE` - Toggle between mock and Firebase
- `VITE_FIREBASE_*` - Firebase configuration

## License

MIT
