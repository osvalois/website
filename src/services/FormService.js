export class FormService {
    async submitForm(formData) {
        try {
            const response = await fetch('/api/form/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }
}
