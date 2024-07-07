import { state } from "../state/State.js";
import { GitHubService } from "../services/GitHubService.js";

export class MainSection {
    constructor() {
        this.githubService = new GitHubService('osvalois', 'website');
    }

    async render() {
        const categories = await this.githubService.fetchCategories();
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
        return `<section id="profile"></section>`;
    }

    async renderCategoriesSection() {
        return `<section id="categories"></section>`;
    }

    renderContactSection() {
        return `<section id="contact"></section>`;
    }

    async renderPostSection() {
        return `<section id="post"></section>`;
    }
}
