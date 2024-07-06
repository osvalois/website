//navbar.component.js
export default class Navbar {
    constructor(options) {
      this.options = options || [];
    }
  
    render() {
      const links = this.options.map(option =>
        `<a href="${option.href}" class="navbar-link">${option.text}</a>`
      ).join('');
      return `<nav class="navbar">${links}</nav>`;
    }
}