// views/CategoriesView.js

import { Component } from '../core/Component.js';
import globalState from '../state/globalState.js';
import { GitHubService } from '../services/GitHubService.js';

export class CategoriesView extends Component {
    constructor() {
        super();
        this.githubService = new GitHubService('osvalois', 'website');
    }

    async render() {
        if (globalState.state.categories.length === 0) {
            await this.fetchAndSetCategories();
        }

        const categoryItems = globalState.state.categories.map((category, index) => this.renderCategory(category, index)).join('');

        return `
            <section class="categories-section">
                <h2 class="categories-title">Explore my Content</h2>
                <p class="categories-subtitle">Discover a world of knowledge across various disciplines</p>
                ${this.renderCategoryFilter()}
                <div class="categories-grid" role="list">
                    ${categoryItems}
                </div>
            </section>`;
    }

    renderCategory(category, index) {
        const filesList = category.files.map(file => this.renderPostItem(file)).join('');
        
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
    }

    renderPostItem(file) {
        return `
            <li class="post-item">
                <a href="#" class="post-link" data-path="${file.path}">
                    <span class="post-title">${file.name.replace('.md', '')}</span>
                    <span class="post-meta">
                        <time datetime="${file.lastModified}">${this.formatDate(file.lastModified)}</time>
                        <span class="post-read-time">${this.estimateReadTime(file.size)} min read</span>
                    </span>
                </a>
            </li>`;
    }

    renderCategoryFilter() {
        const filterButtons = globalState.state.categories.map(cat => `
            <button class="filter-btn" data-filter="${cat.name.toLowerCase()}">
                <i class="category-icon-small ${this.getCategoryIcon(cat.name)}"></i>
                ${cat.name}
            </button>
        `).join('');

        return `
            <div class="categories-filter">
                <button class="filter-btn active" data-filter="all">
                    <i class="category-icon-small fas fa-th"></i>
                    All
                </button>
                ${filterButtons}
            </div>`;
    }

    async fetchAndSetCategories() {
        try {
            const categories = await this.githubService.fetchCategories();
            const categoriesWithFiles = await Promise.all(categories.map(async category => {
                const files = await this.githubService.fetchFilesInCategory(category.path);
                return { ...category, files };
            }));
            globalState.setState({ categories: categoriesWithFiles });
        } catch (error) {
            globalState.setError('Failed to load categories. Please try again later.');
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
        return Math.max(1, Math.round(fileSize / 1000));
    }

    attachEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', this.handleFilterClick.bind(this));
        });

        document.querySelectorAll('.post-link').forEach(link => {
            link.addEventListener('click', this.handlePostClick.bind(this));
        });

        document.querySelectorAll('.view-all-btn').forEach(btn => {
            btn.addEventListener('click', this.handleViewAllClick.bind(this));
        });
    }

    handleFilterClick(e) {
        const filter = e.target.closest('.filter-btn').dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.closest('.filter-btn').classList.add('active');
        
        document.querySelectorAll('.category-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    handlePostClick = (e) => {
        e.preventDefault();
        const path = e.target.closest('.post-link').dataset.path;
        const title = e.target.closest('.post-link').querySelector('.post-title').textContent;
        globalState.setCurrentPost({ path, title });
        globalState.setCurrentSection('post');
    }

    handleViewAllClick(e) {
        const category = e.target.closest('.category-card').dataset.category;
        // Implementar la lógica para ver todos los posts de una categoría
        console.log(`View all posts in ${category}`);
    }
}