// utils/email-templates.js
export const generateContactEmail = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>¡Gracias por contactarnos!</title>
      <style>
        /* Estilo similar al resto de tu aplicación */
        body {
          font-family: 'Inter', 'Roboto', sans-serif;
          background-color: var(--background-color);
          color: var(--text-color);
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          background-color: var(--card-background);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        h1 {
          color: var(--accent-color);
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>¡Gracias por contactarnos, ${name}!</h1>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.</p>
        <p>¡Que tengas un excelente día!</p>
      </div>
    </body>
    </html>
  `;
};

export const generateNotificationEmail = (name, email, phone, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Nuevo mensaje de contacto</title>
      <style>
        /* Estilo similar al resto de tu aplicación */
        body {
          font-family: 'Inter', 'Roboto', sans-serif;
          background-color: var(--background-color);
          color: var(--text-color);
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px;
          background-color: var(--card-background);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        h1 {
          color: var(--accent-color);
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 10px;
        }
        .info {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Nuevo mensaje de contacto</h1>
        <p><span class="info">Nombre:</span> ${name}</p>
        <p><span class="info">Email:</span> ${email}</p>
        <p><span class="info">Teléfono:</span> ${phone || 'No proporcionado'}</p>
        <p><span class="info">Mensaje:</span> ${message}</p>
      </div>
    </body>
    </html>
  `;
};