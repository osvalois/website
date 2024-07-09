import { FormService } from '../services/FormService.js';

export class ContactView {
    constructor() {
        this.formService = new FormService();
        this.formData = new Proxy({
            name: '',
            email: '',
            message: ''
        }, {
            set: (target, key, value) => {
                target[key] = value;
                this.validateForm();
                return true;
            }
        });
    }

    async init() {
        this.formElement = document.getElementById('contact-form');
        this.submitButton = document.getElementById('submit-button');
        this.messageElement = document.getElementById('form-message');

        this.formElement.addEventListener('submit', this.handleSubmit.bind(this));
        this.formElement.addEventListener('input', this.handleInput.bind(this));

        this.setupInputAnimations();
        this.setupFloatingLabels();
    }

    handleInput(event) {
        const { name, value } = event.target;
        this.formData[name] = value.trim();
        this.updateFloatingLabel(event.target);
    }

    validateForm() {
        const isValid = Object.values(this.formData).every(value => value !== '');
        this.submitButton.disabled = !isValid;
        if (isValid) {
            this.submitButton.classList.add('active');
        } else {
            this.submitButton.classList.remove('active');
        }
    }

    setupInputAnimations() {
        const inputs = this.formElement.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    setupFloatingLabels() {
        const inputs = this.formElement.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            this.updateFloatingLabel(input);
        });
    }

    updateFloatingLabel(input) {
        const label = input.nextElementSibling;
        if (input.value !== '') {
            label.classList.add('float');
        } else {
            label.classList.remove('float');
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        this.submitButton.disabled = true;
        this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            const response = await this.formService.submitForm(this.formData);
            console.log('Formulario enviado exitosamente:', response);
            this.showMessage('¡Mensaje enviado con éxito! Gracias por contactarnos.', 'success');
            this.formElement.reset();
            Object.keys(this.formData).forEach(key => this.formData[key] = '');
            this.setupFloatingLabels();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            this.showMessage('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.', 'error');
        } finally {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        }
    }

    showMessage(message, type) {
        this.messageElement.textContent = message;
        this.messageElement.className = `message ${type}`;
        this.messageElement.classList.add('show');

        setTimeout(() => {
            this.messageElement.classList.remove('show');
        }, 5000);
    }

    async render() {
        return `
        <section class="contact-section">
            <h2 class="contact-title">Contáctenos</h2>
            <div class="contact-card">
                <form id="contact-form" class="contact-form">
                    <div class="form-group">
                        <input type="text" id="name" name="name" required>
                        <label for="name"><i class="fas fa-user"></i> Nombre</label>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" required>
                        <label for="email"><i class="fas fa-envelope"></i> Correo Electrónico</label>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="5" required></textarea>
                        <label for="message"><i class="fas fa-comment-alt"></i> Mensaje</label>
                    </div>
                    <button id="submit-button" disabled><i class="fas fa-paper-plane"></i> Enviar Mensaje</button>
                </form>
                <div id="form-message" class="message"></div>
            </div>
        </section>`;
    }

    async afterRender() {
        await this.init();
    }
}