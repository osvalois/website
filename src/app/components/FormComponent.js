// FormComponent.js
import { Component } from '../core/Component.js';

export class FormComponent extends Component {
    constructor({ onSubmit }) {
        super();
        this.onSubmit = onSubmit;
        this.state = {
            isSubmitting: false
        };
        this.fields = [
            { type: 'text', name: 'name', label: 'Your Name', required: true },
            { type: 'email', name: 'email', label: 'Your Email', required: true },
            { type: 'tel', name: 'phone', label: 'Your Phone (optional)', required: false },
            { type: 'textarea', name: 'message', label: 'Your Message', rows: 5, required: true }
        ];
    }

    renderField(field) {
        const { type, name, label, required, rows } = field;
        if (type === 'textarea') {
            return `
                <div class="form-group">
                    <textarea id="${name}" name="${name}" placeholder=" " rows="${rows}" ${required ? 'required' : ''}></textarea>
                    <label for="${name}">${label}</label>
                </div>
            `;
        }
        return `
            <div class="form-group">
                <input type="${type}" id="${name}" name="${name}" placeholder=" " ${required ? 'required' : ''}>
                <label for="${name}">${label}</label>
            </div>
        `;
    }

    render() {
        return `
            <form class="contact-form" id="contact-form">
                ${this.fields.map(field => this.renderField(field)).join('')}
                <button type="submit" ${this.state.isSubmitting ? 'disabled' : ''}>
                    ${this.state.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        `;
    }

    attachEventListeners() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.isSubmitting) return;

        this.setState({ isSubmitting: true });

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await this.onSubmit(data);
            this.reset();
        } catch (error) {
            console.error('Error in form submission:', error);
        } finally {
            this.setState({ isSubmitting: false });
        }
    }

    reset() {
        document.getElementById('contact-form').reset();
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateView();
    }

    updateView() {
        if (this.element) {
            this.element.innerHTML = this.render();
            this.attachEventListeners();
        }
    }
}