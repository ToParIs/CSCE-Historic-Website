export function renderPartnersPage() {
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
