export class Navbar {
    constructor(options) {
        this.options = options || [];
    }

    render() {
        const links = this.options.map(option =>
            `<a href="#${option.target}" class="navbar-link" data-target="${option.target}">${option.text}</a>`
        ).join('');

        return `
            <style>
                @import url('public/styles/navbar.css');
            </style>
            <nav class="navbar">
                <div class="container navbar-container">
                    <a href="/" class="navbar-logo">Oscar Valois</a>
                    <div class="navbar-links">
                        ${links}
                    </div>
                </div>
            </nav>
        `;
    }
}
