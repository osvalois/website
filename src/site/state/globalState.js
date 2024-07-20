// state/globalState.js

import { State } from './State.js';
import { GitHubService } from '../services/GitHubService.js';
import { marked } from 'https://unpkg.com/marked@4.0.0/lib/marked.esm.js';

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
        this.githubService = new GitHubService('osvalois', 'website-posts');
    }

    setCurrentSection(section) {
        this.setState({ currentSection: section });
    }

    setCategories(categories) {
        this.setState({ categories, categoriesError: null });
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

    async loadPost(path) {
        this.setState({ isLoading: true, currentSection: 'post', error: null });
        try {
            const content = await this.githubService.fetchPostContent(path);
            const html = marked(content);
            const title = path.split('/').pop().replace('.md', '');
            this.setState({ 
                currentPost: { title, html },
                isLoading: false
            });
        } catch (error) {
            console.error('Error loading post:', error);
            this.setState({ 
                currentPost: null,
                error: this.getErrorMessage(error),
                isLoading: false
            });
        }
    }

    getErrorMessage(error) {
        if (error.response) {
            return `Server error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
            return "Network error: Unable to reach the server. Please check your internet connection.";
        } else {
            return `Error: ${error.message}`;
        }
    }

    convertMarkdownToHtml(markdown) {
        return marked(markdown);
    }
}

const globalState = new GlobalState();
export default globalState;