// core/Router.js

export class Router {
    constructor() {
        this.routes = new Map();
    }

    addRoute(path, viewConstructor) {
        this.routes.set(path, viewConstructor);
    }

    getView(path, params = {}) {
        const ViewConstructor = this.routes.get(path);
        if (!ViewConstructor) {
            throw new Error(`Route not found: ${path}`);
        }
        return ViewConstructor(params);  // Llamamos a la función en lugar de usar 'new'
    }

    navigateTo(path, params = {}) {
        history.pushState(null, '', `#${path}`);
        return this.getView(path, params);
    }

    handlePopState() {
        const path = window.location.hash.slice(1) || 'profile';
        return this.getView(path);
    }
}