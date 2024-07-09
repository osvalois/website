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

        const categoryItems = state.categories.map((category, index) => {
            const filesList = category.files.map(file =>
                `<li class="post-item">
                    <a href="#" class="post-link" data-path="${file.path}">
                        <span class="post-title">${file.name.replace('.md', '')}</span>
                        <span class="post-meta">
                            <time datetime="${file.lastModified}">${this.formatDate(file.lastModified)}</time>
                            <span class="post-read-time">${this.estimateReadTime(file.size)} min read</span>
                        </span>
                    </a>
                </li>`
            ).join('');
            
            return `
                <article class="category-card" data-category="${category.name.toLowerCase()}" style="--animation-order: ${index};">
                    <div class="category-card-inner">
                        <header class="category-header">
                            <div class="category-icon-wrapper">
                                <i class="category-icon ${this.getCategoryIcon(category.name)}"></i>
                            </div>
                            <h3 class="category-title">${category.name}</h3>
                        </header>
                        <ul class="post-list">
                            ${filesList || '<li class="no-posts">No posts found in this category.</li>'}
                        </ul>
                        <footer class="category-footer">
                            <span class="post-count">${category.files.length} posts</span>
                            <button class="view-all-btn">View All</button>
                        </footer>
                    </div>
                </article>`;
        });

        return `
            <section class="categories-section">
                <h2 class="categories-title">Explore my Content</h2>
                <p class="categories-subtitle">Discover a world of knowledge across various disciplines</p>
                <div class="categories-filter">
                    <button class="filter-btn active" data-filter="all">
                        <i class="category-icon-small fas fa-th"></i>
                        All
                    </button>
                    ${state.categories.map(cat => `
                        <button class="filter-btn" data-filter="${cat.name.toLowerCase()}">
                            <i class="category-icon-small ${this.getCategoryIcon(cat.name)}"></i>
                            ${cat.name}
                        </button>
                    `).join('')}
                </div>
                <div class="categories-grid" role="list">
                    ${categoryItems.join('')}
                </div>
            </section>`;
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
            return `<div class="error-message">Failed to load categories. Please try again later.</div>`;
        }
    }

    getCategoryIcon(categoryName) {
        const iconMap = {
            'Infrastructure': 'fas fa-server',
            'Products': 'fas fa-box-open',
            'Security': 'fas fa-shield-alt',
            'Privacy': 'fas fa-user-shield',
            'Software Applications': 'fas fa-laptop-code',
            'Software Architecture': 'fas fa-sitemap'
        };
        return iconMap[categoryName] || 'fas fa-folder';
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    estimateReadTime(fileSize) {
        // Estimación aproximada: 1000 bytes = 1 minuto de lectura
        return Math.max(1, Math.round(fileSize / 1000));
    }
}