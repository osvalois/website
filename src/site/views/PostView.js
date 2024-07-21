// views/PostView.js

import { Component } from '../core/Component.js';
import globalState from '../state/globalState.js';

export class PostView extends Component {
    render() {
        const { isLoading, error, currentPost } = globalState.state;

        return `
        <style>
        @import url('public/styles/post-section.css');
        </style>

        <div class="post-section ${isLoading ? 'loading' : ''}">
            ${this.renderBreadcrumb(currentPost?.title)}
            ${this.renderContent(isLoading, error, currentPost)}
        </div>
        `;
    }

    renderBreadcrumb(title) {
        return `
        <div class="breadcrumb">
            <a href="#" class="breadcrumb-link" data-target="categories">Categories</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">${title || 'Loading...'}</span>
        </div>
        `;
    }

    renderContent(isLoading, error, currentPost) {
        if (isLoading) {
            return this.renderShimmer();
        }

        if (error) {
            return this.renderError(error);
        }

        if (!currentPost) {
            return '<p class="not-found">Post not found.</p>';
        }

        return this.renderPost(currentPost);
    }

    renderShimmer() {
        return `
        <div class="shimmer-wrapper">
            <div class="shimmer-title"></div>
            <div class="shimmer-content">
                ${Array(4).fill('<div class="shimmer-line"></div>').join('')}
            </div>
        </div>
        `;
    }

    renderError(error) {
        return `
        <div class="error-container">
            <h2 class="error-title">Error Loading Post</h2>
            <p class="error-message">${error}</p>
            <button class="retry-btn">Retry</button>
        </div>
        `;
    }

    renderPost(post) {
        const { title, html, date } = post;
        return `
        <article class="post-content">
            <h1 class="post-title">${title}</h1>
            <div class="post-meta">
                <span class="post-author">By Oscar Valois</span>
                <span class="post-date">${new Date(date).toLocaleDateString()}</span>
            </div>
            <div class="post-body">${html}</div>
        </article>
        `;
    }

    attachEventListeners() {
        this.attachBreadcrumbListener();
        this.attachRetryButtonListener();
    }

    attachBreadcrumbListener() {
        const breadcrumbLink = document.querySelector('.breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', (e) => {
                e.preventDefault();
                globalState.setCurrentSection('categories');
            });
        }
    }

    attachRetryButtonListener() {
        const retryBtn = document.querySelector('.retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                const currentPath = globalState.state.currentPost?.path;
                if (currentPath) {
                    globalState.loadPost(currentPath);
                }
            });
        }
    }
}