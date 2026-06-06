// Modal Dialog Management

export function openImageModal(imageSrc, caption) {
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

export function openOperationModal(operationType) {
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
