# Backend Configuration Guide

After separating the frontend and backend into different folders, you need to configure the backend URL in the frontend.

## Quick Fix

The frontend is now configured to use `http://localhost:3001/api` as the default backend URL. If your backend is running on a different port, you have two options:

### Option 1: Update the Default URL (Recommended for Development)

Edit `frontend/next.config.ts` and change the default backend URL:

```typescript
env: {
  // Change this to match your backend port
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:YOUR_PORT/api',
  
  // Backend URL pattern: 'standard' for /api/invitations/{id}/preview, 'root' for /{id}/preview
  NEXT_PUBLIC_BACKEND_URL_PATTERN: process.env.NEXT_PUBLIC_BACKEND_URL_PATTERN || 'root',
},
```

Common backend ports:
- `http://localhost:3001/api` (default)
- `http://localhost:8000/api`
- `http://localhost:5000/api`
- `http://localhost:8080/api`

### Option 2: Use Environment Variables (Recommended for Production)

Create a `.env.local` file in the frontend folder:

```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:YOUR_PORT/api
NEXT_PUBLIC_BACKEND_URL_PATTERN=root
```

## Backend URL Patterns

The frontend now supports two different backend URL patterns:

### Pattern 1: Root-level endpoints (Default)
- **Setting**: `NEXT_PUBLIC_BACKEND_URL_PATTERN=root`
- **Backend expects**: `/{id}/preview`
- **Example**: `http://localhost:3001/cmerkr5ed0000woesfpdhllag/preview`

### Pattern 2: Standard API structure
- **Setting**: `NEXT_PUBLIC_BACKEND_URL_PATTERN=standard`
- **Backend expects**: `/api/invitations/{id}/preview`
- **Example**: `http://localhost:3001/api/invitations/cmerkr5ed0000woesfpdhllag/preview`

**Note**: Based on your backend logs showing `/cmerkr5ed0000woesfpdhllag/preview`, the default is set to `root` pattern.

## What Was Fixed

The following API routes were updated to use the configurable backend URL:

- `/api/invitations/*` - Invitation management
- `/api/guests/*` - Guest management  
- `/api/guest-groups/*` - Guest group management
- `/api/auth/*` - Authentication
- `/api/admin/guests/*` - Admin guest management

## Testing the Fix

1. Make sure your backend is running on the configured port
2. Start the frontend: `npm run dev`
3. Try to preview an invitation - it should now work without 404 errors

## Troubleshooting

If you still get 404 errors:

1. Check that your backend is running
2. Verify the backend port in the configuration
3. Check the browser console for API request URLs
4. Ensure your backend has the same API endpoints (`/api/invitations`, `/api/guests`, etc.)
5. Verify the URL pattern matches what your backend expects

## Backend URL Structure

The frontend expects your backend to have this structure:

**For root pattern (default):**
```
http://localhost:YOUR_PORT/
├── {id}/preview
├── guests/
├── guest-groups/
├── auth/
└── admin/
```

**For standard pattern:**
```
http://localhost:YOUR_PORT/api/
├── invitations/
├── guests/
├── guest-groups/
├── auth/
└── admin/
```
