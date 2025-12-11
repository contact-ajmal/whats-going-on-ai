export interface GitHubUser {
    login: string;
    avatar_url: string;
    name: string;
}

export interface GitHubFile {
    sha: string;
    content: string;
}

const API_BASE = 'https://api.github.com';

export class GitHubClient {
    private token: string;
    private repo: string; // "owner/repo"

    constructor(token: string, repo: string) {
        this.token = token;
        this.repo = repo;
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${API_BASE}${endpoint}`;
        const headers = {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            if (response.status === 401) throw new Error("Invalid Token");
            if (response.status === 404) throw new Error("Resource not found (check repo name)");
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        return response.json();
    }

    async getUser(): Promise<GitHubUser> {
        return this.request('/user');
    }

    async getFile(path: string): Promise<GitHubFile> {
        const data = await this.request(`/repos/${this.repo}/contents/${path}`);
        return {
            sha: data.sha,
            content: atob(data.content.replace(/\n/g, '')),
        };
    }

    async createFile(path: string, content: string, message: string): Promise<void> {
        // Check if file exists to get SHA (for update) or null (for create)
        let sha: string | undefined;
        try {
            const existing = await this.request(`/repos/${this.repo}/contents/${path}`);
            sha = existing.sha;
        } catch (e) {
            // File doesn't exist, which is fine for creation
        }

        const body = {
            message,
            content: btoa(unescape(encodeURIComponent(content))), // Handle UTF-8
            sha, // Include SHA if updating
        };

        await this.request(`/repos/${this.repo}/contents/${path}`, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    async getRepoDetails(): Promise<{ default_branch: string }> {
        return this.request(`/repos/${this.repo}`);
    }

    async uploadImage(file: File): Promise<string> {
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const content = btoa(binary);

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
        const path = `public/images/uploads/${filename}`;

        await this.createFile(path, content, `chore: upload image ${filename}`);

        // Fetch default branch to ensure link is correct (handle main vs master)
        let branch = 'main';
        try {
            const details = await this.getRepoDetails();
            branch = details.default_branch;
        } catch (e) {
            console.warn('Could not fetch repo details, defaulting to main');
        }

        // Return raw GitHub URL for immediate availability
        return `https://raw.githubusercontent.com/${this.repo}/${branch}/public/images/uploads/${filename}`;
    }
}
