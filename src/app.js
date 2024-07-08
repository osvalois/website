// app.js

import { Navbar } from "./components/Navbar.js";
import { state, subscribe } from "./state/State.js";
import { MainSection } from "./views/MainSection.js";
import { ProfileView } from "./views/ProfileView.js";
import { CategoriesView } from "./views/CategoriesView.js";
import { ContactView } from "./views/ContactView.js";
import { PostView } from "./views/PostView.js";
import { Footer } from "./components/Footer.js";

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
        <div id="main-section" class="section active"></div>
        ${footer.render()}
    `;

    setupNavigation();
    setupContactForm();
    setupPostLinks();
    updateUI();
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
    const mainSectionElement = document.getElementById('main-section');

    if (!mainSectionElement) {
        return;
    }

    let view;

    switch (state.currentSection) {
        case 'profile':
            view = new ProfileView();
            break;
        case 'categories':
            view = new CategoriesView();
            break;
        case 'contact':
            view = new ContactView();
            break;
        case 'post':
            view = new PostView(state.currentPost); // Pasar el currentPost
            break;
        default:
            return;
    }

    view.render().then(html => {
        mainSectionElement.innerHTML = html;
        setupPostLinks();
        setupBackButton(); // Agregar setupBackButton para manejar el botón de regreso
    });
}

function setupBackButton() {
    document.querySelectorAll('.breadcrumb-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-target');
            state.currentSection = targetId;
            state.currentPost = null;
            updateUI();
        });
    });
}

document.addEventListener('DOMContentLoaded', renderApp);
subscribe(updateUI);


