// script.js
// Theme switching functionality

const THEME_KEY = 'theme-preference';
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference, system preference, or default to 'light'
function getThemePreference() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
        return saved;
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set the theme
function setTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem(THEME_KEY, 'dark');
    } else {
        html.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'light');
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'light';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const preference = getThemePreference();
    setTheme(preference);
    
    // Listen for theme toggle button clicks
    themeToggle?.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});
