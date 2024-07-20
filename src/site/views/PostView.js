// views/PostView.js

import { Component } from '../core/Component.js';
import globalState from '../state/globalState.js';

export class PostView extends Component {
    render() {
        if (globalState.state.isLoading) {
            return '<div class="post-section"><p>Loading post...</p></div>';
        }

        if (globalState.state.error) {
            return `
                <div class="post-section">
                    <h2>Error Loading Post</h2>
                    <p class="error-message">${globalState.state.error}</p>
                    <button class="retry-btn">Retry</button>
                </div>`;
        }

        const { currentPost } = globalState.state;
        if (!currentPost) {
            return '<div class="post-section"><p>Post not found.</p></div>';
        }

        const { title, html } = currentPost;

        return `
        <style>
        @import url('public/styles/post-section.css');
        </style>

        <div class="post-section">             
            <div class="breadcrumb">
                <a href="#" class="breadcrumb-link" data-target="categories">Categories</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${title}</span>
            </div>
            <article class="post-content">
                <h1 class="post-title">${title}</h1>
                ${html}
            </article>
        </div> 
        `;
    }

    attachEventListeners() {
        const breadcrumbLink = document.querySelector('.breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', (e) => {
                e.preventDefault();
                globalState.setCurrentSection('categories');
            });
        }

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