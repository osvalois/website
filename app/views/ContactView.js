// ContactView.js
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
            console.log(formData)
            console.log("formData")
            this.messageComponent.showMessage('Sending your message...', 'info');
            await FormService.submitForm(formData);
            this.messageComponent.showMessage('Thanks for your message! We\'ll get back to you soon.', 'success');
            return { success: true };
        } catch (error) {
            this.messageComponent.showMessage(error.message, 'error');
            return { success: false };
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