// ContactView.js
import { Component } from '../core/Component.js';
import { FormComponent } from '../components/FormComponent.js';
import { FormService } from '../services/FormService.js';

export class ContactView extends Component {
    constructor() {
        super();
        this.formService = new FormService();
        this.form = new FormComponent({
            fields: [
                { type: 'text', name: 'name', label: 'Your Name', required: true },
                { type: 'email', name: 'email', label: 'Your Email', required: true },
                { type: 'textarea', name: 'message', label: 'Your Message', rows: 5, required: true }
            ],
            onSubmit: this.handleSubmit.bind(this)
        });
    }

    async handleSubmit(formData) {
        try {
            const response = await this.formService.submitForm(formData);
            this.showNotification('success', 'Thanks for your message! We\'ll get back to you soon.');
            this.form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showNotification('error', 'An error occurred. Please try again later.');
        }
    }

    showNotification(type, message) {
        // Implementar lógica para mostrar notificaciones
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    render() {
        return `
            <section class="contact-section">
                <h2 class="contact-title">Get in Touch</h2>
                <div class="card contact-card">
                    ${this.form.render()}
                </div>
            </section>
        `;
    }
}

