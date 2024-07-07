export class Footer {
    constructor(options) {
        this.options = options || [];
    }

    render() {
        const links = this.options.map(option =>
            `<a href="${option.href}" class="footer-link" target="_blank" rel="noopener noreferrer">${option.text}</a>`
        ).join('');
        return `
            <footer class="footer">
                <div class="container">
                    <p>&copy; ${new Date().getFullYear()} Oscar Valois. All rights reserved.</p>
                    <div class="footer-links">
                        ${links}
                    </div>
                </div>
            </footer>`;
    }
}