/*
 * This script handles user authentication.
 * It checks localStorage for a token and updates the UI.
 */

(function (window) {
    const STORAGE_KEY = 'sportsReplayedAuth';

    // --- 1. Core Auth Functions ---

    /**
     * Saves auth token and user info to localStorage.
     * @param {string} token - The JWT token.
     * @param {object} user - The user object (e.g., {username, email}).
     */
    function saveAuth(token, user) {
        try {
            const authData = { token, user };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
            // Send a signal that the user has logged in
            document.dispatchEvent(new Event('userLoaded'));
        } catch (e) {
            console.error("Error saving auth data:", e);
        }
    }

    /**
     * Retrieves auth token and user info from localStorage.
     * @returns {object|null} - The auth data {token, user} or null.
     */
    function getAuth() {
        try {
            const authData = localStorage.getItem(STORAGE_KEY);
            return authData ? JSON.parse(authData) : null;
        } catch (e) {
            console.error("Error getting auth data:", e);
            return null;
        }
    }

    /**
     * Clears auth data from localStorage and reloads the page.
     */
    function clearAuth() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            // Send a signal that the user has logged out
            document.dispatchEvent(new Event('userLoaded'));
            // Redirect to home after logging out
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = 'index.html';
            }
        } catch (e) {
            console.error("Error clearing auth data:", e);
        }
    }

    // --- 2. UI Update Function ---

    /**
     * Updates the header links based on auth state.
     */
    function updateHeaderUI() {
        const auth = getAuth();
        const userNav = document.getElementById('user-nav-links');
        const mobileNav = document.getElementById('mobile-auth-links');

        // Stop if the partials haven't loaded the header yet
        if (!userNav || !mobileNav) {
            console.warn('Auth script ran before header was loaded. Waiting...');
            return;
        }

        if (auth && auth.token && auth.user) {
            // --- User is LOGGED IN ---
            const username = auth.user.username || 'Account';
            const profileUrl = `profile.html?username=${encodeURIComponent(username)}`;

            // Desktop Header
            userNav.innerHTML = `
                <a href="submitreview.html" class="btn-log" title="Log an event">
                    <i class="fas fa-plus-circle"></i> Log
                </a>
                <a href="${profileUrl}" title="Your Profile">
                    <i class="fas fa-user-circle"></i> ${username}
                </a>
                <a href="#" id="logout-btn">LOG OUT</a>
            `;

            // Mobile Header
            mobileNav.innerHTML = `
                <a href="${profileUrl}">PROFILE</a>
                <a href="submitreview.html">LOG EVENT</a>
                <a href="#" id="mobile-logout-btn">LOG OUT</a>
            `;

            // Add event listeners to the new logout buttons
            document.getElementById('logout-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                clearAuth();
            });
            document.getElementById('mobile-logout-btn')?.addEventListener('click', (e) => {
                e.preventDefault();
                clearAuth();
            });

        } else {
            // --- User is LOGGED OUT ---
            // The default HTML from partials.js is already correct.
            // We just ensure it's there.

            // Desktop Header
            userNav.innerHTML = `
                <a href="login.html" class="btn-signup">SIGN IN</a>
                <a href="register.html" class="btn-signup">CREATE ACCOUNT</a>
            `;

            // Mobile Header
            mobileNav.innerHTML = `
                <a href="login.html" class="btn-signup">SIGN IN</a>
                <a href="register.html" class="btn-signup">CREATE ACCOUNT</a>
            `;
        }
    }

    // --- 3. SCRIPT EXECUTION ---

    // --- FIX: ---
    // Don't run on "DOMContentLoaded".
    // Wait for the "signal" from partials.js instead.
    document.addEventListener('partialsLoaded', updateHeaderUI);

    // Also re-run if another part of the app logs in/out
    document.addEventListener('userLoaded', updateHeaderUI);


    // --- 4. Expose functions to the global window object ---
    window.Auth = {
        saveAuth,
        getAuth,
        clearAuth,
        updateHeader: updateHeaderUI // Expose this in case we need to call it manually
    };

})(window);