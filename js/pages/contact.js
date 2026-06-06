export function renderContactPage() {
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
