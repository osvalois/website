import { Component } from '../core/Component.js';

export class FormComponent extends Component {
    constructor({ onSubmit }) {
        super();
        this.onSubmit = onSubmit;
        this.state = {
            isSubmitting: false,
            errors: {}
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
        const errorMessage = this.state.errors[name] ? `<span class="error-message">${this.state.errors[name]}</span>` : '';

        if (type === 'textarea') {
            return `
                <div class="form-group ${this.state.errors[name] ? 'has-error' : ''}">
                    <textarea id="${name}" name="${name}" placeholder=" " rows="${rows}" ${required ? 'required' : ''}></textarea>
                    <label for="${name}">${label}</label>
                    ${errorMessage}
                </div>
            `;
        }
        return `
            <div class="form-group ${this.state.errors[name] ? 'has-error' : ''}">
                <input type="${type}" id="${name}" name="${name}" placeholder=" " ${required ? 'required' : ''}>
                <label for="${name}">${label}</label>
                ${errorMessage}
            </div>
        `;
    }

    attachEventListeners() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.isSubmitting) return;

        this.setState({ isSubmitting: true, errors: {} });

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const result = await this.onSubmit(data);
            if (result.success) {
                this.reset();
            } else if (result.error) {
                this.setState({ errors: { general: result.error } });
            }
        } catch (error) {
            this.setState({ errors: { general: error.message } });
        } finally {
            this.setState({ isSubmitting: false });
        }
    }

    render() {
        const generalError = this.state.errors.general ? `<div class="error-message">${this.state.errors.general}</div>` : '';
        return `
            <form class="contact-form" id="contact-form">
                ${this.fields.map(field => this.renderField(field)).join('')}
                ${generalError}
                <button type="submit" ${this.state.isSubmitting ? 'disabled' : ''}>
                    ${this.state.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        `;
    }

    parseErrors(errorMessage) {
        const errors = {};
        errorMessage.split(', ').forEach(error => {
            const [field, message] = error.split(' is ');
            errors[field.toLowerCase()] = `${field} is ${message}`;
        });
        return errors;
    }

    reset() {
        document.getElementById('contact-form').reset();
        this.setState({ errors: {} });
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