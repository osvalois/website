class Navbar {
    constructor(options) {
        this.options = options || [];
    }

    render() {
        const links = this.options.map(option =>
            `<a href="${option.href}" class="navbar-link" data-target="${option.target}">${option.text}</a>`
        ).join('');
        return `
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="/" class="navbar-logo">Oscar Valois</a>
                    <div class="navbar-links">
                        ${links}
                    </div>
                </div>
            </nav>`;
    }
}

class MainSection {
    render() {
        return `
            <main class="container main-container">
                ${this.renderProfileSection()}
                ${this.renderLatestPostsSection()}
                ${this.renderContactSection()}
            </main>`;
    }

    renderProfileSection() {
        return `
            <section id="profile" class="section hidden">
                <h2>About Me</h2>
                <div class="card">
                    <p><strong>Name:</strong> Oscar Valois</p>
                    <p><strong>Role:</strong> Product Director</p>
                    <p><strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo eget nisi et interdum. Fusce gravida lacinia velit, non consequat quam feugiat id.</p>
                    <p><strong>Skills:</strong> JavaScript, Ruby on Rails, UI/UX Design</p>
                    <p><strong>Education:</strong> BS in Computer Science, University of Example</p>
                    <p><strong>Experience:</strong> 10+ years in software development and project management</p>
                </div>
            </section>`;
    }

    renderLatestPostsSection() {
        return `
            <section id="posts" class="section">
                <h2>Latest Posts</h2>
                <ul class="post-list">
                    <li><a href="#">Innovative Approaches in Solution Architecture</a></li>
                    <li><a href="#">The Future of Secure Development Practices</a></li>
                    <li><a href="#">Effective Project Management in the Digital Age</a></li>
                </ul>
            </section>`;
    }

    renderContactSection() {
        return `
            <section id="contact" class="section hidden">
                <h2>Get in Touch</h2>
                <div class="card">
                    <form class="contact-form">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </section>`;
    }
}

class Footer {
    constructor(options) {
        this.options = options || [];
    }

    render() {
        const links = this.options.map(option =>
            `<a href="${option.href}" class="footer-link">${option.text}</a>`
        ).join('');
        return `
            <footer class="footer">
                <p>&copy; 2024 Oscar Valois. All rights reserved.</p>
                <div class="footer-links">
                    ${links}
                </div>
            </footer>`;
    }
}

// Instanciación de componentes y renderización en el DOM
const navbar = new Navbar([
    { href: "#profile", text: "About", target: "profile" },
    { href: "#posts", text: "Posts", target: "posts" },
    { href: "#contact", text: "Contact", target: "contact" }
]);

const mainSection = new MainSection();
const footer = new Footer([
    { text: 'Github', href: 'https://github.com/osvalois' },
    { text: 'Dockerhub', href: 'https://hub.docker.com/u/osvalois' },
    { text: 'Dev.to', href: 'https://dev.to/osvalois' }
]);

// Rendering in the DOM
document.getElementById('app').innerHTML = `
    ${navbar.render()}
    ${mainSection.render()}
    ${footer.render()}
`;

// Adding event listeners for menu clicks
document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('data-target');
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('fade-in');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('fade-in');
        }
    });
});
