export class GitHubService {
    constructor(username, repo) {
        this.username = username;
        this.repo = repo;
    }

    async fetchCategories() {
        const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repo}/contents/posts`);
        const categories = await response.json();
        return categories.filter(item => item.type === 'dir');
    }

    async fetchFilesInCategory(categoryPath) {
        const response = await fetch(`https://api.github.com/repos/${this.username}/${this.repo}/contents/${categoryPath}`);
        const files = await response.json();
        return files.filter(file => file.type === 'file' && file.name.endsWith('.md'));
    }
    
}
