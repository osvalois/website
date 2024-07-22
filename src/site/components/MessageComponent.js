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

    render() {
        if (!this.state.message) return '';

        return `
            <div class="message ${this.state.type}">
                ${this.state.message}
            </div>
        `;
    }

    showMessage(message, type = 'info') {
        this.setState({ message, type });
        this.updateView();
    }

    clearMessage() {
        this.setState({ message: null, type: null });
        this.updateView();
    }

    updateView() {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.innerHTML = this.render();
        }
    }
}