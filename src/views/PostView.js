// PostView.js

export class PostView {
    constructor(post) {
        this.post = post;
    }

    render() {
        const post = this.post || { title: 'Post no encontrado', html: '<p>Contenido no disponible.</p>' };
        return Promise.resolve(`
        <style>
        @import url('public/styles/post-section.css');
        </style>

        <div class="post">             
        <div class="breadcrumb">
            <a href="#" class="breadcrumb-link" data-target="categories">Categories</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">${post.title}</span>
    </div>
    ${post.html}</div> 
        `);
    }
}
