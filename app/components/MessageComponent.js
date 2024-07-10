// MessageComponent.js
import { Component } from '../core/Component.js';

export class MessageComponent extends Component {
    constructor() {
        super();
        this.state = {
            message: null,
            type: null
        };
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateView();
    }

    render() {
        if (!this.state.message) return '';

        const iconMap = {
            error: '❌',
            success: '✅',
            info: 'ℹ️'
        };

        return `
            <div class="message-container ${this.state.type}" role="alert">
                <span class="message-icon" aria-hidden="true">${iconMap[this.state.type]}</span>
                <p class="message-text">${this.state.message}</p>
            </div>
        `;
    }

    updateView() {
        if (this.element) {
            this.element.innerHTML = this.render();
        }
    }

    showMessage(message, type = 'info') {
        this.setState({ message, type });
    }

    clearMessage() {
        this.setState({ message: null, type: null });
    }
}
