export async function initProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const response = await fetch('./data/projects.json');
        const projects = await response.json();

        projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // Fix: Split the ATS string into an array, trim whitespace, then map to HTML
            const techArray = proj.tech.split(',').map(t => t.trim());
            const techTags = techArray.map(t => `<span class="tech-tag">${t}</span>`).join('');
            
            // Build the card HTML using the hybrid data
            card.innerHTML = `
                <div class="project-header">
                    <h3>${proj.title}</h3>
                    <div class="project-role">${proj.role}</div>
                </div>
                <p class="project-summary">${proj.summary}</p>
                <div class="tech-stack">
                    ${techTags}
                </div>
                <div class="project-links">
                    ${proj.github ? `<a href="${proj.github}" target="_blank" class="btn-secondary link-btn">View Code</a>` : ''}
                </div>
            `;
            
            grid.appendChild(card);
        });

    } catch (error) {
        console.error("Failed to load projects data:", error);
    }
}