
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
            categories: [],
            categoriesError: null
        });
    }

    setCurrentSection(section) {
        this.setState({ currentSection: section });
    }

    setCategories(categories) {
        this.setState({ categories, categoriesError: null });
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

    setCategoriesError(error) {
        this.setState({ categoriesError: error });
    }

    resetState() {
        this.setState({
            currentSection: 'profile',
            currentPost: null,
            user: null,
            isLoading: false,
            error: null,
            categories: [],
            categoriesError: null
        });
    }
}

const globalState = new GlobalState();
export default globalState;



