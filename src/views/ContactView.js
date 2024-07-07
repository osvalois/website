export class ContactView {
    render() {
        return Promise.resolve(`
            <h2>Get in Touch</h2>
            <div class="card contact-card">
                <form class="contact-form" id="contact-form">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>`);
    }
}
