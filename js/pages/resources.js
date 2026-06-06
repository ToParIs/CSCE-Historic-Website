export async function renderResourcesPage() {
    // Load resources data
    let resources = { publications: [], awards: [], external_links: [] };
    try {
        const response = await fetch('data/resources.json');
        if (response.ok) {
            resources = await response.json();
        }
    } catch (error) {
        console.error('Error loading resources data:', error);
    }

    document.getElementById('mainContent').innerHTML = `
        <!-- Resources Hero -->
        <section class="resources-hero py-5" style="background: linear-gradient(135deg, var(--tertiary-color) 0%, rgba(114, 103, 90, 0.9) 100%); color: white;">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <h1 class="display-5 mb-4" data-en="Resources & Documentation" data-fr="Ressources et documentation">
                            Resources & Documentation
                        </h1>
                        <p class="lead mb-4" data-en="Access our comprehensive collection of publications, historical documents, research materials, and external resources related to Canadian civil engineering heritage." 
                           data-fr="Accédez à notre collection complète de publications, documents historiques, matériaux de recherche et ressources externes liées au patrimoine du génie civil canadien.">
                            Access our comprehensive collection of publications, historical documents, research materials, and external resources related to Canadian civil engineering heritage.
                        </p>
                        <div class="resource-stats d-flex gap-4">
                            <div class="stat-item">
                                <div class="stat-number h4 mb-0">${resources.publications.length}</div>
                                <small data-en="Publications" data-fr="Publications">Publications</small>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number h4 mb-0">${resources.awards.length}</div>
                                <small data-en="Awards Received" data-fr="Prix reçus">Awards Received</small>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number h4 mb-0">${resources.external_links.length}</div>
                                <small data-en="External Links" data-fr="Liens externes">External Links</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 text-center">
                        <i class="bi bi-archive" style="font-size: 8rem; opacity: 0.3;"></i>
                    </div>
                </div>
            </div>
        </section>

        <!-- Resources Content -->
        <section class="section">
            <div class="container">
                <!-- Navigation Tabs -->
                <ul class="nav nav-pills nav-fill mb-4 resources-nav" id="resourcesTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="publications-tab" data-bs-toggle="pill" data-bs-target="#publications" type="button" role="tab">
                            <i class="bi bi-file-text me-2"></i>
                            <span data-en="Publications" data-fr="Publications">Publications</span>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="awards-tab" data-bs-toggle="pill" data-bs-target="#awards" type="button" role="tab">
                            <i class="bi bi-award me-2"></i>
                            <span data-en="Awards" data-fr="Prix">Awards</span>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="links-tab" data-bs-toggle="pill" data-bs-target="#links" type="button" role="tab">
                            <i class="bi bi-link-45deg me-2"></i>
                            <span data-en="External Links" data-fr="Liens externes">External Links</span>
                        </button>
                    </li>
                </ul>

                <!-- Tab Content -->
                <div class="tab-content" id="resourcesTabContent">
                    <!-- Publications Tab -->
                    <div class="tab-pane fade show active" id="publications" role="tabpanel">
                        <div class="row mb-4">
                            <div class="col-lg-6">
                                <div class="search-box">
                                    <i class="bi bi-search"></i>
                                    <input type="text" class="form-control" id="publicationSearch" 
                                           placeholder="Search publications..." data-en-placeholder="Search publications..." data-fr-placeholder="Rechercher des publications...">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <select class="form-select" id="categoryFilter">
                                    <option value="all" data-en="All Categories" data-fr="Toutes les catégories">All Categories</option>
                                    <option value="Historical Research">Historical Research</option>
                                    <option value="Official Guidelines">Official Guidelines</option>
                                    <option value="Committee Overview">Committee Overview</option>
                                    <option value="Biographical Reference">Biographical Reference</option>
                                </select>
                            </div>
                        </div>

                        <div class="publications-table">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead style="background-color: var(--primary-color); color: white;">
                                        <tr>
                                            <th data-en="Title" data-fr="Titre">Title</th>
                                            <th data-en="Type" data-fr="Type">Type</th>
                                            <th data-en="Date" data-fr="Date">Date</th>
                                            <th data-en="Author" data-fr="Auteur">Author</th>
                                            <th data-en="Action" data-fr="Action">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="publicationsTableBody">
                                        ${resources.publications.map(pub => `
                                            <tr class="publication-row" data-category="${pub.category}">
                                                <td>
                                                    <strong>${pub.title}</strong>
                                                    <br><small class="text-muted">${pub.description}</small>
                                                </td>
                                                <td><span class="badge" style="background-color: var(--tertiary-color);">${pub.type}</span></td>
                                                <td>${new Date(pub.date).toLocaleDateString()}</td>
                                                <td>${pub.author}</td>
                                                <td>
                                                    <a href="${pub.file}" class="btn btn-sm btn-primary" target="_blank">
                                                        <i class="bi bi-download me-1"></i>
                                                        <span data-en="Download" data-fr="Télécharger">Download</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Awards Tab -->
                    <div class="tab-pane fade" id="awards" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <p class="text-center mb-5" data-en="Recognition received by the CSCE National History Committee for excellence in heritage preservation and historical documentation." 
                                   data-fr="Reconnaissance reçue par le Comité national d'histoire de la SCGC pour l'excellence en préservation du patrimoine et documentation historique.">
                                    Recognition received by the CSCE National History Committee for excellence in heritage preservation and historical documentation.
                                </p>
                                ${resources.awards.map(award => `
                                    <div class="card award-card mb-4">
                                        <div class="card-body p-4">
                                            <div class="row align-items-center">
                                                <div class="col-md-2 text-center">
                                                    <div class="award-year">
                                                        <span class="display-6" style="color: var(--secondary-color); font-weight: bold;">${award.year}</span>
                                                    </div>
                                                </div>
                                                <div class="col-md-10">
                                                    <h4 class="mb-2" style="color: var(--primary-color);">${award.title}</h4>
                                                    <p class="mb-2"><strong>Presented by:</strong> ${award.presenter}</p>
                                                    <p class="mb-2">${award.description}</p>
                                                    <small class="text-muted"><strong>Significance:</strong> ${award.significance}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- External Links Tab -->
                    <div class="tab-pane fade" id="links" role="tabpanel">
                        <div class="row mb-4">
                            <div class="col-lg-8 mx-auto text-center">
                                <p data-en="Curated collection of external websites and resources related to civil engineering history, heritage preservation, and technical documentation." 
                                   data-fr="Collection organisée de sites web externes et de ressources liées à l'histoire du génie civil, à la préservation du patrimoine et à la documentation technique.">
                                    Curated collection of external websites and resources related to civil engineering history, heritage preservation, and technical documentation.
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            ${resources.external_links.map(link => `
                                <div class="col-lg-6 mb-4">
                                    <div class="card external-link-card h-100">
                                        <div class="card-body p-4">
                                            <div class="d-flex align-items-start">
                                                <div class="link-icon me-3">
                                                    <i class="bi bi-globe" style="font-size: 2rem; color: var(--primary-color);"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <h5 class="card-title">${link.title}</h5>
                                                    <p class="card-text">${link.description}</p>
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <span class="badge" style="background-color: var(--tertiary-color);">${link.category}</span>
                                                        <a href="${link.url}" target="_blank" class="btn btn-outline-primary btn-sm">
                                                            <i class="bi bi-box-arrow-up-right me-1"></i>
                                                            <span data-en="Visit Site" data-fr="Visiter le site">Visit Site</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    setupResourcesFilters();
}

function setupResourcesFilters() {
    const searchInput = document.getElementById('publicationSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterPublications();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            filterPublications();
        });
    }
}

function filterPublications() {
    const searchTerm = document.getElementById('publicationSearch')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || 'all';
    const rows = document.querySelectorAll('.publication-row');

    rows.forEach(row => {
        const title = row.querySelector('strong').textContent.toLowerCase();
        const description = row.querySelector('small').textContent.toLowerCase();
        const category = row.getAttribute('data-category');

        const matchesSearch = !searchTerm ||
            title.includes(searchTerm) ||
            description.includes(searchTerm);

        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
