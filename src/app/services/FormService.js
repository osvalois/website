// FormService.js
export class FormService {
    static async submitForm(formData) {
        try {
            const response = await fetch('/api/form/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred while submitting the form');
            }

            return await response.json();
        } catch (error) {
            console.error('Error submitting form:', error);
            throw error;
        }
    }
}


