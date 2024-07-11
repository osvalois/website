// Footer.js
export class Footer {
    constructor(options) {
        this.options = options || {};
        this.links = Array.isArray(options.links) ? options.links : [];
    }

    render() {
        const links = this.links.map(link =>
            `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.text}</a>`
        ).join(' | ');
        return `
            <footer class="footer">
                <div class="container">
                    <p>© ${new Date().getFullYear()} Oscar Valois. All rights reserved.</p>
                    <div class="footer-links">
                        ${links}
                </div>
            </footer>
        `;
    }

    // Método vacío para evitar errores si se llama
    attachEventListeners() {
        // No se necesitan event listeners para el footer en este momento
    }
}