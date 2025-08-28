// Backend API Configuration
// Update this file when you need to change the backend URL

export const BACKEND_CONFIG = {
    // Base URL for your backend API
    // Common ports: 3001, 8000, 5000, 8080
    BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api',

    // Individual service endpoints
    INVITATIONS: '/invitations',
    GUESTS: '/guests',
    GUEST_GROUPS: '/guest-groups',
    AUTH: '/auth',

    // Full URLs for each service
    get INVITATIONS_URL() { return `${this.BASE_URL}${this.INVITATIONS}`; },
    get GUESTS_URL() { return `${this.BASE_URL}${this.GUESTS}`; },
    get GUEST_GROUPS_URL() { return `${this.BASE_URL}${this.GUEST_GROUPS}`; },
    get AUTH_URL() { return `${this.BASE_URL}${this.AUTH}`; },

    // Alternative URL patterns for different backend configurations
    // Some backends expect /{id}/preview instead of /invitations/{id}/preview
    get INVITATION_PREVIEW_PATTERN() {
        return process.env.NEXT_PUBLIC_BACKEND_URL_PATTERN === 'root'
            ? `${this.BASE_URL.replace('/api', '')}`
            : this.BASE_URL;
    },
};

// Helper function to get full URL for a specific endpoint
export const getBackendUrl = (endpoint: string): string => {
    return `${BACKEND_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get invitation preview URL based on backend pattern
export const getInvitationPreviewUrl = (id: string): string => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL_PATTERN === 'root') {
        // Backend expects /{id}/preview (without /invitations prefix)
        return `${BACKEND_CONFIG.BASE_URL.replace('/api', '')}/${id}/preview`;
    } else {
        // Backend expects /invitations/{id}/preview
        return `${BACKEND_CONFIG.BASE_URL}/invitations/${id}/preview`;
    }
};

// Helper function to get full URL for a specific endpoint (used by API routes)
export const getBackendEndpoint = (endpoint: string): string => {
    return `${BACKEND_CONFIG.BASE_URL}${endpoint}`;
};
