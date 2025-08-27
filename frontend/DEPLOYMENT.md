# Deployment Guide for Vercel (Frontend) + Render (Backend)

This guide explains how to deploy your RSVP application with the frontend on Vercel and backend on Render.

## Environment Configuration

The application automatically detects the deployment environment and configures backend URLs accordingly.

### Development Environment
- **Backend**: `http://localhost:3001/api`
- **Frontend**: `http://localhost:3000`
- **Configuration**: Automatic (no setup needed)

### Production Environment

#### 1. Backend on Render

1. **Deploy your backend to Render**
   - Connect your backend repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`
   - Note the Render URL (e.g., `https://your-app.onrender.com`)

2. **Configure Render environment variables**
   ```bash
   NODE_ENV=production
   PORT=3001
   # Add any other backend-specific environment variables
   ```

#### 2. Frontend on Vercel

1. **Deploy your frontend to Vercel**
   - Connect your frontend repository
   - Vercel will automatically detect it's a Next.js app

2. **Configure Vercel environment variables**
   
   Go to your Vercel project dashboard → Settings → Environment Variables

   ```bash
   # Required: Backend URL
   NEXT_PUBLIC_BACKEND_URL=https://your-app.onrender.com/api
   
   # Optional: URL pattern (defaults to 'root')
   NEXT_PUBLIC_BACKEND_URL_PATTERN=root
   
   # Optional: Override automatic detection
   NODE_ENV=production
   ```

## Environment Variable Priority

The system uses this priority order for backend URL configuration:

1. **Explicit environment variable** (`NEXT_PUBLIC_BACKEND_URL`) - Highest priority
2. **Automatic detection** based on deployment platform
3. **Fallback defaults** for development

## Automatic Configuration

The system automatically detects:

- **Vercel deployment**: Sets production mode, expects backend on Render
- **Render deployment**: Backend automatically runs on Render's infrastructure
- **Development**: Uses localhost URLs

## Testing the Deployment

### 1. Test Backend on Render
```bash
# Test if your backend is accessible
curl https://your-app.onrender.com/api/health
# or
curl https://your-app.onrender.com/cmerkr5ed0000woesfpdhllag/preview
```

### 2. Test Frontend on Vercel
- Deploy and check if invitation previews work
- Check browser console for any API errors
- Verify backend URLs are correct

## Troubleshooting

### Common Issues

1. **CORS errors**: Ensure your backend allows requests from your Vercel domain
2. **404 errors**: Verify the backend URL and URL pattern are correct
3. **Environment variables not loading**: Check Vercel environment variable configuration

### Debug Configuration

The system logs configuration in development mode. Check your browser console for:

```
🔧 Environment Configuration: {
  backendUrl: "https://your-app.onrender.com/api",
  urlPattern: "root",
  environment: "production",
  isVercel: true,
  isRender: false
}
```

### Manual Override

If automatic detection fails, you can manually set:

```bash
# Force specific backend URL
NEXT_PUBLIC_BACKEND_URL=https://your-custom-backend.com/api

# Force specific URL pattern
NEXT_PUBLIC_BACKEND_URL_PATTERN=standard
```

## Security Considerations

- **Environment variables**: Only use `NEXT_PUBLIC_` prefix for variables that need to be exposed to the browser
- **Backend security**: Ensure your Render backend has proper authentication and CORS configuration
- **HTTPS**: Both Vercel and Render provide HTTPS by default

## Cost Optimization

- **Vercel**: Free tier available, scales with usage
- **Render**: Free tier available, but may sleep after inactivity
- **Consider**: Use Vercel's edge functions for simple API calls if needed
