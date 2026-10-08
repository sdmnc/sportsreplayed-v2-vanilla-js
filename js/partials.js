/*
 * This script finds all elements with `data-include="file_name"`
 * and replaces them with the content of that file.
 *
 * This version has the header and footer HTML built-in
 * to make updating the navigation links easier.
 */

// --- 1. HEADER HTML ---
// We define the header HTML here.
// *** FIX: Added default "Sign In" / "Create Account" buttons ***
const headerHTML = `
<header class="site-header">
    <div class="container nav-container">
        <a href="index.html" class="logo">SportsReplayed</a>
        
        <form class="search-bar" id="search-bar" action="search.html" method="GET">
            <input type="text" name="query" placeholder="Search games, players, lists...">
            <button type="submit"><i class="fas fa-search"></i></button>
        </form>

        <nav class="main-nav">
            <a href="games.html">GAMES</a>
            <a href="lists.html">LISTS</a>
            <a href="members.html">MEMBERS</a>
        </nav>

        <div class="user-nav" id="user-nav-links">
            <!-- 
              FIX: Added default logged-out links.
              auth.js will REPLACE this content if the user is logged in.
            -->
            <a href="login.html" class="btn-signup">SIGN IN</a>
            <a href="register.html" class="btn-signup">CREATE ACCOUNT</a>
        </div>
        
        <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</header>
<div class="mobile-nav-menu" id="mobile-nav-menu">
    <a href="games.html">GAMES</a>
    <a href="lists.html">LISTS</a>
    <a href="members.html">MEMBERS</a>
    <hr>
    <!-- 
      FIX: Added default logged-out links for mobile.
      auth.js will REPLACE this content if the user is logged in.
    -->
    <div id="mobile-auth-links">
        <a href="login.html" class="btn-signup">SIGN IN</a>
        <a href="register.html" class="btn-signup">CREATE ACCOUNT</a>
    </div>
</div>
`;

// --- 2. FOOTER HTML ---
// We define the footer HTML here.
const footerHTML = `
<footer class="site-footer">
    <div class="container">
        <p>
            <a href="about.html">About</a> - 
            <a href="terms.html">Terms of Use</a> - 
            <a href="privacy.html">Privacy Policy</a> - 
            <a href="contact.html">Contact</a>
        </p>
        <p>© ${new Date().getFullYear()} SportsReplayed. Concept inspired by community on cycling twitter.</p>
    </div>
</footer>
`;


// --- 3. INCLUDE FUNCTION ---
// This function runs on page load.
async function includeHTML() {
    // Find all elements with the [data-include] attribute
    const elements = document.querySelectorAll("[data-include]");

    for (const el of elements) {
        const file = el.getAttribute("data-include");
        let content = null;

        if (file === "header") {
            // If it's the header, use our built-in HTML
            content = headerHTML;
        } else if (file === "footer") {
            // If it's the footer, use our built-in HTML
            content = footerHTML;
        } else {
            // Otherwise, try to fetch the file
            try {
                const response = await fetch(file);
                if (response.ok) {
                    content = await response.text();
                } else {
                    content = `<p>Error: Could not load ${file}</p>`;
                }
            } catch (err) {
                console.error('Error fetching partial:', err);
                content = `<p>Error loading ${file}.</p>`;
            }
        }

        if (content) {
            el.innerHTML = content;
            // Remove the attribute to prevent re-loading
            el.removeAttribute("data-include");
        }
    }

    // After including HTML, set up mobile menu toggle (if it's on the page)
    setupMobileMenu();

    // Signal that header/footer partials are now in the DOM
    document.dispatchEvent(new Event('partialsLoaded'));
}

// --- 4. Mobile Menu Toggle ---
function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const menu = document.getElementById('mobile-nav-menu');

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}


// --- 5. RUN THE SCRIPT ---
// We run this when the page loads.
// We also wait for the "userLoaded" event from auth.js,
// which will then update the links if the user is logged in.
document.addEventListener("DOMContentLoaded", includeHTML);