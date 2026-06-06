import { state } from '../state.js';

export async function renderAboutPage() {
    // Load committee data
    let committee = [];
    try {
        const response = await fetch('data/committee.json');
        if (response.ok) {
            committee = await response.json();
        }
    } catch (error) {
        console.error('Error loading committee data:', error);
    }

    document.getElementById('mainContent').innerHTML = `
        <!-- About Hero -->
        <section class="about-hero py-5" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--tertiary-color) 100%); color: white;">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <h1 class="display-4 mb-4" data-en="Preserving Canada's Engineering Legacy" data-fr="Préserver l'héritage d'ingénierie du Canada">
                            Preserving Canada's Engineering Legacy
                        </h1>
                        <p class="lead mb-4" data-en="Since 1983, the CSCE National History Committee has been dedicated to recording, preserving, and celebrating the remarkable civil engineering achievements that shaped our nation." 
                           data-fr="Depuis 1983, le Comité national d'histoire de la SCGC se consacre à enregistrer, préserver et célébrer les remarquables réalisations de génie civil qui ont façonné notre nation.">
                            Since 1983, the CSCE National History Committee has been dedicated to recording, preserving, and celebrating the remarkable civil engineering achievements that shaped our nation.
                        </p>
                        <div class="hero-stats d-flex gap-4">
                            <div class="stat-item">
                                <div class="stat-number h3 mb-0">${state.sites.filter(site => site.designation_type === 'International').length + state.sites.filter(site => site.designation_type === 'National').length + state.sites.filter(site => site.designation_type === 'Regional').length}</div>
                                <small data-en="Sites Commemorated" data-fr="Sites commémorés">Sites Commemorated</small>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number h3 mb-0">40+</div>
                                <small data-en="Years of Service" data-fr="Années de service">Years of Service</small>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number h3 mb-0">10</div>
                                <small data-en="Provinces Covered" data-fr="Provinces couvertes">Provinces Covered</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 text-center">
                        <div class="about-icon">
                            <i class="bi bi-building" style="font-size: 8rem; opacity: 0.3;"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How We Operate -->
        <section class="section">
            <div class="container">
                <h2 class="section-title" data-en="How We Operate" data-fr="Comment nous fonctionnons">How We Operate</h2>
                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 operation-card" style="cursor: pointer;" onclick="window.app.openOperationModal('site-identification')">
                            <div class="card-body text-center p-4">
                                <div class="operation-icon mb-3">
                                    <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                </div>
                                <h4 data-en="Site Identification" data-fr="Identification des sites">Site Identification</h4>
                                <p data-en="We identify and commemorate civil engineering sites of important historical significance across Canada, marking each with an informative plaque." 
                                   data-fr="Nous identifions et commérons les sites de génie civil d'importance historique significative à travers le Canada, marquant chacun avec une plaque informative.">
                                    We identify and commemorate civil engineering sites of important historical significance across Canada, marking each with an informative plaque.
                                </p>
                                <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 operation-card" style="cursor: pointer;" onclick="window.app.openOperationModal('oral-history')">
                            <div class="card-body text-center p-4">
                                <div class="operation-icon mb-3">
                                    <i class="bi bi-mic-fill" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                </div>
                                <h4 data-en="Oral History" data-fr="Histoire orale">Oral History</h4>
                                <p data-en="We record interviews with distinguished engineers to preserve their knowledge and experiences for future generations of civil engineers." 
                                   data-fr="Nous enregistrons des entrevues avec des ingénieurs distingués pour préserver leurs connaissances et expériences pour les futures générations d'ingénieurs civils.">
                                    We record interviews with distinguished engineers to preserve their knowledge and experiences for future generations of civil engineers.
                                </p>
                                <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 operation-card" style="cursor: pointer;" onclick="window.app.openOperationModal('publications')">
                            <div class="card-body text-center p-4">
                                <div class="operation-icon mb-3">
                                    <i class="bi bi-book-fill" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                </div>
                                <h4 data-en="Publications" data-fr="Publications">Publications</h4>
                                <p data-en="We produce regular 'History Notes' articles, books on civil engineering history, and contribute to various engineering journals and magazines." 
                                   data-fr="Nous produisons régulièrement des articles 'Notes d'histoire', des livres sur l'histoire du génie civil, et contribuons à diverses revues et magazines d'ingénierie.">
                                    We produce regular 'History Notes' articles, books on civil engineering history, and contribute to various engineering journals and magazines.
                                </p>
                                <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 operation-card" style="cursor: pointer;" onclick="window.app.openOperationModal('awards')">
                            <div class="card-body text-center p-4">
                                <div class="operation-icon mb-3">
                                    <i class="bi bi-award-fill" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                </div>
                                <h4 data-en="Awards Program" data-fr="Programme de prix">Awards Program</h4>
                                <p data-en="We present the annual W. Gordon Plewes Award for outstanding contributions to civil engineering history literature." 
                                   data-fr="Nous présentons le prix annuel W. Gordon Plewes pour les contributions exceptionnelles à la littérature d'histoire du génie civil.">
                                    We present the annual W. Gordon Plewes Award for outstanding contributions to civil engineering history literature.
                                </p>
                                <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 operation-card" style="cursor: pointer;" onclick="window.app.openOperationModal('preservation')">
                            <div class="card-body text-center p-4">
                                <div class="operation-icon mb-3">
                                    <i class="bi bi-shield-fill-check" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                </div>
                                <h4 data-en="Preservation" data-fr="Préservation">Preservation</h4>
                                <p data-en="We work closely with national and local organizations to encourage the preservation of historic civil engineering works." 
                                   data-fr="Nous travaillons étroitement avec les organisations nationales et locales pour encourager la préservation des œuvres historiques de génie civil.">
                                    We work closely with national and local organizations to encourage the preservation of historic civil engineering works.
                                </p>
                                <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 operation-card" style="cursor: pointer;" onclick="window.app.openOperationModal('education')">
                            <div class="card-body text-center p-4">
                                <div class="operation-icon mb-3">
                                    <i class="bi bi-mortarboard-fill" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                </div>
                                <h4 data-en="Education" data-fr="Éducation">Education</h4>
                                <p data-en="We provide lectures and presentations to engineering students, professionals, and the public to promote awareness of civil engineering history." 
                                   data-fr="Nous offrons des conférences et présentations aux étudiants en ingénierie, aux professionnels et au public pour promouvoir la sensibilisation à l'histoire du génie civil.">
                                    We provide lectures and presentations to engineering students, professionals, and the public to promote awareness of civil engineering history.
                                </p>
                                <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Committee Members -->
        ${committee.length > 0 ? `
        <section class="section" style="background: var(--bg-light);">
            <div class="container">
                <h2 class="section-title" data-en="National History Committee" data-fr="Comité national d'histoire">National History Committee</h2>
                <p class="text-center mb-5" data-en="Meet the dedicated professionals who guide our historic preservation efforts" data-fr="Rencontrez les professionnels dévoués qui guident nos efforts de préservation historique">
                    Meet the dedicated professionals who guide our historic preservation efforts
                </p>
                <div class="row">
                    ${committee.map((member, index) => `
                        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div class="card committee-card h-100">
                                <div class="card-body text-center p-3">
                                    <div class="member-avatar mb-3">
                                        <i class="bi bi-person-circle" style="font-size: 3rem; color: var(--primary-color);"></i>
                                    </div>
                                    <h6 class="card-title mb-2">${member.name}</h6>
                                    <p class="text-muted small mb-1">${member.title}</p>
                                    <p class="small text-muted mb-0">${member.location}</p>
                                    ${index < 4 ? `<span class="badge mt-2" style="background-color: var(--secondary-color); font-size: 0.7rem;">Leadership</span>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Our Impact -->
        <section class="section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h2 data-en="Our Impact" data-fr="Notre impact">Our Impact</h2>
                        <p class="lead mb-4" data-en="Over four decades of dedication to preserving Canada's civil engineering heritage has resulted in significant achievements." 
                           data-fr="Plus de quatre décennies de dévouement à la préservation du patrimoine de génie civil du Canada ont abouti à des réalisations significatives.">
                            Over four decades of dedication to preserving Canada's civil engineering heritage has resulted in significant achievements.
                        </p>
                        <div class="impact-stats">
                            <div class="row">
                                <div class="col-6 mb-3">
                                    <div class="impact-item">
                                        <h3 class="text-primary">${state.sites.filter(site => site.designation_type === 'National').length}</h3>
                                        <p class="mb-0" data-en="National Historic Sites" data-fr="Sites historiques nationaux">National Historic Sites</p>
                                    </div>
                                </div>
                                <div class="col-6 mb-3">
                                    <div class="impact-item">
                                        <h3 class="text-primary">${state.sites.filter(site => site.designation_type === 'International').length}</h3>
                                        <p class="mb-0" data-en="International Sites" data-fr="Sites internationaux">International Sites</p>
                                    </div>
                                </div>
                                <div class="col-6 mb-3">
                                    <div class="impact-item">
                                        <h3 class="text-primary">8</h3>
                                        <p class="mb-0" data-en="Oral History Interviews" data-fr="Entrevues d'histoire orale">Oral History Interviews</p>
                                    </div>
                                </div>
                                <div class="col-6 mb-3">
                                    <div class="impact-item">
                                        <h3 class="text-primary">9</h3>
                                        <p class="mb-0" data-en="Plewes Awards Given" data-fr="Prix Plewes décernés">Plewes Awards Given</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="impact-visual p-4 text-center" style="background: var(--bg-light); border-radius: 1rem;">
                            <i class="bi bi-graph-up-arrow" style="font-size: 6rem; color: var(--primary-color); opacity: 0.7;"></i>
                            <h4 class="mt-3" data-en="Growing Legacy" data-fr="Héritage croissant">Growing Legacy</h4>
                            <p data-en="Each year, we continue to identify and commemorate new sites, ensuring Canada's engineering heritage is preserved for future generations." 
                               data-fr="Chaque année, nous continuons à identifier et commémorer de nouveaux sites, assurant que l'héritage d'ingénierie du Canada soit préservé pour les générations futures.">
                                Each year, we continue to identify and commemorate new sites, ensuring Canada's engineering heritage is preserved for future generations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Resources CTA -->
        <section class="section" style="background: var(--primary-color); color: white;">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8">
                        <h3 data-en="Detailed Guidelines & Procedures" data-fr="Directives et procédures détaillées">Detailed Guidelines & Procedures</h3>
                        <p class="mb-3" data-en="Our comprehensive Terms of Reference document outlines the detailed processes for site selection, designation criteria, plaquing ceremonies, award procedures, and committee organization." 
                           data-fr="Notre document complet de termes de référence décrit les processus détaillés pour la sélection des sites, les critères de désignation, les cérémonies de plaque, les procédures de prix et l'organisation du comité.">
                            Our comprehensive Terms of Reference document outlines the detailed processes for site selection, designation criteria, plaquing ceremonies, award procedures, and committee organization.
                        </p>
                        <div class="resource-highlights d-flex flex-wrap gap-3">
                            <span class="badge bg-light text-dark px-3 py-2"><i class="bi bi-file-text me-1"></i>Site Designation Process</span>
                            <span class="badge bg-light text-dark px-3 py-2"><i class="bi bi-award me-1"></i>Award Guidelines</span>
                            <span class="badge bg-light text-dark px-3 py-2"><i class="bi bi-mic me-1"></i>Oral History Procedures</span>
                            <span class="badge bg-light text-dark px-3 py-2"><i class="bi bi-calendar-event me-1"></i>Ceremony Protocols</span>
                        </div>
                    </div>
                    <div class="col-lg-4 text-lg-end">
                        <a href="#resources" class="btn btn-light btn-lg">
                            <i class="bi bi-download me-2"></i>
                            <span data-en="View Resources" data-fr="Voir les ressources">View Resources</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
}
