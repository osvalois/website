// state/globalState.js

import { State } from './State.js';

class GlobalState extends State {
    constructor() {
        super({
            currentSection: 'profile',
            currentPost: null,
            user: null,
            isLoading: false,
            error: null,
            categories: []
        });
    }

    setCurrentSection(section) {
        this.setState({ currentSection: section });
    }

    setCategories(categories) {
        this.setState({ categories });
    }


    setCurrentPost(post) {
        this.setState({ currentPost: post });
    }

    setUser(user) {
        this.setState({ user });
    }

    setLoading(isLoading) {
        this.setState({ isLoading });
    }

    setError(error) {
        this.setState({ error });
    }

    resetState() {
        this.setState({
            currentSection: 'profile',
            currentPost: null,
            user: null,
            isLoading: false,
            error: null
        });
    }
}

// Creamos una instancia única del estado global
const globalState = new GlobalState();

// Exportamos la instancia como exportación por defecto
export default globalState;