import { state } from './state.js';
import { loadPage } from './app.js';

export function setupRouting() {
    const hash = window.location.hash.substring(1);
    state.currentPage = hash || 'home';

    if (hash.startsWith('site-')) {
        state.currentSiteId = hash;
        state.currentPage = 'site-detail';
    }
}

export function navigateTo(page) {
    if (page.startsWith('site-')) {
        state.currentSiteId = page;
        state.currentPage = 'site-detail';
    } else {
        state.currentPage = page;
        state.currentSiteId = null;
    }

    // Close mobile menu if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        bsCollapse.hide();
    }

    window.location.hash = page;
    loadPage();

    // Scroll to top
    window.scrollTo(0, 0);
}

export function updateActiveNavLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Don't highlight nav for site detail pages
    if (!state.currentPage.startsWith('site-')) {
        const navLink = document.querySelector(`a[href="#${state.currentPage}"]`);
        if (navLink && navLink.classList.contains('nav-link')) {
            navLink.classList.add('active');
        }
    }

    updateNavbarStyling();
}

export function updateNavbarStyling() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (state.currentPage === 'home') {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
    } else {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
    }
}

export function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const scrolled = window.scrollY > 50;

    if (state.currentPage === 'home') {
        if (scrolled) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    } else {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    }
}
