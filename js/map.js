import { state } from './state.js';

export function initializeMap() {
    // Check if element exists before initializing map
    const mapElement = document.getElementById('sitesMap');
    if (!mapElement) return null;

    // Initialize Leaflet map
    state.map = L.map('sitesMap').setView([56.1304, -106.3468], 4); // Center of Canada

    // Add neutral/grayscale tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 19
    }).addTo(state.map);

    // Add markers for each site
    state.sites.forEach(site => {
        if (site.coordinates) {
            const marker = L.marker([site.coordinates.lat, site.coordinates.lng])
                .addTo(state.map)
                .bindPopup(`
                    <div class="map-popup">
                        <h6>${site.name[state.currentLang]}</h6>
                        <p class="small">${site.location}</p>
                        <p class="small">${site.description[state.currentLang].substring(0, 100)}...</p>
                        <button class="btn btn-sm btn-primary" onclick="window.app.navigateTo('${site.id}')">
                            ${state.currentLang === 'en' ? 'View Details' : 'Voir les détails'}
                        </button>
                    </div>
                `);
        }
    });

    return state.map;
}

export function initializeSiteDetailMap(site) {
    const detailMapElement = document.getElementById('siteDetailMap');
    if (!detailMapElement || !site.coordinates) return null;

    // Initialize map with neutral/grayscale style
    const map = L.map('siteDetailMap').setView([site.coordinates.lat, site.coordinates.lng], 13);

    // Use CartoDB Positron (light, neutral) tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 19
    }).addTo(map);

    // Add marker for the site
    const marker = L.marker([site.coordinates.lat, site.coordinates.lng])
        .addTo(map)
        .bindPopup(`
            <div class="map-popup">
                <h6>${site.name[state.currentLang]}</h6>
                <p class="small mb-0">${site.location}</p>
            </div>
        `);

    // Open popup by default
    marker.openPopup();

    return map;
}
