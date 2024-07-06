//navbar.component.js
export default class Navbar {
    constructor(options) {
      this.options = options || [];
    }
  
    render() {
      const links = this.options.map(option =>
        `<a href="${option.href}" class="navbar-link">${option.text}</a>`
      ).join('');
      return `<nav class="navbar">  <div class="container navbar-container">
      <a href="/" class="navbar-logo">Oscar Valois</a>
      <div class="navbar-links">
      ${links}</div>
  </div></nav>`;
    }
}