// Import all modular functions
import { initCLI } from './modules/cli.js';
import { initSkillTree } from './modules/skill-tree.js';
import { initProjects } from './modules/projects.js';
import { generatePDF } from './modules/pdf-gen.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Core systems initialized. Welcome, Yagnam.");
    
    // Boot up the interactive modules
    initCLI();
    initSkillTree();
    initProjects();
    
    // Wire up the ATS PDF generator button
    const pdfBtn = document.getElementById('generate-pdf');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF);
    }

    // Wire up the CLI Close button
    const closeCliBtn = document.getElementById('close-cli');
    const cliContainer = document.getElementById('cli-container');
    if (closeCliBtn && cliContainer) {
        closeCliBtn.addEventListener('click', () => {
            cliContainer.classList.add('hidden');
        });
    }
});