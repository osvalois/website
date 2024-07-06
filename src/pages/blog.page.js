import Footer from "../components/footer.component.js";
import Navbar from "../components/navbar.component.js";

// blog.page.js
const blogPage = (head, body, bodyEnd, navbarOptions, footerOptions) => {
  const navbar = new Navbar(navbarOptions);
  const footer = new Footer(footerOptions);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    ${head || ''}
  </head>
  <body>
    <div class="markdown-body">
      <header>
        ${navbar.render()}
      </header>
      <main>
        ${body || ''}
      </main>
      ${footer.render()}
    </div>
    ${bodyEnd || ''}
  </body>
</html>`;
};

export { blogPage };