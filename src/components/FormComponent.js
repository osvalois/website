import { Component } from '../core/Component.js';
// FormComponent.js
export class FormComponent extends Component {
    constructor({ fields, onSubmit }) {
        super();
        this.fields = fields;
        this.onSubmit = onSubmit;
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
                <button type="submit">Send Message</button>
            </form>
        `;
    }

    attachEventListeners() {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            await this.onSubmit(data);
        });
    }

    reset() {
        document.getElementById('contact-form').reset();
    }
}