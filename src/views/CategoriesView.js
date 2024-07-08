import { state } from "../state/State.js";
import { GitHubService } from "../services/GitHubService.js";

export class CategoriesView {
    constructor() {
        this.githubService = new GitHubService('osvalois', 'website');
    }

    async render() {
        if (state.categories.length === 0) {
            await this.fetchAndSetCategories();
        }

        const categoryItems = state.categories.map(category => {
            const filesList = category.files.map(file =>
                `<li><a href="#" class="post-link" data-path="${file.path}">${file.name.replace('.md', '')}</a></li>`
            ).join('');
            return `
                <div class="category-card">
                    <h3>${category.name}</h3>
                    <ul class="post-list">
                        ${filesList || '<li>No posts found in this category.</li>'}
                    </ul>
                </div>`;
        });

        return `
            <h2>Categories</h2>
            <div class="categories-grid">
                ${categoryItems.join('')}
            </div>`;
    }

    async fetchAndSetCategories() {
        try {
            const categories = await this.githubService.fetchCategories();
            const categoriesWithFiles = await Promise.all(categories.map(async category => {
                const files = await this.githubService.fetchFilesInCategory(category.path);
                return { ...category, files };
            }));
            state.categories = categoriesWithFiles;
        } catch (error) {
            console.error('Error fetching categories and files:', error);
        }
    }
}
