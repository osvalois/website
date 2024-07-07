export class PostView {
    render(post) {
        return Promise.resolve(`
            <div class="breadcrumb">
                <a href="#" class="breadcrumb-link" data-action="home">Home</a>
                <span class="breadcrumb-separator">/</span>
                <span class="breadcrumb-current">${post.title}</span>
            </div>
            <button class="back-button" aria-label="Go back">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </button>
            ${post.html}`);
    }
}
