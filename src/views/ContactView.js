export class ContactView {
    render() {
        return Promise.resolve(`
        <style>
        @import url('public/styles/contact-section.css');
        </style>
        <section class="contact-section">
            <h2 class="contact-title">Get in Touch</h2>
            <div class="card contact-card">
                <form class="contact-form" id="contact-form">
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder=" " required>
                        <label for="name">Your Name</label>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder=" " required>
                        <label for="email">Your Email</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" placeholder=" " rows="5" required></textarea>
                        <label for="message">Your Message</label>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </section>`);
    }
}