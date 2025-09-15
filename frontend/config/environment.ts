// Environment-based configuration for different deployment scenarios
// This automatically adapts to development, staging, and production environments

interface EnvironmentConfig {
    backendUrl: string;
    urlPattern: 'root' | 'standard';
    isDevelopment: boolean;
    isProduction: boolean;
}

// Detect environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';
const isRender = process.env.RENDER === 'true';

// Backend URL configuration
const getBackendUrl = (): string => {
    // Priority order:
    // 1. Explicit environment variable (highest priority)
    // 2. Automatic detection based on environment
    // 3. Fallback defaults

    // Check for explicit backend URL
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
        console.log('🔧 Using explicit backend URL from environment:', process.env.NEXT_PUBLIC_BACKEND_URL);
        return process.env.NEXT_PUBLIC_BACKEND_URL;
    }

    // Production on Vercel - backend should be on Render
    if (isProduction && isVercel) {
        // You'll need to set this in Vercel environment variables
        // NEXT_PUBLIC_BACKEND_URL=https://your-app.onrender.com/api
        return process.env.NEXT_PUBLIC_BACKEND_URL || 'https://your-app.onrender.com/api';
    }

    // Development environment
    if (isDevelopment) {
        const devUrl = 'http://localhost:5000/api';
        console.log('🔧 Development mode detected, using backend URL:', devUrl);
        return devUrl;
    }

    // Fallback for other environments
    const fallbackUrl = 'http://localhost:5000/api';
    console.log('🔧 Using fallback backend URL:', fallbackUrl);
    return fallbackUrl;
};

// URL pattern configuration
const getUrlPattern = (): 'root' | 'standard' => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL_PATTERN) {
        return process.env.NEXT_PUBLIC_BACKEND_URL_PATTERN as 'root' | 'standard';
    }

    // Default to root pattern based on your backend logs
    return 'root';
};

export const config: EnvironmentConfig = {
    backendUrl: getBackendUrl(),
    urlPattern: getUrlPattern(),
    isDevelopment,
    isProduction,
};

// Helper functions
export const getInvitationPreviewUrl = (id: string): string => {
    if (config.urlPattern === 'root') {
        // Backend expects /{id}/preview (without /invitations prefix)
        const url = `${config.backendUrl.replace('/api', '')}/${id}/preview`;
        console.log('🔧 Generated invitation preview URL (root pattern):', url);
        return url;
    } else {
        // Backend expects /invitations/{id}/preview
        const url = `${config.backendUrl}/invitations/${id}/preview`;
        console.log('🔧 Generated invitation preview URL (standard pattern):', url);
        return url;
    }
};

export const getBackendEndpoint = (endpoint: string): string => {
    const url = `${config.backendUrl}${endpoint}`;
    console.log('🔧 Generated backend endpoint URL:', url);
    return url;
};

// Log configuration for debugging (only in development)
if (isDevelopment) {
    console.log('🔧 Environment Configuration:', {
        backendUrl: config.backendUrl,
        urlPattern: config.urlPattern,
        environment: process.env.NODE_ENV,
        isVercel,
        isRender,
        nodeEnv: process.env.NODE_ENV,
    });
}
