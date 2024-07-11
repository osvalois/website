// state/globalState.js
import { State } from './State.js';
import { GitHubService } from '../services/GitHubService.js';

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
        this.githubService = new GitHubService('osvalois', 'website');
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

    async fetchCategories() {
        if (this.state.isLoading) return;

        this.setLoading(true);
        this.setCategoriesError(null);

        try {
            const categories = await this.githubService.fetchCategories();
            const categoriesWithFiles = await Promise.all(categories.map(async category => {
                try {
                    const files = await this.githubService.fetchFilesInCategory(category.path);
                    return { ...category, files };
                } catch (error) {
                    console.error(`Error fetching files for category ${category.name}:`, error);
                    return { ...category, files: [], error: `Failed to load files for ${category.name}` };
                }
            }));

            this.setCategories(categoriesWithFiles);
        } catch (error) {
            console.error('Error fetching categories:', error);
            const errorMessage = this.getErrorMessage(error);
            this.setCategoriesError(errorMessage);
        } finally {
            this.setLoading(false);
        }
    }

    getErrorMessage(error) {
        if (error.response) {
            return `Server error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
            return "Network error: Unable to reach the server. Please check your internet connection.";
        } else {
            return `Error loading categories: ${error.message}`;
        }
    }
}

const globalState = new GlobalState();
export default globalState;