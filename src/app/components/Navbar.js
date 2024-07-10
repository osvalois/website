// components/Navbar.js

import { Component } from '../core/Component.js';
import globalState from '../state/globalState.js';

export class Navbar extends Component {
    constructor(options) {
        super();
        this.options = options || {};
        this.links = this.options.links || [];
    }

    render() {
        const links = this.links.map(link =>
            `<a href="#${link.target}" class="navbar-link" data-target="${link.target}">${link.text}</a>`
        ).join('');

        return `
            <nav class="navbar">
                <div class="container navbar-container">
                    <div class="navbar-links">
                        ${links}
                    </div>
                </div>
            </nav>
        `;
    }

    attachEventListeners() {
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetSection = e.target.getAttribute('data-target');
        globalState.setCurrentSection(targetSection);
    }
}