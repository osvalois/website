// App.js

import { Component } from './site/core/Component.js';
import { Router } from './site/core/Router.js';
import globalState from './site/state/globalState.js';
import { Navbar } from "./site/components/Navbar.js";
import { Footer } from "./site/components/Footer.js";
import { ProfileView } from "./site/views/ProfileView.js";
import { CategoriesView } from "./site/views/CategoriesView.js";
import { ContactView } from "./site/views/ContactView.js";
import { PostView } from "./site/views/PostView.js";
import { GitHubService } from './site/services/GitHubService.js';

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
                view = new PostView(currentPost);
            } else {
                view = new PostView({ title: 'Post no encontrado', html: '<p>Contenido no disponible.</p>' });
            }
        } else if (section === 'categories') {
            if (globalState.state.categories.length === 0 && !globalState.state.categoriesError) {
                await globalState.fetchCategories();
            }
            view = new CategoriesView();
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

    convertMarkdownToHtml(markdown) {
        return marked.parse(markdown);
    }
}

async function initApp() {
    const app = new App();
    const appElement = document.getElementById('app');
    appElement.innerHTML = await app.render();
    app.attachEventListeners();
    app.handleRouteChange(); // Handle initial route
}

document.addEventListener('DOMContentLoaded', initApp);