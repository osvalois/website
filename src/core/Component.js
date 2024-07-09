// core/Component.js

export class Component {
    constructor() {
        if (new.target === Component) {
            throw new TypeError("Cannot construct Component instances directly");
        }
    }

    render() {
        throw new Error("Method 'render()' must be implemented.");
    }

    attachEventListeners() {
        // Implement if needed in child classes
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateView();
    }

    updateView() {
        // This method can be overridden in child classes if needed
        const element = document.querySelector(this.selector);
        if (element) {
            element.innerHTML = this.render();
            this.attachEventListeners();
        }
    }
}