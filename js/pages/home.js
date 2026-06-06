import { state } from '../state.js';

export function renderHomePage() {
    const featuredSites = state.sites
        .filter(site => site.isfeatured === true)
        .sort((a, b) => {
            const aNum = parseInt(a.id.split('-')[1]);
            const bNum = parseInt(b.id.split('-')[1]);
            return aNum - bNum;
        })
        .slice(0, 3);

    document.getElementById('mainContent').innerHTML = `
        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="row justify-content-center text-center">
                    <div class="col-lg-10">
                        <h1 data-en="Preserving Canada's Engineering Heritage" data-fr="Préserver le patrimoine d'ingénierie du Canada">
                            Preserving Canada's Engineering Heritage
                        </h1>
                        <p class="lead mb-5" data-en="Discover the remarkable engineering achievements that shaped our nation's history through the CSCE Historic Sites program." 
                           data-fr="Découvrez les remarquables réalisations d'ingénierie qui ont façonné l'histoire de notre nation grâce au programme des sites historiques de la SCGC.">
                            Discover the remarkable engineering achievements that shaped our nation's history through the CSCE Historic Sites program.
                        </p>
                        <div class="hero-buttons">
                            <a href="#sites" class="btn btn-lg me-3 mb-3" style="background-color: var(--secondary-color); color: white; border: none; padding: 1rem 2.5rem;" data-en="Explore Sites" data-fr="Explorer les sites">
                                <i class="bi bi-compass me-2"></i>Explore Sites
                            </a>
                            <a href="#about" class="btn btn-outline-light btn-lg mb-3" style="padding: 1rem 2.5rem;" data-en="Learn More" data-fr="En savoir plus">
                                <i class="bi bi-info-circle me-2"></i>Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="stats section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="stat-item">
                            <span class="stat-number">${state.sites.filter(site => site.designation_type === 'International').length}</span>
                            <div class="stat-label" data-en="International Sites" data-fr="Sites internationaux">International Sites</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="stat-item">
                            <span class="stat-number">${state.sites.filter(site => site.designation_type === 'National').length}</span>
                            <div class="stat-label" data-en="National Sites" data-fr="Sites nationaux">National Sites</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="stat-item">
                            <span class="stat-number">${state.sites.filter(site => site.designation_type === 'Regional').length}</span>
                            <div class="stat-label" data-en="Regional Sites" data-fr="Sites régionaux">Regional Sites</div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="stat-item">
                            <span class="stat-number">1976</span>
                            <div class="stat-label" data-en="Program Established" data-fr="Programme établi">Program Established</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Sites -->
        <section class="section">
            <div class="container">
                <h2 class="section-title" data-en="Featured Historic Sites" data-fr="Sites historiques en vedette">
                    Featured Historic Sites
                </h2>
                <div class="row">
                    ${featuredSites.length > 0 ? featuredSites.map(site => `
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="card h-100 site-card" data-site-id="${site.id}" style="cursor: pointer;">
                                <img src="${site.image}" 
                                     class="card-img-top" alt="${site.name[state.currentLang]}"
                                     onerror="this.src='https://via.placeholder.com/400x250/58612a/ffffff?text=Historic+Site'">
                                <div class="card-body">
                                    <h5 class="card-title">${site.name[state.currentLang]}</h5>
                                    <p class="card-text">${site.description[state.currentLang].substring(0, 100)}...</p>
                                    <small class="text-muted">
                                        <i class="bi bi-geo-alt"></i> ${site.location}
                                    </small>
                                </div>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="col-12 text-center">
                            <p class="text-muted">Loading featured sites...</p>
                        </div>
                    `}
                </div>
                <div class="text-center mt-4">
                    <a href="#sites" class="btn btn-primary btn-lg" data-en="View All Sites" data-fr="Voir tous les sites">
                        View All Sites
                    </a>
                </div>
            </div>
        </section>

        <!-- Next Plaque Unveiling -->
        <section class="section plaque-unveiling-section">
            <div class="container">
                <!-- Centered Title -->
                <div class="row mb-5">
                    <div class="col-12 text-center">
                        <h2 class="section-title mb-4" data-en="Next Plaque Unveiling Ceremony" data-fr="Prochaine cérémonie de dévoilement de plaque">
                            Next Plaque Unveiling Ceremony
                        </h2>
                        <p class="lead text-center mx-auto" style="max-width: 600px;" data-en="Join us for the official designation of another remarkable engineering achievement that has shaped Canada's infrastructure and heritage." 
                           data-fr="Joignez-vous à nous pour la désignation officielle d'une autre réalisation d'ingénierie remarquable qui a façonné l'infrastructure et le patrimoine du Canada.">
                            Join us for the official designation of another remarkable engineering achievement that has shaped Canada's infrastructure and heritage.
                        </p>
                    </div>
                </div>
                
                <!-- Content Row: 2/3 Photo + 1/3 Info -->
                <div class="row align-items-stretch mb-5">
                    <div class="col-lg-8 mb-4 mb-lg-0">
                        <div class="unveiling-image-placeholder h-100">
                            <img src="images/events/previous-unveiling.jpg" 
                                 class="img-fluid rounded-3 shadow-lg w-100 h-100" 
                                 alt="Previous Plaque Unveiling Ceremony"
                                 style="object-fit: cover; min-height: 400px;"
                                 onerror="this.src='https://via.placeholder.com/800x400/72675a/ffffff?text=Previous+Unveiling+Ceremony'">
                            <div class="image-overlay">
                                <small class="text-white" data-en="Previous ceremony at Winnipeg" data-fr="Cérémonie précédente à Winnipeg">
                                    Previous ceremony at Winnipeg
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="unveiling-content ps-lg-4 h-100">
                            <div class="event-info-buttons d-flex flex-column h-100" style="gap: 0.75rem;">
                                <div class="info-button flex-fill d-flex align-items-center" style="background: white; color: var(--text-dark); padding: 1.25rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); border: 1px solid rgba(88, 97, 42, 0.15);" 
                                     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.12)'; this.style.borderColor='var(--primary-color)'" 
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(0, 0, 0, 0.08)'; this.style.borderColor='rgba(88, 97, 42, 0.15)'">
                                    <div class="me-3">
                                        <i class="bi bi-building" style="font-size: 1.8rem; color: var(--primary-color);"></i>
                                    </div>
                                    <div class="flex-grow-1 text-start">
                                        <div style="font-weight: 600; font-size: 0.95rem; color: var(--primary-color); margin-bottom: 0.25rem;" data-en="Site" data-fr="Site">Site</div>
                                        <div style="font-size: 0.9rem; color: var(--text-light);" data-en="To be announced" data-fr="À annoncer">To be announced</div>
                                    </div>
                                </div>
                                
                                <div class="info-button flex-fill d-flex align-items-center" style="background: white; color: var(--text-dark); padding: 1.25rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); border: 1px solid rgba(88, 97, 42, 0.15);" 
                                     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.12)'; this.style.borderColor='var(--primary-color)'" 
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(0, 0, 0, 0.08)'; this.style.borderColor='rgba(88, 97, 42, 0.15)'">
                                    <div class="me-3">
                                        <i class="bi bi-calendar3" style="font-size: 1.8rem; color: var(--primary-color);"></i>
                                    </div>
                                    <div class="flex-grow-1 text-start">
                                        <div style="font-weight: 600; font-size: 0.95rem; color: var(--primary-color); margin-bottom: 0.25rem;" data-en="When" data-fr="Quand">When</div>
                                        <div style="font-size: 0.9rem; color: var(--text-light);" data-en="Spring 2025" data-fr="Printemps 2025">Spring 2025</div>
                                    </div>
                                </div>
                                
                                <div class="info-button flex-fill d-flex align-items-center" style="background: white; color: var(--text-dark); padding: 1.25rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); border: 1px solid rgba(88, 97, 42, 0.15);" 
                                     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.12)'; this.style.borderColor='var(--primary-color)'" 
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(0, 0, 0, 0.08)'; this.style.borderColor='rgba(88, 97, 42, 0.15)'">
                                    <div class="me-3">
                                        <i class="bi bi-geo-alt" style="font-size: 1.8rem; color: var(--primary-color);"></i>
                                    </div>
                                    <div class="flex-grow-1 text-start">
                                        <div style="font-weight: 600; font-size: 0.95rem; color: var(--primary-color); margin-bottom: 0.25rem;" data-en="Where" data-fr="Où">Where</div>
                                        <div style="font-size: 0.9rem; color: var(--text-light);" data-en="Location to be announced" data-fr="Lieu à annoncer">Location to be announced</div>
                                    </div>
                                </div>
                                
                                <div class="info-button flex-fill d-flex align-items-center" style="background: white; color: var(--text-dark); padding: 1.25rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08); border: 1px solid rgba(88, 97, 42, 0.15);" 
                                     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.12)'; this.style.borderColor='var(--primary-color)'" 
                                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(0, 0, 0, 0.08)'; this.style.borderColor='rgba(88, 97, 42, 0.15)'">
                                    <div class="me-3">
                                        <i class="bi bi-people" style="font-size: 1.8rem; color: var(--primary-color);"></i>
                                    </div>
                                    <div class="flex-grow-1 text-start">
                                        <div style="font-weight: 600; font-size: 0.95rem; color: var(--primary-color); margin-bottom: 0.25rem;" data-en="Attendance" data-fr="Participation">Attendance</div>
                                        <div style="font-size: 0.9rem; color: var(--text-light);" data-en="Open to public" data-fr="Ouvert au public">Open to public</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Centered Get Updates Button -->
                <div class="row">
                    <div class="col-12 text-center">
                        <a href="#contact" class="btn btn-primary btn-lg px-5 py-3" data-en="Get Updates" data-fr="Recevoir les mises à jour">
                            <i class="bi bi-bell me-2"></i>Get Updates
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- CSCE Introduction -->
        <section class="section csce-intro-section" style="background: linear-gradient(135deg, rgba(88, 97, 42, 0.05) 0%, rgba(114, 103, 90, 0.05) 100%);">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-8 mx-auto text-center">
                        <div class="csce-intro-content">
                            <div class="intro-icon mb-4">
                                <div style="width: 80px; height: 4px; background: linear-gradient(90deg, var(--primary-color) 0%, var(--tertiary-color) 100%); margin: 0 auto; border-radius: 2px;"></div>
                            </div>
                            <h3 class="mb-4" style="color: var(--primary-color);" data-en="About the CSCE National History Committee" data-fr="À propos du Comité national d'histoire de la SCGC">
                                About the CSCE National History Committee
                            </h3>
                            <p class="lead mb-4" style="color: var(--text-dark); line-height: 1.6;" data-en="Since 1983, our National History Committee has been dedicated to increasing public and professional awareness of civil engineers and civil engineering as an integral part of Canadian history, heritage and society." 
                               data-fr="Depuis 1983, notre Comité national d'histoire se consacre à accroître la sensibilisation du public et des professionnels aux ingénieurs civils et au génie civil comme partie intégrante de l'histoire, du patrimoine et de la société canadienne.">
                                Since 1983, our National History Committee has been dedicated to increasing public and professional awareness of civil engineers and civil engineering as an integral part of Canadian history, heritage and society.
                            </p>
                            <div class="mt-4">
                                <a href="#about" class="btn btn-outline-primary btn-lg">
                                    <span data-en="Learn More About Our Work" data-fr="En savoir plus sur notre travail">Learn More About Our Work</span>
                                    <i class="bi bi-arrow-right ms-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}
