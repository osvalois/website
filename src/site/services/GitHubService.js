// services/GitHubService.js

export class GitHubService {
    constructor(username, repo) {
        this.username = username;
        this.repo = repo;
        this.baseUrl = `https://api.github.com/repos/${username}/${repo}`;
        this.rawContentUrl = `https://raw.githubusercontent.com/${username}/${repo}/main`;
    }

    async fetchCategories() {
        const response = await fetch(`${this.baseUrl}/contents`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const contents = await response.json();
        return contents.filter(item => item.type === 'dir');
    }

    async fetchFilesInCategory(categoryPath) {
        const response = await fetch(`${this.baseUrl}/contents/${categoryPath}`);
        if (!response.ok) throw new Error(`Failed to fetch files in category: ${categoryPath}`);
        const files = await response.json();
        return files.filter(file => file.type === 'file' && file.name.endsWith('.md'));
    }

    async fetchPostContent(path) {
        const response = await fetch(`${this.rawContentUrl}/${path}`);
        if (!response.ok) throw new Error(`Failed to fetch post content: ${path}`);
        return await response.text();
    }
}