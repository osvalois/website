// PostView.js

export class PostView {
    constructor(post) {
        this.post = post;
    }

    render() {
        const { title, html } = this.post || { title: 'Post no encontrado', html: '<p>Contenido no disponible.</p>' };
        return `
        <style>
        @import url('public/styles/post-section.css');
        </style>

        <div class="post">             
            <div class="breadcrumb">
                <a href="#" class="breadcrumb-link" data-target="categories">Categories</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${title}</span>
            </div>
            ${html}
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
    }
}