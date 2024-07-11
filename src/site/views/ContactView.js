import { Component } from '../core/Component.js';
import { FormComponent } from '../components/FormComponent.js';
import { MessageComponent } from '../components/MessageComponent.js';
import { FormService } from '../services/FormService.js';

export class ContactView extends Component {
    constructor() {
        super();
        this.messageComponent = new MessageComponent();
        this.formComponent = new FormComponent({
            onSubmit: this.handleSubmit.bind(this)
        });
    }

    async handleSubmit(formData) {
        try {
            await FormService.submitForm(formData);
            this.messageComponent.showMessage('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.', 'success');
            return { success: true };
        } catch (error) {
            this.messageComponent.showMessage(error.message || 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.', 'error');
            return { success: false, error: error.message };
        }
    }

    render() {
        return `
            <section class="contact-section">
            <h2 class="contact-title">Get in Touch</h2>
                <div class="card contact-card">
                    ${this.messageComponent.render()}
                    ${this.formComponent.render()}
                </div>
            </section>
        `;
    }

    attachEventListeners() {
        this.formComponent.attachEventListeners();
    }
}