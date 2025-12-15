# CampusConnect Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     CampusConnect App                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Student    │  │   Faculty    │  │    Admin     │     │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Components Layer                   │  │
│  │  • Pages  • Layout  • UI Components                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Context & State Management               │  │
│  │  • AuthContext  • useAuth Hook                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  API Service Layer                    │  │
│  │                                                        │  │
│  │  ┌─────────────────┐         ┌──────────────────┐   │  │
│  │  │   services/     │         │   services/      │   │  │
│  │  │   api.ts        │────────▶│   firebaseApi.ts │   │  │
│  │  │  (Router)       │         │  (Firebase Impl) │   │  │
│  │  └─────────────────┘         └──────────────────┘   │  │
│  │         │                                             │  │
│  │         │ if USE_FIREBASE=false                      │  │
│  │         ▼                                             │  │
│  │  ┌─────────────────┐                                 │  │
│  │  │   Mock Data     │                                 │  │
│  │  │  + localStorage │                                 │  │
│  │  └─────────────────┘                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ if USE_FIREBASE=true
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Firebase Services                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │   Firestore  │  │   Storage    │     │
│  │              │  │   Database   │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow

```
User Action (Login/Signup)
    │
    ▼
AuthContext.login/signup()
    │
    ▼
services/api.ts (Router)
    │
    ├─▶ Mock Mode: localStorage
    │
    └─▶ Firebase Mode: firebaseApi.ts
            │
            ▼
        Firebase Auth
            │
            ▼
        Create/Get User Profile
            │
            ▼
        Update AuthContext State
            │
            ▼
        Redirect to Dashboard
```

### Event Registration Flow

```
User clicks "Register"
    │
    ▼
EventDetailPage.handleRegister()
    │
    ▼
api.registerForEvent(eventId)
    │
    ├─▶ Mock Mode: Update local array
    │
    └─▶ Firebase Mode: firebaseApi.registerForEvent()
            │
            ▼
        Firestore: Update event.participants
            │
            ▼
        Update UI State
```

## File Structure

```
campusconnect/
├── components/
│   ├── layout/
│   │   └── Header.tsx              # Navigation & user menu
│   └── ui/
│       ├── Button.tsx              # Reusable button
│       ├── Card.tsx                # Reusable card
│       └── Input.tsx               # Reusable input
│
├── contexts/
│   └── AuthContext.tsx             # Global auth state
│
├── hooks/
│   └── useAuth.ts                  # Auth context hook
│
├── pages/
│   ├── HomePage.tsx                # Landing page
│   ├── LoginPage.tsx               # Login form
│   ├── SignupPage.tsx              # Signup form
│   ├── DashboardPage.tsx           # Role-based dashboard
│   ├── EventsPage.tsx              # Events list
│   ├── EventDetailPage.tsx         # Event details & registration
│   ├── CreateEventPage.tsx         # Create new event
│   ├── AnnouncementsPage.tsx       # Announcements list
│   ├── RoomsPage.tsx               # Room booking
│   ├── ProfilePage.tsx             # User profile
│   └── CalendarPage.tsx            # Calendar view
│
├── router/
│   ├── AppRouter.tsx               # Route definitions
│   └── ProtectedRoute.tsx          # Auth guard
│
├── services/
│   ├── firebase.ts                 # Firebase initialization
│   ├── firebaseApi.ts              # Firebase implementation
│   └── api.ts                      # API router (mock/firebase)
│
├── types.ts                        # TypeScript types
├── vite-env.d.ts                   # Environment types
├── .env.local                      # Configuration
└── package.json                    # Dependencies
```

## Component Hierarchy

```
App
└── AuthProvider
    └── AppRouter (HashRouter)
        ├── HomePage
        ├── LoginPage
        ├── SignupPage
        └── ProtectedRoute
            ├── DashboardPage
            │   ├── Header
            │   └── Role-specific Dashboard
            │       ├── StudentDashboard
            │       ├── FacultyDashboard
            │       └── AdminDashboard
            │
            ├── EventsPage
            │   ├── Header
            │   └── EventCard (multiple)
            │
            ├── EventDetailPage
            │   ├── Header
            │   ├── Event Info
            │   ├── Registration Button
            │   └── Feedback Form
            │
            └── ... (other pages)
```

## State Management

### Global State (AuthContext)

```typescript
{
  isAuthenticated: boolean
  user: User | null
  login: (email, password) => Promise<void>
  signup: (name, email, password, role) => Promise<void>
  logout: () => void
  loading: boolean
}
```

### Local State (Component Level)

Each page manages its own data:
- Events list
- Event details
- Announcements
- Rooms & bookings
- User profile

## API Layer Design

### Dual Mode Support

```typescript
// services/api.ts
const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === 'true';

export const getEvents = (): Promise<Event[]> => {
  if (USE_FIREBASE) {
    return firebaseApi.getEvents();  // Real Firebase
  }
  return simulateApiCall(events);     // Mock data
};
```

### Benefits

1. **Development**: Use mock data without Firebase setup
2. **Testing**: Fast, predictable mock data
3. **Production**: Real-time Firebase backend
4. **Flexibility**: Switch modes with one env variable

## Security Model

### Role-Based Access Control

```
┌─────────────────────────────────────────────────┐
│                    Roles                         │
├─────────────────────────────────────────────────┤
│  Student   │  Faculty   │  Admin                │
├────────────┼────────────┼───────────────────────┤
│ View events│ All Student│ All Faculty           │
│ Register   │ Create     │ Approve bookings      │
│ Feedback   │ events     │ Manage users          │
│ Book rooms │ Announce   │ Full access           │
└────────────┴────────────┴───────────────────────┘
```

### Route Protection

```typescript
// Protected routes require authentication
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>

// Role-specific routes
<ProtectedRoute roles={[Role.FACULTY, Role.ADMIN]}>
  <CreateEventPage />
</ProtectedRoute>
```

## Firebase Collections

```
Firestore Database
├── users/
│   └── {userId}
│       ├── name
│       ├── email
│       ├── role
│       └── avatarUrl
│
├── events/
│   └── {eventId}
│       ├── title
│       ├── description
│       ├── date
│       ├── organizerId
│       ├── participants[]
│       └── ...
│
├── announcements/
│   └── {announcementId}
│       ├── title
│       ├── content
│       ├── authorId
│       └── createdAt
│
├── feedback/
│   └── {feedbackId}
│       ├── eventId
│       ├── studentId
│       ├── rating
│       └── comment
│
└── rooms/
    └── {roomId}
        ├── name
        ├── capacity
        ├── location
        └── bookings/ (subcollection)
            └── {bookingId}
                ├── userId
                ├── from
                ├── to
                └── status
```

## Deployment Options

### Option 1: Firebase Hosting
```bash
npm run build
firebase deploy
```

### Option 2: Vercel
```bash
npm run build
vercel deploy
```

### Option 3: Netlify
```bash
npm run build
netlify deploy
```

## Performance Considerations

1. **Code Splitting**: React Router handles automatic code splitting
2. **Lazy Loading**: Images use lazy loading
3. **Caching**: Firebase SDK handles caching
4. **Optimistic Updates**: UI updates before API confirmation
5. **Pagination**: Announcements support limit parameter

## Future Enhancements

- [ ] Real-time updates with Firestore listeners
- [ ] Push notifications
- [ ] Email verification
- [ ] Password reset
- [ ] Advanced search and filters
- [ ] Export certificates as PDF
- [ ] Calendar sync (Google, Outlook)
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Bulk operations for admins
