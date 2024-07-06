//footer.component.js
export default class Footer {
  constructor(options) {
    this.options = options || [];
  }

  render() {
    const links = this.options.map(option =>
      `<a href="${option.href}" class="footer-link">${option.text}</a>`
    ).join('');
    return `<footer class="footer">
              <p>Oscar Valois</p>
              ${links}
            </footer>`;
  }
}