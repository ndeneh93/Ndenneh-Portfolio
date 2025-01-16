// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Typing animation
const text = "Computer Science at Baku State University | Cybersecurity Researcher";
let index = 0;
function typeWriter() {
    const typeTarget = document.querySelector('.type-text');
    if (index < text.length) {
        typeTarget.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}

// Fade in sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
// Theme toggle functionality
function toggleTheme() {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateThemeIcon(savedTheme === 'dark-theme');
    }
});

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark-theme' : '');
    
    // Update icon
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function initTheme() {
    // Check if user has system dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set theme based on system preference or stored preference
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initTheme);