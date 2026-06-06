import { state } from './state.js';
import { loadPage } from './app.js';

export function toggleLanguage() {
    state.currentLang = state.currentLang === 'en' ? 'fr' : 'en';
    
    const currentLangEl = document.getElementById('currentLang');
    const otherLangEl = document.getElementById('otherLang');
    if (currentLangEl) currentLangEl.textContent = state.currentLang.toUpperCase();
    if (otherLangEl) otherLangEl.textContent = state.currentLang === 'en' ? 'FR' : 'EN';
    
    updateLanguage();
    loadPage(); // Reload current page with new language
}

export function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${state.currentLang}`);
        if (text) {
            element.textContent = text;
        }
    });

    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        const placeholder = element.getAttribute(`data-${state.currentLang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    // Update document language
    document.documentElement.lang = state.currentLang;
}
