// CSCE Historic Sites Application
class CSCEApp {
    constructor() {
        this.currentLang = 'en';
        this.sites = [];
        this.filteredSites = [];
        this.currentPage = 'home';

        this.init();
    }

    async init() {
        await this.loadSites();
        this.setupEventListeners();
        this.setupRouting();
        this.loadPage();

        // Initialize navbar state
        setTimeout(() => {
            this.handleNavbarScroll();
        }, 100);
    }

    async loadSites() {
        try {
            const response = await fetch('data/sites.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.sites = await response.json();
            this.filteredSites = this.sites;
        } catch (error) {
            console.error('Error loading sites data:', error);
            this.sites = [];
            this.filteredSites = [];
        }
    }

    setupEventListeners() {
        // Language toggle
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.loadPage();
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });

        // Set up navigation link handlers using event delegation
        this.setupNavigationLinks();
    }

    setupNavigationLinks() {
        // Navigation links, site cards, and images - set up event delegation
        document.addEventListener('click', (e) => {
            // Handle clickable images
            const clickableImage = e.target.closest('[data-image-src]');
            if (clickableImage) {
                const imageSrc = clickableImage.getAttribute('data-image-src');
                const imageCaption = clickableImage.getAttribute('data-image-caption');
                this.openImageModal(imageSrc, imageCaption);
                return;
            }

            // Handle navigation links
            const link = e.target.closest('a[href^="#"]');
            if (link && !e.defaultPrevented) {
                e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                this.navigateTo(page);
                return;
            }

            // Handle site card clicks
            const siteCard = e.target.closest('[data-site-id]');
            if (siteCard) {
                const siteId = siteCard.getAttribute('data-site-id');
                this.navigateTo(siteId);
                return;
            }
        });
    }

    setupRouting() {
        // Set initial page from URL hash
        const hash = window.location.hash.substring(1);
        this.currentPage = hash || 'home';

        // Check if it's a site detail page
        if (hash.startsWith('site-')) {
            this.currentSiteId = hash;
            this.currentPage = 'site-detail';
        }
    }

    navigateTo(page) {
        // Check if it's a site detail page
        if (page.startsWith('site-')) {
            this.currentSiteId = page;
            this.currentPage = 'site-detail';
        } else {
            this.currentPage = page;
            this.currentSiteId = null;
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
        this.loadPage();

        // Scroll to top
        window.scrollTo(0, 0);
    }

    updateActiveNavLink() {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Don't highlight nav for site detail pages
        if (!this.currentPage.startsWith('site-')) {
            const navLink = document.querySelector(`a[href="#${this.currentPage}"]`);
            if (navLink && navLink.classList.contains('nav-link')) {
                navLink.classList.add('active');
            }
        }

        // Update navbar styling based on current page
        this.updateNavbarStyling();
    }

    updateNavbarStyling() {
        const navbar = document.querySelector('.navbar');

        if (this.currentPage === 'home') {
            // Home page: transparent navbar
            navbar.classList.add('transparent');
            navbar.classList.remove('scrolled');
        } else {
            // Other pages: solid navbar
            navbar.classList.remove('transparent');
            navbar.classList.add('scrolled');
        }
    }

    async loadPage() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = '<div class="loading"><div class="spinner-border" role="status"></div></div>';

        // Ensure sites are loaded before rendering
        if (this.sites.length === 0) {
            await this.loadSites();
        }

        setTimeout(() => {
            switch (this.currentPage) {
                case 'home':
                    this.renderHomePage();
                    break;
                case 'about':
                    this.renderAboutPage();
                    break;
                case 'sites':
                    this.renderSitesPage();
                    break;
                case 'site-detail':
                    this.renderSiteDetailPage();
                    break;
                case 'partners':
                    this.renderPartnersPage();
                    break;
                case 'resources':
                    this.renderResourcesPage();
                    break;
                case 'contact':
                    this.renderContactPage();
                    break;
                default:
                    this.renderHomePage();
            }

            mainContent.classList.add('fade-in');
            this.updateLanguage();

            // Update active nav link and navbar styling after page load
            this.updateActiveNavLink();

            // Force navbar state update
            setTimeout(() => {
                this.updateNavbarStyling();
            }, 100);
        }, 300);
    }

    renderHomePage() {
        const featuredSites = this.sites
            .filter(site => site.isfeatured === true)
            .sort((a, b) => {
                // Sort by site ID number (extract number from site-XXX)
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
                                <span class="stat-number">${this.sites.filter(site => site.designation_type === 'International').length}</span>
                                <div class="stat-label" data-en="International Sites" data-fr="Sites internationaux">International Sites</div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="stat-item">
                                <span class="stat-number">${this.sites.filter(site => site.designation_type === 'National').length}</span>
                                <div class="stat-label" data-en="National Sites" data-fr="Sites nationaux">National Sites</div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="stat-item">
                                <span class="stat-number">${this.sites.filter(site => site.designation_type === 'Regional').length}</span>
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
                                         class="card-img-top" alt="${site.name[this.currentLang]}"
                                         onerror="this.src='https://via.placeholder.com/400x250/58612a/ffffff?text=Historic+Site'">
                                    <div class="card-body">
                                        <h5 class="card-title">${site.name[this.currentLang]}</h5>
                                        <p class="card-text">${site.description[this.currentLang].substring(0, 100)}...</p>
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

    async renderAboutPage() {
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
                                    <div class="stat-number h3 mb-0">${this.sites.filter(site => site.designation_type === 'International').length + this.sites.filter(site => site.designation_type === 'National').length + this.sites.filter(site => site.designation_type === 'Regional').length}</div>
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
                            <div class="card h-100 operation-card" style="cursor: pointer;" onclick="app.openOperationModal('site-identification')">
                                <div class="card-body text-center p-4">
                                    <div class="operation-icon mb-3">
                                        <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--secondary-color);"></i>
                                    </div>
                                    <h4 data-en="Site Identification" data-fr="Identification des sites">Site Identification</h4>
                                    <p data-en="We identify and commemorate civil engineering sites of important historical significance across Canada, marking each with an informative plaque." 
                                       data-fr="Nous identifions et commémorons les sites de génie civil d'importance historique significative à travers le Canada, marquant chacun avec une plaque informative.">
                                        We identify and commemorate civil engineering sites of important historical significance across Canada, marking each with an informative plaque.
                                    </p>
                                    <small class="text-muted"><i class="bi bi-info-circle me-1"></i>Click for details</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-4">
                            <div class="card h-100 operation-card" style="cursor: pointer;" onclick="app.openOperationModal('oral-history')">
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
                            <div class="card h-100 operation-card" style="cursor: pointer;" onclick="app.openOperationModal('publications')">
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
                            <div class="card h-100 operation-card" style="cursor: pointer;" onclick="app.openOperationModal('awards')">
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
                            <div class="card h-100 operation-card" style="cursor: pointer;" onclick="app.openOperationModal('preservation')">
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
                            <div class="card h-100 operation-card" style="cursor: pointer;" onclick="app.openOperationModal('education')">
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
                                            <h3 class="text-primary">${this.sites.filter(site => site.designation_type === 'National').length}</h3>
                                            <p class="mb-0" data-en="National Historic Sites" data-fr="Sites historiques nationaux">National Historic Sites</p>
                                        </div>
                                    </div>
                                    <div class="col-6 mb-3">
                                        <div class="impact-item">
                                            <h3 class="text-primary">${this.sites.filter(site => site.designation_type === 'International').length}</h3>
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

    renderSitesPage() {
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
                        ${this.renderSitesGrid()}
                    </div>
                </div>
            </section>
        `;

        this.setupSiteFilters();
        this.setupMapToggle();
    }

    renderSitesGrid() {
        return this.filteredSites.map(site => `
            <div class="col-lg-4 col-md-6 mb-4 site-item" data-category="${site.category}" data-region="${site.region}">
                <div class="card site-card h-100" data-site-id="${site.id}" style="cursor: pointer;">
                    <img src="${site.image}" 
                         class="card-img-top" alt="${site.name[this.currentLang]}"
                         onerror="this.src='https://via.placeholder.com/400x250/58612a/ffffff?text=Historic+Site'">
                    <div class="card-body">
                        <h5 class="card-title">${site.name[this.currentLang]}</h5>
                        <p class="card-text">${site.description[this.currentLang].substring(0, 120)}...</p>
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

    setupSiteFilters() {
        // Search functionality
        document.getElementById('siteSearch').addEventListener('input', (e) => {
            this.applyFilters();
        });

        // Region filter
        document.getElementById('regionFilter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Designation type filter
        document.getElementById('designationFilter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Category filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.applyFilters();
            });
        });
    }

    setupMapToggle() {
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
            if (!this.map) {
                this.initializeMap();
            }
        });
    }

    initializeMap() {
        // Initialize Leaflet map
        this.map = L.map('sitesMap').setView([56.1304, -106.3468], 4); // Center of Canada

        // Add neutral/grayscale tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors, © CARTO',
            maxZoom: 19
        }).addTo(this.map);

        // Add markers for each site
        this.sites.forEach(site => {
            if (site.coordinates) {
                const marker = L.marker([site.coordinates.lat, site.coordinates.lng])
                    .addTo(this.map)
                    .bindPopup(`
                        <div class="map-popup">
                            <h6>${site.name[this.currentLang]}</h6>
                            <p class="small">${site.location}</p>
                            <p class="small">${site.description[this.currentLang].substring(0, 100)}...</p>
                            <button class="btn btn-sm btn-primary" onclick="app.showSiteModal('${site.id}')">
                                ${this.currentLang === 'en' ? 'View Details' : 'Voir les détails'}
                            </button>
                        </div>
                    `);
            }
        });
    }



    applyFilters() {
        const searchTerm = document.getElementById('siteSearch')?.value.toLowerCase() || '';
        const selectedRegion = document.getElementById('regionFilter')?.value || 'all';
        const selectedDesignation = document.getElementById('designationFilter')?.value || 'all';
        const selectedCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

        this.filteredSites = this.sites.filter(site => {
            const matchesSearch = !searchTerm ||
                site.name[this.currentLang].toLowerCase().includes(searchTerm) ||
                site.description[this.currentLang].toLowerCase().includes(searchTerm) ||
                site.location.toLowerCase().includes(searchTerm);

            const matchesRegion = selectedRegion === 'all' || site.region === selectedRegion;
            const matchesDesignation = selectedDesignation === 'all' || site.designation_type === selectedDesignation;
            const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;

            return matchesSearch && matchesRegion && matchesDesignation && matchesCategory;
        });

        document.getElementById('sitesGrid').innerHTML = this.renderSitesGrid();
    }

    renderPartnersPage() {
        document.getElementById('mainContent').innerHTML = `
            <section class="section">
                <div class="container">
                    <h1 class="section-title" data-en="Partners" data-fr="Partenaires">Partners</h1>
                    <p class="section-subtitle" data-en="Organizations supporting the preservation of Canada's engineering heritage" 
                       data-fr="Organisations soutenant la préservation du patrimoine d'ingénierie du Canada">
                        Organizations supporting the preservation of Canada's engineering heritage
                    </p>
                    
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="card">
                                <div class="card-body p-5 text-center">
                                    <h3 data-en="Partner Organizations" data-fr="Organisations partenaires">Partner Organizations</h3>
                                    <p data-en="We work closely with various organizations to identify, preserve, and promote Canada's historic engineering sites." 
                                       data-fr="Nous travaillons en étroite collaboration avec diverses organisations pour identifier, préserver et promouvoir les sites d'ingénierie historiques du Canada.">
                                        We work closely with various organizations to identify, preserve, and promote Canada's historic engineering sites.
                                    </p>
                                    
                                    <div class="mt-4">
                                        <p data-en="For partnership opportunities, please contact us." data-fr="Pour les opportunités de partenariat, veuillez nous contacter.">
                                            For partnership opportunities, please contact us.
                                        </p>
                                        <a href="#contact" class="btn btn-primary" data-en="Contact Us" data-fr="Nous contacter">Contact Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async renderResourcesPage() {
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

        // Set up search and filter functionality
        this.setupResourcesFilters();
    }

    renderReportsPage() {
        document.getElementById('mainContent').innerHTML = `
            <section class="section">
                <div class="container">
                    <h1 class="section-title" data-en="Reports" data-fr="Rapports">Reports</h1>
                    <p class="section-subtitle" data-en="Annual reports and documentation of our historic sites program" 
                       data-fr="Rapports annuels et documentation de notre programme de sites historiques">
                        Annual reports and documentation of our historic sites program
                    </p>
                    
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="card">
                                <div class="card-body p-5">
                                    <h3 data-en="Available Reports" data-fr="Rapports disponibles">Available Reports</h3>
                                    <p data-en="Access our annual reports, site documentation, and research publications related to Canada's historic engineering sites." 
                                       data-fr="Accédez à nos rapports annuels, à la documentation des sites et aux publications de recherche liées aux sites d'ingénierie historiques du Canada.">
                                        Access our annual reports, site documentation, and research publications related to Canada's historic engineering sites.
                                    </p>
                                    
                                    <div class="list-group mt-4">
                                        <div class="list-group-item">
                                            <h5 data-en="Annual Report 2023" data-fr="Rapport annuel 2023">Annual Report 2023</h5>
                                            <p class="mb-1" data-en="Comprehensive overview of sites designated in 2023" data-fr="Aperçu complet des sites désignés en 2023">Comprehensive overview of sites designated in 2023</p>
                                        </div>
                                        <div class="list-group-item">
                                            <h5 data-en="Historic Sites Catalog" data-fr="Catalogue des sites historiques">Historic Sites Catalog</h5>
                                            <p class="mb-1" data-en="Complete listing of all designated historic sites" data-fr="Liste complète de tous les sites historiques désignés">Complete listing of all designated historic sites</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderContactPage() {
        document.getElementById('mainContent').innerHTML = `
            <section class="section">
                <div class="container">
                    <h1 class="section-title" data-en="Contact Us" data-fr="Nous contacter">Contact Us</h1>
                    
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="contact-form">
                                <form>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label" data-en="Name" data-fr="Nom">Name</label>
                                            <input type="text" class="form-control" required>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label" data-en="Email" data-fr="Courriel">Email</label>
                                            <input type="email" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" data-en="Subject" data-fr="Sujet">Subject</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" data-en="Message" data-fr="Message">Message</label>
                                        <textarea class="form-control" rows="5" required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary btn-lg" data-en="Send Message" data-fr="Envoyer le message">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mt-5">
                        <div class="col-md-4 text-center">
                            <i class="bi bi-envelope-fill text-primary" style="font-size: 2rem;"></i>
                            <h5 class="mt-3" data-en="Email" data-fr="Courriel">Email</h5>
                            <p>info@csce.ca</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <i class="bi bi-telephone-fill text-primary" style="font-size: 2rem;"></i>
                            <h5 class="mt-3" data-en="Phone" data-fr="Téléphone">Phone</h5>
                            <p>+1 (613) 232-2474</p>
                        </div>
                        <div class="col-md-4 text-center">
                            <i class="bi bi-geo-alt-fill text-primary" style="font-size: 2rem;"></i>
                            <h5 class="mt-3" data-en="Address" data-fr="Adresse">Address</h5>
                            <p>Ottawa, ON<br>Canada</p>
                        </div>
                    </div>
                    
                    <!-- Heritage Call-to-Action Section -->
                    <div class="row mt-5">
                        <div class="col-lg-10 mx-auto">
                            <div class="heritage-cta-section p-4 p-md-5 rounded-3" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-green) 100%); border: 1px solid rgba(255,255,255,0.1);">
                                <div class="text-center mb-4">
                                    <i class="bi bi-heart-fill text-white mb-3" style="font-size: 3rem; opacity: 0.9;"></i>
                                    <h3 class="text-white mb-3" data-en="Help Us Build Canada's Heritage" data-fr="Aidez-nous à construire le patrimoine du Canada">
                                        Help Us Build Canada's Heritage
                                    </h3>
                                </div>
                                <div class="text-center">
                                    <p class="text-white mb-0 lead" data-en="The Committee is always looking for information on anything relevant to Canada's Civil Engineering History and members of the Society and other visitors to this Web Site are encouraged to contact the Committee to pass on any such items or to suggest possible Historic Sites for commemoration." data-fr="Le Comité recherche toujours des informations sur tout ce qui concerne l'histoire du génie civil du Canada et les membres de la Société et autres visiteurs de ce site Web sont encouragés à contacter le Comité pour transmettre de tels éléments ou suggérer des sites historiques possibles pour commémoration.">
                                        The Committee is always looking for information on anything relevant to Canada's Civil Engineering History and members of the Society and other visitors to this Web Site are encouraged to contact the Committee to pass on any such items or to suggest possible Historic Sites for commemoration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'fr' : 'en';
        document.getElementById('currentLang').textContent = this.currentLang.toUpperCase();
        document.getElementById('otherLang').textContent = this.currentLang === 'en' ? 'FR' : 'EN';
        this.updateLanguage();
        this.loadPage(); // Reload current page with new language
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const scrolled = window.scrollY > 50;

        if (this.currentPage === 'home') {
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

    updateLanguage() {
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });

        document.querySelectorAll('[data-en-placeholder]').forEach(element => {
            const placeholder = element.getAttribute(`data-${this.currentLang}-placeholder`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Update document language
        document.documentElement.lang = this.currentLang;
    }

    renderSiteDetailPage() {
        const site = this.sites.find(s => s.id === this.currentSiteId);

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
                                    <li class="breadcrumb-item active text-light" aria-current="page">${site.name[this.currentLang]}</li>
                                </ol>
                            </nav>
                            <h1 class="display-4 text-white mb-3">${site.name[this.currentLang]}</h1>
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
                                    <p class="lead">${site.description[this.currentLang]}</p>
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
                                        ${this.formatTextContent(site.detailed_description[this.currentLang])}
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
                                         alt="${site.name[this.currentLang]} - Main View"
                                         style="border-radius: 0.375rem; cursor: pointer; max-height: 400px; object-fit: cover;"
                                         data-image-src="${site.images.hero}" data-image-caption="${site.name[this.currentLang]} - Main View"
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
                                        ${this.formatTextContent(site.historic_significance[this.currentLang])}
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
                                        ${this.formatTextContent(site.plaque_description[this.currentLang])}
                                    </div>
                                    ${site.plaque_location ? `
                                    <div class="plaque-location-details mt-4">
                                        <h5 data-en="Plaque Location" data-fr="Emplacement de la plaque">Plaque Location</h5>
                                        <p>${site.plaque_location[this.currentLang]}</p>
                                    </div>
                                    ` : ''}
                                    ${site.plaque_unveiling ? `
                                    <div class="plaque-unveiling-details mt-4">
                                        <h5 data-en="Plaque Unveiling Ceremony" data-fr="Cérémonie de dévoilement de la plaque">Plaque Unveiling Ceremony</h5>
                                        <p>${site.plaque_unveiling[this.currentLang]}</p>
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
                                                    ${link.title[this.currentLang]}
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
                                    <p>${site.acknowledgments[this.currentLang]}</p>
                                </div>
                            </div>
                            ` : ''}
                        </div>

                        <!-- Sidebar -->
                        <div class="col-lg-4">
                            <!-- Image Gallery -->
                            ${site.images?.gallery && site.images.gallery.length > 0 ? `
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0" data-en="Photo Gallery" data-fr="Galerie de photos">Photo Gallery</h5>
                                </div>
                                <div class="card-body p-0">
                                    <div id="siteCarousel" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            ${site.images.gallery.map((image, index) => {
            // Handle both old format (string) and new format (object with caption)
            const imageSrc = typeof image === 'string' ? image : image.src;
            const imageCaption = typeof image === 'object' && image.caption ? image.caption[this.currentLang] : '';

            return `
                                                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                                    <img src="${imageSrc}" class="d-block w-100 clickable-image" alt="Site Image ${index + 1}"
                                                         onerror="this.src='https://via.placeholder.com/400x300/58612a/ffffff?text=Image+${index + 1}'"
                                                         style="height: 250px; object-fit: cover; cursor: pointer;"
                                                         data-image-src="${imageSrc}" data-image-caption="${imageCaption || 'Site Image ' + (index + 1)}">
                                                    ${imageCaption ? `
                                                    <div class="carousel-caption d-block">
                                                        <div class="caption-overlay">
                                                            <p class="mb-0 small">${imageCaption}</p>
                                                        </div>
                                                    </div>
                                                    ` : ''}
                                                </div>
                                                `;
        }).join('')}
                                        </div>
                                        ${site.images.gallery.length > 1 ? `
                                        <button class="carousel-control-prev" type="button" data-bs-target="#siteCarousel" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#siteCarousel" data-bs-slide="next">
                                            <span class="carousel-control-next-icon"></span>
                                        </button>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            ` : ''}

                            <!-- Quick Info -->
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0" data-en="Quick Information" data-fr="Informations rapides">Quick Information</h5>
                                </div>
                                <div class="card-body">
                                    <div class="mb-3">
                                        <small class="text-muted" data-en="Location" data-fr="Emplacement">Location</small><br>
                                        <strong>${site.location}</strong>
                                    </div>
                                    <div class="mb-3">
                                        <small class="text-muted" data-en="Region" data-fr="Région">Region</small><br>
                                        <strong>${site.region}</strong>
                                    </div>
                                    <div class="mb-3">
                                        <small class="text-muted" data-en="Category" data-fr="Catégorie">Category</small><br>
                                        <strong>${site.category.charAt(0).toUpperCase() + site.category.slice(1)}</strong>
                                    </div>
                                    <div class="mb-3">
                                        <small class="text-muted" data-en="Completed" data-fr="Achevé">Completed</small><br>
                                        <strong>${site.year}</strong>
                                    </div>
                                </div>
                            </div>

                            <!-- Map -->
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0" data-en="Location Map" data-fr="Carte de localisation">Location Map</h5>
                                </div>
                                <div class="card-body p-0">
                                    <div id="siteDetailMap" style="height: 250px;"></div>
                                </div>
                            </div>

                            <!-- Site Location -->
                            ${site.site_location ? `
                            <div class="card mb-4">
                                <div class="card-header">
                                    <h5 class="mb-0" data-en="Site Location" data-fr="Emplacement du site">Site Location</h5>
                                </div>
                                <div class="card-body">
                                    <div class="site-location-content">
                                        ${this.formatTextContent(site.site_location[this.currentLang])}
                                    </div>
                                </div>
                            </div>
                            ` : ''}
                                </div>
                            </div>
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
                                ${this.getNextPrevSiteButtons(site.id)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Initialize the detail map
        setTimeout(() => {
            this.initializeSiteDetailMap(site);
        }, 100);
    }

    getNextPrevSiteButtons(currentSiteId) {
        const currentIndex = this.sites.findIndex(s => s.id === currentSiteId);
        const prevSite = currentIndex > 0 ? this.sites[currentIndex - 1] : null;
        const nextSite = currentIndex < this.sites.length - 1 ? this.sites[currentIndex + 1] : null;

        let buttons = '';

        if (prevSite) {
            buttons += `
                <a href="#${prevSite.id}" class="btn btn-outline-secondary me-2">
                    <i class="bi bi-chevron-left me-1"></i>
                    <span data-en="Previous Site" data-fr="Site précédent">Previous Site</span>
                </a>
            `;
        }

        if (nextSite) {
            buttons += `
                <a href="#${nextSite.id}" class="btn btn-outline-secondary">
                    <span data-en="Next Site" data-fr="Site suivant">Next Site</span>
                    <i class="bi bi-chevron-right ms-1"></i>
                </a>
            `;
        }

        return buttons ? `<div>${buttons}</div>` : '';
    }


    // Helper function to format text content using Bootstrap components
    formatTextContent(text) {
        if (!text) return '';

        // Split by double line breaks to create sections
        const sections = text.split('\n\n');
        let result = [];
        let i = 0;

        while (i < sections.length) {
            const section = sections[i].trim();

            // Skip empty sections
            if (!section) {
                i++;
                continue;
            }

            // Check if it's a heading (starts with ** and ends with **)
            if (section.startsWith('**') && section.endsWith('**')) {
                const heading = section.replace(/^\*\*|\*\*$/g, '').trim();

                // Look for content in the next section
                let content = '';
                if (i + 1 < sections.length) {
                    const nextSection = sections[i + 1].trim();
                    // If next section is not a heading, it's content for this heading
                    if (!nextSection.startsWith('**') || !nextSection.endsWith('**')) {
                        content = nextSection;
                        i++; // Skip the content section in next iteration
                    }
                }

                result.push(`
                    <div class="content-section mb-4">
                        <h5 class="section-heading">${heading}</h5>
                        ${content ? `<p class="section-content">${content.replace(/\n/g, '<br>')}</p>` : ''}
                    </div>
                `);
            } else {
                // Check for simple bullet points (only use when really needed)
                const lines = section.split('\n');
                const hasBullets = lines.length > 1 && lines.every(line => line.trim().match(/^[•\-\*]/));

                if (hasBullets) {
                    const listItems = lines
                        .filter(line => line.trim())
                        .map(line => {
                            const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
                            return `<li class="mb-2">${cleanLine}</li>`;
                        })
                        .join('');
                    result.push(`<ul class="list-unstyled ps-3 mb-3">${listItems}</ul>`);
                } else {
                    // Regular paragraph with line break support
                    result.push(`<p class="mb-3">${section.replace(/\n/g, '<br>')}</p>`);
                }
            }

            i++;
        }

        return result.join('');
    }

    // Function to open image modal
    openImageModal(imageSrc, caption) {
        // Remove existing modal if any
        const existingModal = document.getElementById('imageModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal HTML
        const modalHTML = `
            <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <img src="${imageSrc}" class="img-fluid w-100" alt="${caption}" style="max-height: 70vh; object-fit: contain;">
                        </div>
                        ${caption ? `
                        <div class="modal-footer border-0 pt-2">
                            <div class="w-100 text-center">
                                <small class="text-muted">${caption}</small>
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show();

        // Remove modal from DOM when hidden
        document.getElementById('imageModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    }

    // Update the map initialization to use neutral colors
    initializeSiteDetailMap(site) {
        if (!site.coordinates) return;

        // Initialize map with neutral/grayscale style
        const map = L.map('siteDetailMap').setView([site.coordinates.lat, site.coordinates.lng], 13);

        // Use CartoDB Positron (light, neutral) tiles instead of default OpenStreetMap
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors, © CARTO',
            maxZoom: 19
        }).addTo(map);

        // Add marker for the site
        const marker = L.marker([site.coordinates.lat, site.coordinates.lng])
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <h6>${site.name[this.currentLang]}</h6>
                    <p class="small mb-0">${site.location}</p>
                </div>
            `);

        // Open popup by default
        marker.openPopup();

        return map;
    }

    // Set up resources page filters
    setupResourcesFilters() {
        const searchInput = document.getElementById('publicationSearch');
        const categoryFilter = document.getElementById('categoryFilter');

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.filterPublications();
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterPublications();
            });
        }
    }

    filterPublications() {
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

    // Function to open operation detail modal
    openOperationModal(operationType) {
        const operationData = {
            'site-identification': {
                title: 'Historic Civil Engineering Site Identification',
                icon: 'bi-geo-alt-fill',
                content: `
                    <p class="lead">We identify and commemorate civil engineering works of historic significance across Canada through a rigorous selection and documentation process.</p>
                    
                    <h5><i class="bi bi-search me-2"></i>Selection Criteria</h5>
                    <p>Sites must demonstrate historic civil engineering significance through their purpose, design concept, and utility. Key requirements include:</p>
                    <ul>
                        <li><strong>Historic Significance:</strong> Features must be at least 50 years old</li>
                        <li><strong>Outstanding Achievement:</strong> First of its kind, oldest extant, or significant contribution to engineering practice</li>
                        <li><strong>Public Access:</strong> Generally open to public viewing with suitable plaque placement</li>
                        <li><strong>National or Regional Impact:</strong> Clear contribution to country or professional development</li>
                    </ul>
                    
                    <h5><i class="bi bi-award me-2"></i>Three Designation Levels</h5>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="designation-card p-3 text-center" style="background: rgba(226, 39, 38, 0.1); border-radius: 0.5rem;">
                                <strong style="color: var(--secondary-color);">International</strong>
                                <p class="small mb-0 mt-2">Joint recognition with sister societies like ASCE</p>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="designation-card p-3 text-center" style="background: rgba(88, 97, 42, 0.1); border-radius: 0.5rem;">
                                <strong style="color: var(--primary-color);">National</strong>
                                <p class="small mb-0 mt-2">Nationally significant engineering achievements</p>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="designation-card p-3 text-center" style="background: rgba(114, 103, 90, 0.1); border-radius: 0.5rem;">
                                <strong style="color: var(--tertiary-color);">Regional</strong>
                                <p class="small mb-0 mt-2">Locally or regionally significant sites</p>
                            </div>
                        </div>
                    </div>
                    
                    <h5><i class="bi bi-calendar-event me-2"></i>Commemoration Process</h5>
                    <p>Each designated site receives a bronze commemorative plaque with bilingual information about its significance. We organize formal unveiling ceremonies that bring together dignitaries, local communities, and engineering professionals to celebrate these achievements.</p>
                `
            },
            'oral-history': {
                title: 'Oral History Program',
                icon: 'bi-mic-fill',
                content: `
                    <p class="lead">Since 1992, we've been recording interviews with distinguished civil engineers to preserve their knowledge, experiences, and insights for future generations.</p>
                    
                    <h5><i class="bi bi-people me-2"></i>Notable Interviews Completed</h5>
                    <p>Our oral history collection includes interviews with prominent engineers such as:</p>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><i class="bi bi-mic me-2 text-primary"></i>Hugh Adcock</li>
                                <li><i class="bi bi-mic me-2 text-primary"></i>Alan Davenport</li>
                                <li><i class="bi bi-mic me-2 text-primary"></i>Roger Dorton</li>
                                <li><i class="bi bi-mic me-2 text-primary"></i>James W. MacLaren</li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list-unstyled">
                                <li><i class="bi bi-mic me-2 text-primary"></i>Cam McNab</li>
                                <li><i class="bi bi-mic me-2 text-primary"></i>Harry A. Tregaskes</li>
                                <li><i class="bi bi-mic me-2 text-primary"></i>Douglas Wright</li>
                                <li><i class="bi bi-mic me-2 text-primary"></i>Robert F. Legget</li>
                            </ul>
                        </div>
                    </div>
                    
                    <h5><i class="bi bi-gear me-2"></i>Our Process</h5>
                    <p>We carefully select engineers who have had careers of particular interest to future engineering historians, typically conducting interviews toward the end of their careers. Our approach ensures:</p>
                    <ul>
                        <li><strong>Geographic Balance:</strong> Representation from across Canada</li>
                        <li><strong>Disciplinary Diversity:</strong> Coverage of various civil engineering specialties</li>
                        <li><strong>Professional Standards:</strong> Experienced interviewers and quality recording equipment</li>
                        <li><strong>Permanent Archive:</strong> Recordings preserved at National Archives and made available online</li>
                    </ul>
                    
                    <h5><i class="bi bi-mortarboard me-2"></i>Student Scholarship</h5>
                    <p>We've established an Oral History Student Scholarship to encourage the next generation of engineers to engage with our profession's history and contribute to this important preservation work.</p>
                `
            },
            'publications': {
                title: 'Publications & Research',
                icon: 'bi-book-fill',
                content: `
                    <p class="lead">We actively contribute to civil engineering literature through regular publications, books, and scholarly articles that document and celebrate our profession's history.</p>
                    
                    <h5><i class="bi bi-journal-text me-2"></i>Regular Publications</h5>
                    <ul>
                        <li><strong>'History Notes':</strong> Regular inserts in the Society's bi-monthly 'Canadian Civil Engineer' magazine</li>
                        <li><strong>Technical Papers:</strong> Presentations at Annual General Meetings and professional conferences</li>
                        <li><strong>Journal Articles:</strong> Contributions to 'Canadian Journal of Civil Engineering' and 'Canadian Consulting Engineer'</li>
                    </ul>
                    
                    <h5><i class="bi bi-book me-2"></i>Notable Books</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="book-highlight p-3" style="background: var(--bg-light); border-radius: 0.5rem;">
                                <h6><strong>'A Civil Society'</strong></h6>
                                <p class="small mb-0">by Peter Hart - A comprehensive history of the Canadian Society for Civil Engineering</p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="book-highlight p-3" style="background: var(--bg-light); border-radius: 0.5rem;">
                                <h6><strong>'For King and Country'</strong></h6>
                                <p class="small mb-0">by Mark Andrews - Biography of Lt. Col. John By, builder of the Rideau Canal</p>
                            </div>
                        </div>
                    </div>
                    
                    <h5><i class="bi bi-tools me-2"></i>Current Projects</h5>
                    <p>Our committee members are actively working on several important publications:</p>
                    <ul>
                        <li><strong>National Historic Sites Book:</strong> Comprehensive documentation of all designated sites</li>
                        <li><strong>Biographical Directory:</strong> Canadian Civil Engineers throughout history</li>
                        <li><strong>Bibliography:</strong> Complete reference guide to Canadian Civil Engineering literature</li>
                    </ul>
                    
                    <h5><i class="bi bi-search me-2"></i>Research Activities</h5>
                    <p>We conduct both physical research to identify artifacts of interest and academic research into early Canadian civil engineering history, contributing to the broader understanding of our profession's development and impact on Canadian society.</p>
                `
            },
            'awards': {
                title: 'W. Gordon Plewes Award',
                icon: 'bi-award-fill',
                content: `
                    <p class="lead">Established in 1992 and renamed in 1996, the W. Gordon Plewes Award honors individuals who have made exceptional contributions to the study and understanding of civil engineering history in Canada.</p>
                    
                    <h5><i class="bi bi-person-heart me-2"></i>About Gordon Plewes</h5>
                    <p>The award commemorates the late W. Gordon Plewes, who originated the Society's History Program in 1982 and served as the first chair of the National History Committee from 1982-1985. His vision and dedication laid the foundation for all our current activities.</p>
                    
                    <h5><i class="bi bi-trophy me-2"></i>Award Criteria</h5>
                    <p>Recipients are selected based on their noteworthy contributions to civil engineering history through:</p>
                    <ul>
                        <li><strong>Quality Publications:</strong> Books, articles, and research that advance understanding</li>
                        <li><strong>Leadership:</strong> Promoting increased awareness of civil engineering history</li>
                        <li><strong>Impact:</strong> Significant influence on the field of engineering history</li>
                    </ul>
                    <p><em>Note: Recipients need not be CSCE members or even engineers - we recognize excellence wherever it occurs.</em></p>
                    
                    <h5><i class="bi bi-calendar-check me-2"></i>Recent Recipients</h5>
                    <div class="recipients-grid">
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="list-unstyled">
                                    <li><strong>2017:</strong> Siobhan Roberts, Toronto, ON</li>
                                    <li><strong>2010:</strong> Teresa Charland, Ottawa, ON</li>
                                    <li><strong>2009:</strong> Roberta M. Styran, St. Catharines, ON</li>
                                    <li><strong>2006:</strong> Richard Wallace White, Toronto, ON</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="list-unstyled">
                                    <li><strong>2005:</strong> Ralph Crysler, Oakville, ON</li>
                                    <li><strong>2004:</strong> Jerry Disher, Hamilton, ON</li>
                                    <li><strong>2003:</strong> Andrew H. Wilson, Ottawa, ON</li>
                                    <li><strong>2002:</strong> Michel L'Hebreux, Saint-Romuald, QC</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <h5><i class="bi bi-gear-fill me-2"></i>Selection Process</h5>
                    <p>Awards are typically presented every second year. The selection committee, consisting of the National History Committee chair and at least two other committee members, forwards recommendations to the Society's Honours and Fellowships Committee for final approval.</p>
                `
            },
            'preservation': {
                title: 'Historic Preservation & Advocacy',
                icon: 'bi-shield-fill-check',
                content: `
                    <p class="lead">We work closely with national and local organizations to encourage the preservation of historic civil engineering works and ensure public access to these important sites.</p>
                    
                    <h5><i class="bi bi-people-fill me-2"></i>Collaborative Approach</h5>
                    <p>Our preservation efforts involve partnerships with:</p>
                    <ul>
                        <li><strong>Parks Canada:</strong> National historic site designations and maintenance</li>
                        <li><strong>Provincial Heritage Organizations:</strong> Regional preservation initiatives</li>
                        <li><strong>Local Historical Societies:</strong> Community-based conservation efforts</li>
                        <li><strong>Museums and Archives:</strong> Document and artifact preservation</li>
                        <li><strong>Engineering Institute of Canada:</strong> Professional archives and records</li>
                    </ul>
                    
                    <h5><i class="bi bi-tools me-2"></i>Our Services</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="service-card p-3" style="background: var(--bg-light); border-radius: 0.5rem;">
                                <h6><i class="bi bi-clipboard-data me-2"></i>Expert Advice</h6>
                                <p class="small mb-0">Technical guidance on preservation methods and historical significance assessment</p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card p-3" style="background: var(--bg-light); border-radius: 0.5rem;">
                                <h6><i class="bi bi-archive me-2"></i>Documentation</h6>
                                <p class="small mb-0">Comprehensive research and archival documentation of historic works</p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card p-3" style="background: var(--bg-light); border-radius: 0.5rem;">
                                <h6><i class="bi bi-megaphone me-2"></i>Advocacy</h6>
                                <p class="small mb-0">Public awareness campaigns and heritage designation support</p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="service-card p-3" style="background: var(--bg-light); border-radius: 0.5rem;">
                                <h6><i class="bi bi-collection me-2"></i>Artifact Care</h6>
                                <p class="small mb-0">Guidance on preserving engineering documents, plans, and artifacts</p>
                            </div>
                        </div>
                    </div>
                    
                    <h5><i class="bi bi-exclamation-triangle me-2"></i>Endangered Sites</h5>
                    <p>We actively monitor the condition of designated historic sites and work with owners and authorities when preservation challenges arise. Our goal is to ensure these important engineering achievements remain accessible to future generations.</p>
                    
                    <h5><i class="bi bi-globe me-2"></i>Public Access</h5>
                    <p>We believe historic engineering sites should be accessible to the public whenever possible. We work with site owners to develop interpretive materials, improve access, and create educational opportunities that help people understand the significance of these remarkable achievements.</p>
                `
            },
            'education': {
                title: 'Education & Outreach',
                icon: 'bi-mortarboard-fill',
                content: `
                    <p class="lead">We actively promote awareness of civil engineering history through lectures, presentations, and educational initiatives targeting students, professionals, and the general public.</p>
                    
                    <h5><i class="bi bi-presentation me-2"></i>Speaking Engagements</h5>
                    <p>Our committee members regularly provide presentations at:</p>
                    <ul>
                        <li><strong>CSCE Section Meetings:</strong> Regional professional gatherings</li>
                        <li><strong>Student Conferences:</strong> University and college engineering events</li>
                        <li><strong>Student Chapter Meetings:</strong> Campus-based engineering societies</li>
                        <li><strong>Public Forums:</strong> Community historical societies and heritage organizations</li>
                        <li><strong>Professional Conferences:</strong> National and international engineering meetings</li>
                    </ul>
                    
                    <h5><i class="bi bi-book-half me-2"></i>Curriculum Development</h5>
                    <p>In partnership with the North American Alliance on Civil Engineering, we're exploring ways to integrate civil engineering history into engineering school curricula. This initiative aims to:</p>
                    <ul>
                        <li>Help students understand the evolution of their profession</li>
                        <li>Provide context for modern engineering challenges</li>
                        <li>Inspire appreciation for engineering heritage</li>
                        <li>Connect current practice with historical achievements</li>
                    </ul>
                    
                    <h5><i class="bi bi-people me-2"></i>Target Audiences</h5>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="audience-card p-3 text-center" style="background: rgba(88, 97, 42, 0.1); border-radius: 0.5rem;">
                                <i class="bi bi-mortarboard" style="font-size: 2rem; color: var(--primary-color);"></i>
                                <h6 class="mt-2"><strong>Engineering Students</strong></h6>
                                <p class="small mb-0">Future professionals learning about their field's heritage</p>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="audience-card p-3 text-center" style="background: rgba(226, 39, 38, 0.1); border-radius: 0.5rem;">
                                <i class="bi bi-gear-fill" style="font-size: 2rem; color: var(--secondary-color);"></i>
                                <h6 class="mt-2"><strong>Professional Engineers</strong></h6>
                                <p class="small mb-0">Practicing engineers expanding their historical knowledge</p>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="audience-card p-3 text-center" style="background: rgba(114, 103, 90, 0.1); border-radius: 0.5rem;">
                                <i class="bi bi-people-fill" style="font-size: 2rem; color: var(--tertiary-color);"></i>
                                <h6 class="mt-2"><strong>General Public</strong></h6>
                                <p class="small mb-0">Citizens interested in Canada's engineering heritage</p>
                            </div>
                        </div>
                    </div>
                    
                    <h5><i class="bi bi-lightbulb me-2"></i>Educational Impact</h5>
                    <p>Our educational initiatives help people understand how civil engineering has shaped Canadian society, from the railways that connected our nation to the bridges that span our rivers. By sharing these stories, we inspire appreciation for engineering achievements and encourage the next generation of civil engineers.</p>
                `
            }
        };

        const data = operationData[operationType];
        if (!data) return;

        // Remove existing modal if any
        const existingModal = document.getElementById('operationModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal HTML
        const modalHTML = `
            <div class="modal fade" id="operationModal" tabindex="-1" aria-labelledby="operationModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header" style="background: var(--primary-color); color: white;">
                            <h5 class="modal-title" id="operationModalLabel">
                                <i class="bi ${data.icon} me-2"></i>${data.title}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${data.content}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="#resources" class="btn btn-primary" data-bs-dismiss="modal">
                                <i class="bi bi-download me-2"></i>View Resources
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('operationModal'));
        modal.show();

        // Remove modal from DOM when hidden
        document.getElementById('operationModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    }
}

// Initialize the application
const app = new CSCEApp();