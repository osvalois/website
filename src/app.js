// app.js

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
    async fetchPosts() {
        const response = await fetch('https://api.github.com/repos/osvalois/website/contents/posts');
        const files = await response.json();
        const categories = {}; // Objeto para agrupar posts por categoría

        files.forEach(file => {
            const category = file.name.split('_')[0]; // Suponiendo que los archivos están nombrados como 'categoria_nombre_post.md'
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(file);
        });

        return categories;
    }

    async render() {
        const categories = await this.fetchPosts();
        return `
            <main class="container main-container">
                ${this.renderProfileSection()}
                ${this.renderCategories(categories)}
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

    renderCategories(categories) {
        const categoryItems = Object.keys(categories).map(category => {
            const posts = categories[category].map(post => `
                <li>
                    <a href="${post.html_url}" target="_blank">${post.name}</a>
                </li>`).join('');

            return `
                <section id="${category}" class="section">
                    <h2>${category}</h2>
                    <ul class="post-list">
                        ${posts}
                    </ul>
                </section>`;
        }).join('');

        return categoryItems;
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

async function renderApp() {
    const navbar = new Navbar([
        { href: "#profile", text: "About", target: "profile" },
        { href: "#contact", text: "Contact", target: "contact" }
    ]);

    const mainSection = new MainSection();
    const footer = new Footer([
        { text: 'Github', href: 'https://github.com/osvalois' },
        { text: 'Dockerhub', href: 'https://hub.docker.com/u/osvalois' },
        { text: 'Dev.to', href: 'https://dev.to/osvalois' }
    ]);

    document.getElementById('app').innerHTML = `
        ${navbar.render()}
        ${await mainSection.render()}
        ${footer.render()}
    `;

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
}

renderApp();
