import { state } from '../state.js';
import { initializeMap } from '../map.js';

export function renderSitesPage() {
    document.getElementById('mainContent').innerHTML = `
        <section class="section">
            <div class="container">
                <h1 class="section-title" data-en="Historic Sites" data-fr="Sites historiques">Historic Sites</h1>
                
                <!-- Map and View Toggle -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-primary active" id="gridViewBtn" data-en="Grid View" data-fr="Vue grille">
                                    <i class="bi bi-grid-3x3-gap"></i> Grid View
                                </button>
                                <button type="button" class="btn btn-outline-primary" id="mapViewBtn" data-en="Map View" data-fr="Vue carte">
                                    <i class="bi bi-map"></i> Map View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Search and Filters -->
                <div class="row mb-4" id="filtersSection">
                    <div class="col-lg-4">
                        <div class="search-box">
                            <i class="bi bi-search"></i>
                            <input type="text" class="form-control" id="siteSearch" 
                                   placeholder="Search sites..." data-en-placeholder="Search sites..." data-fr-placeholder="Rechercher des sites...">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <select class="form-select" id="regionFilter">
                            <option value="all" data-en="All Regions" data-fr="Toutes les régions">All Regions</option>
                            <option value="West" data-en="West" data-fr="Ouest">West</option>
                            <option value="Prairies" data-en="Prairies" data-fr="Prairies">Prairies</option>
                            <option value="Ontario" data-en="Ontario" data-fr="Ontario">Ontario</option>
                            <option value="Quebec" data-en="Quebec" data-fr="Québec">Quebec</option>
                            <option value="Atlantic" data-en="Atlantic" data-fr="Atlantique">Atlantic</option>
                            <option value="National" data-en="National" data-fr="National">National</option>
                        </select>
                    </div>
                    <div class="col-lg-4">
                        <select class="form-select" id="designationFilter">
                            <option value="all" data-en="All Designations" data-fr="Toutes les désignations">All Designations</option>
                            <option value="International" data-en="International" data-fr="International">International</option>
                            <option value="National" data-en="National" data-fr="National">National</option>
                            <option value="Regional" data-en="Regional" data-fr="Régional">Regional</option>
                        </select>
                    </div>
                </div>
                
                <!-- Category Filter Buttons -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="filter-buttons text-center">
                            <button class="filter-btn active" data-filter="all" data-en="All Categories" data-fr="Toutes catégories">All Categories</button>
                            <button class="filter-btn" data-filter="bridge" data-en="Bridges" data-fr="Ponts">Bridges</button>
                            <button class="filter-btn" data-filter="building" data-en="Buildings" data-fr="Bâtiments">Buildings</button>
                            <button class="filter-btn" data-filter="infrastructure" data-en="Infrastructure" data-fr="Infrastructure">Infrastructure</button>
                        </div>
                    </div>
                </div>
                
                <!-- Map Container -->
                <div id="mapContainer" class="mb-4" style="display: none;">
                    <div id="sitesMap" style="height: 500px; border-radius: 10px;"></div>
                </div>
                
                <!-- Sites Grid -->
                <div class="row" id="sitesGrid">
                    ${renderSitesGrid()}
                </div>
            </div>
        </section>
    `;

    setupSiteFilters();
    setupMapToggle();
}

export function renderSitesGrid() {
    return state.filteredSites.map(site => `
        <div class="col-lg-4 col-md-6 mb-4 site-item" data-category="${site.category}" data-region="${site.region}">
            <div class="card site-card h-100" data-site-id="${site.id}" style="cursor: pointer;">
                <img src="${site.image}" 
                     class="card-img-top" alt="${site.name[state.currentLang]}"
                     onerror="this.src='https://via.placeholder.com/400x250/58612a/ffffff?text=Historic+Site'">
                <div class="card-body">
                    <h5 class="card-title">${site.name[state.currentLang]}</h5>
                    <p class="card-text">${site.description[state.currentLang].substring(0, 120)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            <i class="bi bi-geo-alt"></i> ${site.location}
                        </small>
                        <small class="text-muted">${site.year}</small>
                    </div>
                    <div class="mt-2">
                        <span class="badge" style="background-color: var(--tertiary-color);">${site.region}</span>
                        <span class="badge ms-1" style="background-color: var(--secondary-color);">${site.designation_type}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function setupSiteFilters() {
    // Search functionality
    document.getElementById('siteSearch').addEventListener('input', () => {
        applyFilters();
    });

    // Region filter
    document.getElementById('regionFilter').addEventListener('change', () => {
        applyFilters();
    });

    // Designation type filter
    document.getElementById('designationFilter').addEventListener('change', () => {
        applyFilters();
    });

    // Category filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            applyFilters();
        });
    });
}

function setupMapToggle() {
    const gridViewBtn = document.getElementById('gridViewBtn');
    const mapViewBtn = document.getElementById('mapViewBtn');
    const mapContainer = document.getElementById('mapContainer');
    const sitesGrid = document.getElementById('sitesGrid');

    gridViewBtn.addEventListener('click', () => {
        gridViewBtn.classList.add('active');
        mapViewBtn.classList.remove('active');
        mapContainer.style.display = 'none';
        sitesGrid.style.display = 'flex';
    });

    mapViewBtn.addEventListener('click', () => {
        mapViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        mapContainer.style.display = 'block';
        sitesGrid.style.display = 'none';

        // Initialize map if not already done
        if (!state.map) {
            initializeMap();
        }
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('siteSearch')?.value.toLowerCase() || '';
    const selectedRegion = document.getElementById('regionFilter')?.value || 'all';
    const selectedDesignation = document.getElementById('designationFilter')?.value || 'all';
    const selectedCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

    state.filteredSites = state.sites.filter(site => {
        const matchesSearch = !searchTerm ||
            site.name[state.currentLang].toLowerCase().includes(searchTerm) ||
            site.description[state.currentLang].toLowerCase().includes(searchTerm) ||
            site.location.toLowerCase().includes(searchTerm);

        const matchesRegion = selectedRegion === 'all' || site.region === selectedRegion;
        const matchesDesignation = selectedDesignation === 'all' || site.designation_type === selectedDesignation;
        const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;

        return matchesSearch && matchesRegion && matchesDesignation && matchesCategory;
    });

    const grid = document.getElementById('sitesGrid');
    if (grid) {
        grid.innerHTML = renderSitesGrid();
    }
}
