// js/config.js
// Dynamic API configuration for different environments
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

if (isLocalhost) {
    // IMPORTANT CHANGE HERE:
    // Point to the production server so the local site works with the real database
    window.API_BASE_URL = 'https://sportsreplayed.com';
} else {
    // In production, leave as an empty string (use relative paths)
    window.API_BASE_URL = '';
}

// --- The rest of the code is correct; no changes needed ---

// Helper: return the API base (empty string in production, full URL in dev)
window.getApiBase = function () {
    return (typeof window.API_BASE_URL === 'string') ? window.API_BASE_URL : '';
};

// Helper to build an API URL from a path
window.apiUrl = function (path) {
    if (!path) path = '/';
    if (path[0] !== '/') path = '/' + path;
    return `${window.getApiBase()}${path}`;
};

// Backwards-compatible convenience variables
window.loginApiUrl = window.apiUrl('/api/login');
window.registerApiUrl = window.apiUrl('/api/register');
window.reviewsApiUrl = window.apiUrl('/api/reviews');
window.requestResetApiUrl = window.apiUrl('/api/request-password-reset');
window.resetPasswordApiUrl = window.apiUrl('/api/reset-password');

if (isLocalhost) {
    console.log('DEV MODE: Connected to remote API:', window.API_BASE_URL);
} else {
    console.log('Production mode: Relative paths active.');
}