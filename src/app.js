// app.js

class Navbar {
    constructor(options) {
        this.options = options || [];
    }

    render() {
        const links = this.options.map(option =>
            `<a href="#${option.target}" class="navbar-link" data-target="${option.target}">${option.text}</a>`
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
    constructor() {
        this.githubUsername = 'osvalois';
        this.githubRepo = 'website';
    }

    async fetchCategories() {
        const response = await fetch(`https://api.github.com/repos/${this.githubUsername}/${this.githubRepo}/contents/posts`);
        const categories = await response.json();
        return categories.filter(item => item.type === 'dir');
    }

    async fetchFilesInCategory(categoryPath) {
        const response = await fetch(`https://api.github.com/repos/${this.githubUsername}/${this.githubRepo}/contents/${categoryPath}`);
        const files = await response.json();
        return files.filter(file => file.type === 'file' && file.name.endsWith('.md'));
    }

    async render() {
        const categories = await this.fetchCategories();
        return `
            <main class="container main-container">
                ${this.renderProfileSection()}
                ${await this.renderCategoriesSection(categories)}
                ${this.renderContactSection()}
            </main>`;
    }

    renderProfileSection() {
        return `
            <section id="profile" class="section">
                <h2>About Me</h2>
                <div class="card profile-card">
                    <img src="https://via.placeholder.com/150" alt="Oscar Valois" class="profile-image">
                    <div class="profile-info">
                        <p><strong>Name:</strong> Oscar Valois</p>
                        <p><strong>Role:</strong> Product Director</p>
                        <p><strong>Bio:</strong> Passionate about creating innovative solutions and leading high-performance teams.</p>
                        <p><strong>Skills:</strong> JavaScript, Ruby on Rails, UI/UX Design, Product Management</p>
                        <p><strong>Education:</strong> BS in Computer Science, University of Example</p>
                        <p><strong>Experience:</strong> 10+ years in software development and project management</p>
                    </div>
                </div>
            </section>`;
    }

    async renderCategoriesSection(categories) {
        const categoryItems = await Promise.all(categories.map(async category => {
            const files = await this.fetchFilesInCategory(category.path);
            const filesList = files.map(file => 
                `<li><a href="#" class="post-link" data-path="${file.path}">${file.name.replace('.md', '')}</a></li>`
            ).join('');
            return `
                <div class="category-card">
                    <h3>${category.name}</h3>
                    <ul class="post-list">
                        ${filesList || '<li>No posts found in this category.</li>'}
                    </ul>
                </div>`;
        }));

        return `
            <section id="categories" class="section">
                <h2>Categories</h2>
                <div class="categories-grid">
                    ${categoryItems.join('')}
                </div>
            </section>`;
    }

    renderContactSection() {
        return `
            <section id="contact" class="section">
                <h2>Get in Touch</h2>
                <div class="card contact-card">
                    <form class="contact-form" id="contact-form">
                        <input type="text" name="name" placeholder="Your Name" required>
                        <input type="email" name="email" placeholder="Your Email" required>
                        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
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
            `<a href="${option.href}" class="footer-link" target="_blank" rel="noopener noreferrer">${option.text}</a>`
        ).join('');
        return `
            <footer class="footer">
                <div class="container">
                    <p>&copy; ${new Date().getFullYear()} Oscar Valois. All rights reserved.</p>
                    <div class="footer-links">
                        ${links}
                    </div>
                </div>
            </footer>`;
    }
}

async function renderApp() {
    const navbar = new Navbar([
        { target: "profile", text: "About" },
        { target: "categories", text: "Categories" },
        { target: "contact", text: "Contact" }
    ]);

    const mainSection = new MainSection();
    const footer = new Footer([
        { text: 'Github', href: 'https://github.com/osvalois' },
        { text: 'Dockerhub', href: 'https://hub.docker.com/u/osvalois' },
        { text: 'Dev.to', href: 'https://dev.to/osvalois' }
    ]);

    const appElement = document.getElementById('app');
    appElement.innerHTML = `
        ${navbar.render()}
        ${await mainSection.render()}
        ${footer.render()}
    `;

    setupNavigation();
    setupContactForm();
    setupPostLinks(); // Agregado para configurar los enlaces de los posts dinámicamente
}

function setupNavigation() {
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-target');
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Activate the first section by default
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí típicamente enviarías los datos del formulario a un servidor
            // Por ahora, los mostraremos en la consola
            const formData = new FormData(form);
            console.log('Formulario enviado:', Object.fromEntries(formData));
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            form.reset();
        });
    }
}

function setupPostLinks() {
    document.querySelectorAll('.post-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const path = e.target.getAttribute('data-path');
            await fetchAndDisplayPost(path);
        });
    });
}

async function fetchAndDisplayPost(path) {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/osvalois/website/main/${path}`);
        const markdown = await response.text();
        const html = convertMarkdownToHtml(markdown);
        displayPost(html);
    } catch (error) {
        console.error('Error al cargar el post:', error);
        displayPost('<p>Error al cargar el post. Por favor, intenta nuevamente más tarde.</p>');
    }
}

function convertMarkdownToHtml(markdown) {
    // Este es un convertidor simple de Markdown a HTML
    // Para una solución más robusta, considera usar una biblioteca como marked.js
    return markdown
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, '<br />');
}

function displayPost(html) {
    const postContentElement = document.getElementById('post-content');
    postContentElement.innerHTML = html;
    postContentElement.style.display = 'block';

    // Ocultar otras secciones
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Desplazar hasta el contenido del post
    postContentElement.scrollIntoView({ behavior: 'smooth' });
}

renderApp();
