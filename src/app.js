import { Component } from './app/core/Component.js';
import { Router } from './app/core/Router.js';
import globalState from './app/state/globalState.js';
import { Navbar } from "./app/components/Navbar.js";
import { Footer } from "./app/components/Footer.js";
import { ProfileView } from "./app/views/ProfileView.js";
import { CategoriesView } from "./app/views/CategoriesView.js";
import { ContactView } from "./app/views/ContactView.js";
import { PostView } from "./app/views/PostView.js";
import { GitHubService } from './app/services/GitHubService.js';

class App extends Component {
    constructor() {
        super();
        this.router = new Router();
        this.githubService = new GitHubService('osvalois', 'website');
        this.navbar = new Navbar({
            links: [
                { target: "profile", text: "About" },
                { target: "categories", text: "Categories" },
                { target: "contact", text: "Contact" }
            ]
        });
        this.footer = new Footer({
            links: [
                { text: 'Github', href: 'https://github.com/osvalois' },
                { text: 'Dockerhub', href: 'https://hub.docker.com/u/osvalois' },
                { text: 'Dev.to', href: 'https://dev.to/osvalois' }
            ]
        });
        this.setupRoutes();
        this.setupStateListeners();
    }

    setupRoutes() {
        this.router.addRoute('profile', () => new ProfileView());
        this.router.addRoute('categories', () => new CategoriesView());
        this.router.addRoute('contact', () => new ContactView());
        this.router.addRoute('post', (params) => new PostView(params.post));
    }

    setupStateListeners() {
        globalState.subscribe(this.handleStateChange.bind(this));
    }

    handleStateChange(newState) {
        this.updateMainSection(newState.currentSection);
    }

    async render() {
        return `
            <div id="app-container">
                ${await this.navbar.render()}
                <main id="main-section" class="section active"></main>
                ${await this.footer.render()}
            </div>
        `;
    }

    async updateMainSection(section) {
        const mainSectionElement = document.getElementById('main-section');
        if (!mainSectionElement) return;
    
        let view;
        if (section === 'post') {
            const currentPost = globalState.state.currentPost;
            if (currentPost && currentPost.path) {
                try {
                    const post = await this.githubService.fetchAndDisplayPost(currentPost.path);
                    const html = this.convertMarkdownToHtml(post.content);
                    view = new PostView({ title: post.title, html });
                } catch (error) {
                    console.error('Error al cargar el post:', error);
                    view = new PostView({ title: 'Error', html: '<p>Error al cargar el post. Por favor, intenta nuevamente más tarde.</p>' });
                }
            } else {
                view = new PostView({ title: 'Post no encontrado', html: '<p>Contenido no disponible.</p>' });
            }
        } else {
            view = this.router.getView(section);
        }
    
        const html = await view.render();
        mainSectionElement.innerHTML = html;
        view.attachEventListeners();
    }

    attachEventListeners() {
        this.navbar.attachEventListeners();
        this.footer.attachEventListeners();
        
        window.addEventListener('popstate', this.handleRouteChange.bind(this));
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1);
        globalState.setCurrentSection(hash || 'profile');
    }

    async fetchAndDisplayPost(path) {
        try {
            const post = await this.githubService.fetchAndDisplayPost(path);
            const html = this.convertMarkdownToHtml(post.content);
            globalState.setCurrentPost({ html, title: post.title });
            globalState.setCurrentSection('post');
        } catch (error) {
            console.error('Error al cargar el post:', error);
            globalState.setCurrentPost({ html: '<p>Error al cargar el post. Por favor, intenta nuevamente más tarde.</p>', title: 'Error' });
            globalState.setCurrentSection('post');
        }
    }

    convertMarkdownToHtml(markdown) {
        return marked.parse(markdown);
    }
}

async function initApp() {
    const app = new App();
    const appElement = document.getElementById('app');
    appElement.innerHTML = await app.render();
    app.attachEventListeners();
    app.handleRouteChange(); // Manejar la ruta inicial
}

document.addEventListener('DOMContentLoaded', initApp);