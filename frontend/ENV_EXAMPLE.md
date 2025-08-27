# Environment Configuration Examples

Copy these configurations to your environment variables or `.env.local` file.

## Development (localhost)
```bash
# No need to set these - they're automatically detected
# Backend will use: http://localhost:3001/api
# URL Pattern will use: root
```

## Production (Vercel + Render)
```bash
# Required: Your Render backend URL
NEXT_PUBLIC_BACKEND_URL=https://your-app.onrender.com/api

# Optional: URL pattern (defaults to 'root' based on your backend)
NEXT_PUBLIC_BACKEND_URL_PATTERN=root
```

## Custom Backend
```bash
# If you want to use a different backend service
NEXT_PUBLIC_BACKEND_URL=https://your-custom-backend.com/api
NEXT_PUBLIC_BACKEND_URL_PATTERN=standard
```

## Staging/Testing
```bash
# For testing with a staging backend
NEXT_PUBLIC_BACKEND_URL=https://staging-backend.onrender.com/api
NEXT_PUBLIC_BACKEND_URL_PATTERN=root
```

## Important Notes

- **Only variables starting with `NEXT_PUBLIC_` are exposed to the browser**
- **The system automatically detects Vercel deployment and sets production mode**
- **Backend URL should end with `/api` for consistency**
- **URL pattern `root` means `/{id}/preview`, `standard` means `/invitations/{id}/preview`**

## Vercel Setup

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the required variables above
4. Redeploy your application

## Render Setup

1. Deploy your backend to Render
2. Note the URL (e.g., `https://your-app.onrender.com`)
3. Add `/api` to the end for the frontend configuration
4. Set `NEXT_PUBLIC_BACKEND_URL=https://your-app.onrender.com/api`
