export class FormService {
    static async submitForm(formData) {
        try {
            const response = await fetch('https://website-9r8.pages.dev/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error('Error parsing server response. Please try again later.');
            }

            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        throw new Error(`Bad Request: ${data.message || 'Invalid request data'}`);
                    case 401:
                        throw new Error(`Unauthorized: ${data.message || 'Authentication required'}`);
                    case 403:
                        throw new Error(`Forbidden: ${data.message || 'You do not have permission to perform this action'}`);
                    case 404:
                        throw new Error(`Not Found: ${data.message || 'Resource not found'}`);
                    case 500:
                        throw new Error(`Internal Server Error: ${data.message || 'An unexpected error occurred'}`);
                    default:
                        throw new Error(data.message || `Server error: ${response.status}`);
                }
            }

            return data;
        } catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Network error. Please check your connection and try again.');
            }
            throw error;
        }
    }
}