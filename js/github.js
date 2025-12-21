/**
 * GitHub API Integration
 * Fetches and displays repository data dynamically
 */

class GitHubPortfolio {
    constructor(username) {
        this.username = username;
        this.apiUrl = `https://api.github.com/users/${username}/repos`;
        this.container = document.getElementById('projects-container');
        this.cache = this.loadCache();
        
        // Featured repositories (will be prioritized)
        this.featuredRepos = [
            'BecomexRobo',
            'ExtratorZipZpl',
            'ServiceImpressaoZpl',
            'ApiReceitas'
        ];
        
        this.init();
    }
    
    init() {
        if (this.cache) {
            this.displayRepositories(this.cache);
        } else {
            this.fetchRepositories();
        }
    }
    
    loadCache() {
        try {
            const cached = sessionStorage.getItem('github_repos');
            if (cached) {
                const data = JSON.parse(cached);
                const now = new Date().getTime();
                // Cache for 1 hour
                if (now - data.timestamp < 3600000) {
                    return data.repos;
                }
            }
        } catch (e) {
            console.error('Error loading cache:', e);
        }
        return null;
    }
    
    saveCache(repos) {
        try {
            const data = {
                repos: repos,
                timestamp: new Date().getTime()
            };
            sessionStorage.setItem('github_repos', JSON.stringify(data));
        } catch (e) {
            console.error('Error saving cache:', e);
        }
    }
    
    async fetchRepositories() {
        try {
            const response = await fetch(this.apiUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const repos = await response.json();
            
            // Sort repositories
            const sortedRepos = this.sortRepositories(repos);
            
            // Save to cache
            this.saveCache(sortedRepos);
            
            // Display repositories
            this.displayRepositories(sortedRepos);
            
        } catch (error) {
            console.error('Error fetching repositories:', error);
            this.displayError(error.message);
        }
    }
    
    sortRepositories(repos) {
        // Filter out forks if desired and sort by featured, then by stars
        return repos
            .filter(repo => !repo.fork || this.featuredRepos.includes(repo.name))
            .sort((a, b) => {
                // Prioritize featured repos
                const aFeatured = this.featuredRepos.includes(a.name);
                const bFeatured = this.featuredRepos.includes(b.name);
                
                if (aFeatured && !bFeatured) return -1;
                if (!aFeatured && bFeatured) return 1;
                
                // Then sort by stars
                return b.stargazers_count - a.stargazers_count;
            })
            .slice(0, 6); // Show top 6 repositories
    }
    
    displayRepositories(repos) {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        if (repos.length === 0) {
            this.container.innerHTML = `
                <div class="no-projects">
                    <p>Nenhum projeto encontrado.</p>
                </div>
            `;
            return;
        }
        
        repos.forEach(repo => {
            const card = this.createProjectCard(repo);
            this.container.appendChild(card);
        });
    }
    
    createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        
        // Get language color
        const languageColor = this.getLanguageColor(repo.language);
        
        // Format description
        const description = repo.description || 'Sem descrição disponível';
        
        // Create card HTML
        card.innerHTML = `
            <div class="project-header">
                <div class="project-icon" style="color: ${languageColor}">📁</div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" title="Ver no GitHub">
                        ⚙
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="project-link" title="Ver Demo">
                            🔗
                        </a>
                    ` : ''}
                </div>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description}</p>
            ${repo.topics && repo.topics.length > 0 ? `
                <div class="project-tech">
                    ${repo.topics.slice(0, 3).map(topic => 
                        `<span class="tech-tag">${topic}</span>`
                    ).join('')}
                </div>
            ` : repo.language ? `
                <div class="project-tech">
                    <span class="tech-tag">${repo.language}</span>
                </div>
            ` : ''}
            <div class="project-stats">
                <span class="stat" title="Stars">
                    ⭐ ${repo.stargazers_count}
                </span>
                <span class="stat" title="Forks">
                    🔱 ${repo.forks_count}
                </span>
                ${repo.language ? `
                    <span class="stat" title="Linguagem Principal">
                        <span style="color: ${languageColor}">●</span> ${repo.language}
                    </span>
                ` : ''}
            </div>
        `;
        
        // Add click handler to open repository
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a link
            if (e.target.tagName !== 'A') {
                window.open(repo.html_url, '_blank');
            }
        });
        
        return card;
    }
    
    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f7df1e',
            'TypeScript': '#3178c6',
            'Python': '#3776ab',
            'Java': '#b07219',
            'C#': '#178600',
            'C++': '#f34b7d',
            'C': '#555555',
            'Ruby': '#701516',
            'PHP': '#4F5D95',
            'Swift': '#ffac45',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Kotlin': '#A97BFF',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Shell': '#89e051',
            'Dart': '#00B4AB',
        };
        
        return colors[language] || '#a855f7';
    }
    
    displayError(message) {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="error-message" style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 3rem;
                background: rgba(168, 85, 247, 0.1);
                border: 1px solid rgba(168, 85, 247, 0.3);
                border-radius: 12px;
            ">
                <h3 style="color: var(--purple-primary); margin-bottom: 1rem;">
                    Erro ao carregar projetos
                </h3>
                <p style="color: var(--text-gray);">
                    ${message}
                </p>
                <p style="color: var(--text-gray); margin-top: 1rem;">
                    Você pode ver todos os projetos diretamente no 
                    <a href="https://github.com/${this.username}" target="_blank" 
                       style="color: var(--green-neon);">GitHub</a>.
                </p>
            </div>
        `;
    }
}

// Initialize GitHub portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GitHubPortfolio('ewerton336');
});

