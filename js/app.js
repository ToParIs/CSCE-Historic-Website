// CSCE Historic Sites Application Orchestrator
import { state } from './state.js';
import { 
    setupRouting, 
    navigateTo, 
    updateActiveNavLink, 
    updateNavbarStyling, 
    handleNavbarScroll 
} from './router.js';
import { toggleLanguage, updateLanguage } from './i18n.js';
import { openImageModal, openOperationModal } from './modal.js';

// Page Renderers
import { renderHomePage } from './pages/home.js';
import { renderAboutPage } from './pages/about.js';
import { renderSitesPage } from './pages/sites.js';
import { renderSiteDetailPage } from './pages/site-detail.js';
import { renderPartnersPage } from './pages/partners.js';
import { renderResourcesPage } from './pages/resources.js';
import { renderContactPage } from './pages/contact.js';

// Expose key API hooks to window object for legacy dynamic handlers (Leaflet popups, custom button onclicks)
window.app = {
    navigateTo,
    openOperationModal
};

async function init() {
    await loadSites();
    setupEventListeners();
    setupRouting();
    await loadPage();

    // Initialize navbar state
    setTimeout(() => {
        handleNavbarScroll();
    }, 100);
}

export async function loadSites() {
    try {
        const response = await fetch('data/sites.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        state.sites = await response.json();
        state.filteredSites = state.sites;
    } catch (error) {
        console.error('Error loading sites data:', error);
        state.sites = [];
        state.filteredSites = [];
    }
}

function setupEventListeners() {
    // Language toggle
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            toggleLanguage();
        });
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
        setupRouting();
        loadPage();
    });

    // Navbar scroll styling effect
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
    });

    // Set up navigation link and modal handlers using global event delegation
    document.addEventListener('click', (e) => {
        // Handle clickable images
        const clickableImage = e.target.closest('[data-image-src]');
        if (clickableImage) {
            const imageSrc = clickableImage.getAttribute('data-image-src');
            const imageCaption = clickableImage.getAttribute('data-image-caption');
            openImageModal(imageSrc, imageCaption);
            return;
        }

        // Handle navigation links
        const link = e.target.closest('a[href^="#"]');
        if (link && !e.defaultPrevented) {
            e.preventDefault();
            const page = link.getAttribute('href').substring(1);
            navigateTo(page);
            return;
        }

        // Handle site card clicks
        const siteCard = e.target.closest('[data-site-id]');
        if (siteCard) {
            const siteId = siteCard.getAttribute('data-site-id');
            navigateTo(siteId);
            return;
        }
    });
}

export async function loadPage() {
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    mainContent.innerHTML = '<div class="loading"><div class="spinner-border" role="status"></div></div>';

    // Ensure sites data is fetched before loading the page
    if (state.sites.length === 0) {
        await loadSites();
    }

    setTimeout(async () => {
        switch (state.currentPage) {
            case 'home':
                renderHomePage();
                break;
            case 'about':
                await renderAboutPage();
                break;
            case 'sites':
                renderSitesPage();
                break;
            case 'site-detail':
                renderSiteDetailPage();
                break;
            case 'partners':
                renderPartnersPage();
                break;
            case 'resources':
                await renderResourcesPage();
                break;
            case 'contact':
                renderContactPage();
                break;
            default:
                renderHomePage();
        }

        mainContent.classList.add('fade-in');
        updateLanguage();

        // Update active nav link and navbar styling after page load
        updateActiveNavLink();

        // Force navbar state update
        setTimeout(() => {
            updateNavbarStyling();
        }, 100);
    }, 300);
}

// Start application
init();