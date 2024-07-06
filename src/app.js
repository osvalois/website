// app.js

// Estado global de la aplicación
const createState = (initialState) => {
    const listeners = new Set();
    const state = new Proxy(initialState, {
        set: (target, property, value) => {
            target[property] = value;
            listeners.forEach(listener => listener());
            return true;
        }
    });

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return { state, subscribe };
};

const { state, subscribe } = createState({
    currentSection: 'profile',
    categories: [],
    currentPost: null,
});

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
        state.categories = categories;
        return `
            <main class="container main-container">
                ${this.renderProfileSection()}
                ${await this.renderCategoriesSection()}
                ${this.renderContactSection()}
                <div id="post-content"></div>
            </main>`;
    }

    renderProfileSection() {
        return `
            <section id="profile" class="section ${state.currentSection === 'profile' ? 'active' : ''}">
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

    async renderCategoriesSection() {
        const categoryItems = await Promise.all(state.categories.map(async category => {
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
            <section id="categories" class="section ${state.currentSection === 'categories' ? 'active' : ''}">
                <h2>Categories</h2>
                <div class="categories-grid">
                    ${categoryItems.join('')}
                </div>
            </section>`;
    }

    renderContactSection() {
        return `
            <section id="contact" class="section ${state.currentSection === 'contact' ? 'active' : ''}">
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
    setupPostLinks();
    updateUI(); // Llamamos a updateUI después de renderizar el contenido inicial
}

function setupNavigation() {
    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-target');
            state.currentSection = targetId;
            state.currentPost = null;
            updateUI();
        });
    });
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
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
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const markdown = await response.text();
        const html = convertMarkdownToHtml(markdown);
        const postTitle = path.split('/').pop().replace('.md', '');
        state.currentPost = { html, title: postTitle };
        state.currentSection = 'post';
        updateUI();
    } catch (error) {
        console.error('Error al cargar el post:', error);
        state.currentPost = { html: '<p>Error al cargar el post. Por favor, intenta nuevamente más tarde.</p>', title: 'Error' };
        state.currentSection = 'post';
        updateUI();
    }
}

function convertMarkdownToHtml(markdown) {
    return marked.parse(markdown);
}

function updateUI() {
    const sections = document.querySelectorAll('.section');
    const postContent = document.getElementById('post-content');

    if (sections.length === 0 || !postContent) {
        // Si los elementos aún no están en el DOM, no hacemos nada
        return;
    }

    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    if (state.currentSection === 'post' && state.currentPost) {
        postContent.innerHTML = `
            <div class="breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${state.currentPost.title}</span>
            </div>
            <button class="back-button" aria-label="Go back">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </button>
            ${state.currentPost.html}
        `;
        postContent.style.display = 'block';
        setupBreadcrumbNavigation();
    } else {
        postContent.style.display = 'none';
        const currentSection = document.getElementById(state.currentSection);
        if (currentSection) {
            currentSection.style.display = 'flex';
            currentSection.classList.add('active');
        }
    }
}

function setupBreadcrumbNavigation() {
    const backButton = document.querySelector('.back-button');
    const homeLink = document.querySelector('.breadcrumb-link[data-action="home"]');

    if (backButton) {
        backButton.addEventListener('click', goBack);
    }

    if (homeLink) {
        homeLink.addEventListener('click', goHome);
    }
}

function goBack() {
    state.currentSection = 'categories';
    state.currentPost = null;
    updateUI();
}

function goHome() {
    state.currentSection = 'profile';
    state.currentPost = null;
    updateUI();
}

subscribe(updateUI);
renderApp();