import { state } from '../state.js';
import { formatTextContent, getNextPrevSiteButtons } from '../utils.js';
import { initializeSiteDetailMap } from '../map.js';

export function renderSiteDetailPage() {
    const site = state.sites.find(s => s.id === state.currentSiteId);

    if (!site) {
        document.getElementById('mainContent').innerHTML = `
            <section class="section">
                <div class="container">
                    <div class="text-center">
                        <h1 data-en="Site Not Found" data-fr="Site non trouvé">Site Not Found</h1>
                        <p data-en="The requested site could not be found." data-fr="Le site demandé n'a pas pu être trouvé.">The requested site could not be found.</p>
                        <a href="#sites" class="btn btn-primary" data-en="Back to Sites" data-fr="Retour aux sites">Back to Sites</a>
                    </div>
                </div>
            </section>
        `;
        return;
    }

    document.getElementById('mainContent').innerHTML = `
        <!-- Site Detail Hero -->
        <section class="site-hero" style="background: linear-gradient(rgba(88, 97, 42, 0.7), rgba(114, 103, 90, 0.7)), url('${site.images?.hero || site.image}') center/cover; min-height: 60vh; display: flex; align-items: center;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <nav aria-label="breadcrumb" class="mb-4">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#home" class="text-light" data-en="Home" data-fr="Accueil">Home</a></li>
                                <li class="breadcrumb-item"><a href="#sites" class="text-light" data-en="Historic Sites" data-fr="Sites historiques">Historic Sites</a></li>
                                <li class="breadcrumb-item active text-light" aria-current="page">${site.name[state.currentLang]}</li>
                            </ol>
                        </nav>
                        <h1 class="display-4 text-white mb-3">${site.name[state.currentLang]}</h1>
                        <p class="lead text-white mb-4">${site.location}</p>
                        <div class="d-flex flex-wrap gap-2 mb-4">
                            <span class="badge bg-light text-dark px-3 py-2">${site.year}</span>
                            <span class="badge bg-light text-dark px-3 py-2">${site.region}</span>
                            <span class="badge bg-light text-dark px-3 py-2">${site.category.charAt(0).toUpperCase() + site.category.slice(1)}</span>
                            <span class="badge px-3 py-2" style="background-color: var(--secondary-color); color: white;">${site.designation_type} Historic Site</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Site Details -->
        <section class="section">
            <div class="container">
                <div class="row">
                    <!-- Main Content -->
                    <div class="col-lg-8">
                        <!-- About This Site -->
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h2 class="mb-4" data-en="About This Site" data-fr="À propos de ce site">About This Site</h2>
                                <p class="lead">${site.description[state.currentLang]}</p>
                            </div>
                        </div>

                        <!-- Technical Details -->
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h3 class="mb-4" data-en="Technical Information" data-fr="Informations techniques">Technical Information</h3>
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <strong data-en="Construction Year:" data-fr="Année de construction:">Construction Year:</strong><br>
                                        ${site.year}
                                    </div>
                                    ${site.construction_start ? `
                                    <div class="col-md-6 mb-3">
                                        <strong data-en="Construction Started:" data-fr="Construction commencée:">Construction Started:</strong><br>
                                        ${site.construction_start}
                                    </div>
                                    ` : ''}
                                    ${site.engineer ? `
                                    <div class="col-md-6 mb-3">
                                        <strong data-en="Engineer/Designer:" data-fr="Ingénieur/Concepteur:">Engineer/Designer:</strong><br>
                                        ${site.engineer}
                                    </div>
                                    ` : ''}
                                    ${site.contractor ? `
                                    <div class="col-md-6 mb-3">
                                        <strong data-en="Contractor:" data-fr="Entrepreneur:">Contractor:</strong><br>
                                        ${site.contractor}
                                    </div>
                                    ` : ''}
                                    <div class="col-md-6 mb-3">
                                        <strong data-en="CSCE Designation:" data-fr="Désignation SCGC:">CSCE Designation:</strong><br>
                                        ${site.designation_year}
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <strong data-en="Coordinates:" data-fr="Coordonnées:">Coordinates:</strong><br>
                                        ${site.coordinates.lat.toFixed(4)}, ${site.coordinates.lng.toFixed(4)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        ${site.detailed_description ? `
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h3 class="mb-4" data-en="Description" data-fr="Description">Description</h3>
                                <div class="description-content">
                                    ${formatTextContent(site.detailed_description[state.currentLang])}
                                </div>
                            </div>
                        </div>
                        ` : ''}

                        <!-- Hero Image Section -->
                        ${site.images?.hero ? `
                        <div class="card mb-4">
                            <div class="card-body p-0">
                                <img src="${site.images.hero}" 
                                     class="img-fluid w-100 clickable-image" 
                                     alt="${site.name[state.currentLang]} - Main View"
                                     style="border-radius: 0.375rem; cursor: pointer; max-height: 400px; object-fit: cover;"
                                     data-image-src="${site.images.hero}" data-image-caption="${site.name[state.currentLang]} - Main View"
                                     onerror="this.style.display='none'">
                            </div>
                        </div>
                        ` : ''}

                        <!-- Historic Significance -->
                        ${site.historic_significance ? `
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h3 class="mb-4" data-en="Historic Significance" data-fr="Importance historique">Historic Significance</h3>
                                <div class="historic-significance-content">
                                    ${formatTextContent(site.historic_significance[state.currentLang])}
                                </div>
                            </div>
                        </div>
                        ` : ''}

                        <!-- CSCE Plaque -->
                        ${site.plaque_description ? `
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h3 class="mb-4" data-en="CSCE Historic Site Plaque" data-fr="Plaque de site historique SCGC">CSCE Historic Site Plaque</h3>
                                <div class="plaque-content">
                                    ${formatTextContent(site.plaque_description[state.currentLang])}
                                </div>
                                ${site.plaque_location ? `
                                <div class="plaque-location-details mt-4">
                                    <h5 data-en="Plaque Location" data-fr="Emplacement de la plaque">Plaque Location</h5>
                                    <p>${site.plaque_location[state.currentLang]}</p>
                                </div>
                                ` : ''}
                                ${site.plaque_unveiling ? `
                                <div class="plaque-unveiling-details mt-4">
                                    <h5 data-en="Plaque Unveiling Ceremony" data-fr="Cérémonie de dévoilement de la plaque">Plaque Unveiling Ceremony</h5>
                                    <p>${site.plaque_unveiling[state.currentLang]}</p>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        ` : ''}

                        <!-- External Links -->
                        ${site.external_links && site.external_links.length > 0 ? `
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h3 class="mb-4" data-en="Additional Resources" data-fr="Ressources supplémentaires">Additional Resources</h3>
                                <ul class="list-unstyled">
                                    ${site.external_links.map(link => `
                                        <li class="mb-2">
                                            <a href="${link.url}" target="_blank" class="text-decoration-none">
                                                <i class="bi bi-box-arrow-up-right me-2"></i>
                                                ${link.title[state.currentLang]}
                                            </a>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        ` : ''}

                        <!-- Acknowledgments -->
                        ${site.acknowledgments ? `
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <h3 class="mb-4" data-en="Acknowledgments" data-fr="Remerciements">Acknowledgments</h3>
                                <p>${site.acknowledgments[state.currentLang]}</p>
                            </div>
                        </div>
                        ` : ''}
                    </div>

                    <!-- Sidebar Map & Photos -->
                    <div class="col-lg-4">
                        <!-- Location Map -->
                        <div class="card mb-4">
                            <div class="card-body p-3">
                                <h5 class="mb-3" data-en="Location Map" data-fr="Carte de localisation">Location Map</h5>
                                <div id="siteDetailMap" style="height: 250px; border-radius: 8px;"></div>
                            </div>
                        </div>

                        <!-- Site Photos Gallery -->
                        ${site.images?.gallery && site.images.gallery.length > 0 ? `
                        <div class="card mb-4">
                            <div class="card-body p-3">
                                <h5 class="mb-3" data-en="Site Photos" data-fr="Photos du site">Site Photos</h5>
                                <div class="row g-2">
                                    ${site.images.gallery.map((img, index) => {
                                        const src = typeof img === 'string' ? img : img.src;
                                        const captionObj = typeof img === 'object' && img.caption ? img.caption : null;
                                        const captionText = captionObj ? (captionObj[state.currentLang] || captionObj['en'] || '') : '';
                                        return `
                                            <div class="col-6">
                                                <img src="${src}" 
                                                     class="img-fluid rounded clickable-image" 
                                                     alt="${site.name[state.currentLang]} - Photo ${index + 1}"
                                                     style="cursor: pointer; height: 100px; width: 100%; object-fit: cover;"
                                                     data-image-src="${src}" 
                                                     data-image-caption="${captionText || site.name[state.currentLang]}"
                                                     onerror="this.parentNode.style.display='none'">
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Navigation -->
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="d-flex justify-content-between">
                            <a href="#sites" class="btn btn-outline-primary">
                                <i class="bi bi-arrow-left me-2"></i>
                                <span data-en="Back to All Sites" data-fr="Retour à tous les sites">Back to All Sites</span>
                            </a>
                            ${getNextPrevSiteButtons(site.id, state.sites)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Initialize the detail map
    setTimeout(() => {
        initializeSiteDetailMap(site);
    }, 100);
}
