import { generatePDF } from './pdf-gen.js';

export function initCLI() {
    const cliContainer = document.getElementById('cli-container');
    const toggleBtn = document.getElementById('toggle-cli');
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');
    
    // Track if the terminal has booted so it doesn't repeat the welcome message
    let hasBooted = false;

    if (!cliContainer || !toggleBtn || !cliInput) return;

    // Toggle CLI visibility on button click
    toggleBtn.addEventListener('click', () => {
        cliContainer.classList.toggle('hidden');
        if (!cliContainer.classList.contains('hidden')) {
            cliInput.focus();
            if (!hasBooted) {
                runBootSequence();
                hasBooted = true;
            }
        }
    });

    // Listen for commands
    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = cliInput.value.trim().toLowerCase();
            if (command) {
                printOutput(`yagnam@server:~$ ${command}`, 'prompt-echo');
                processCommand(command);
            }
            cliInput.value = ''; // Clear input field
        }
    });

    // The Auto-Welcome Message
    function runBootSequence() {
        const lines = [
            "YagnamOS [Version 2.0.26]",
            "Establishing secure connection... OK",
            "Loading Core Architecture... OK",
            "Type 'help' to see available commands."
        ];
        
        // Print lines with a slight delay to look like a real boot sequence
        lines.forEach((line, index) => {
            setTimeout(() => printOutput(line, 'system-text'), index * 200);
        });
    }

    // Command Logic Router
    function processCommand(cmd) {
        switch(cmd) {
            case 'help':
                printOutput('Available commands:');
                printOutput('  whoami      - Display user identity');
                printOutput('  education   - Display academic background');
                printOutput('  stack       - View core technologies');
                printOutput('  projects    - List deployed logic');
                printOutput('  contact     - View connection details');
                printOutput('  get resume  - Download ATS-compliant PDF');
                printOutput('  clear       - Clear terminal output');
                break;
            case 'whoami':
                printOutput('Yagnam Joshi - Full-Spectrum Technologist. Bridging Data Science with Interactive Engineering.');
                break;
            case 'education':
                printOutput('B.Tech in CSE (AI & DS) @ MIT World Peace University');
                printOutput('Status: Direct 2nd Year (Current CGPA: 9.19)');
                printOutput('Experience: Research Intern @ MIT WPU AI Research Centre (Jan-Apr 2025)');
                break;
            case 'stack':
                printOutput('Executing stack trace: C++, Python, JavaScript, Qt Framework, Godot, K-Means Clustering, Dijkstra/A* Pathfinding.');
                break;
            case 'projects':
                printOutput('1. PuneBusRouting Simulation (C++, Qt, Dijkstra)');
                printOutput('2. Audio Profile Data Mining (Python, K-Means)');
                printOutput('3. Orbital Invasion (Godot, A* pathfinding)');
                printOutput('Scroll up to the UI to view full project details.');
                break;
            case 'contact':
                printOutput('Email: yagnam@example.com');
                printOutput('LinkedIn: linkedin.com/in/yagnam-joshi');
                break;
            case 'get resume':
            case 'cat resume.txt':
            case 'download resume':
                printOutput('Compiling JSON data... Fetching PDF generator...', 'system-text');
                generatePDF(); // Triggers the download!
                printOutput('Download initiated. Check your browser downloads.', 'success-text');
                break;
            case 'sudo':
            case 'su':
                printOutput('yagnam is not in the sudoers file. This incident will be reported.', 'error');
                break;
            case 'clear':
                cliOutput.innerHTML = '';
                break;
            default:
                printOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    // Helper to print styled text to the terminal UI
    function printOutput(text, className = '') {
        const div = document.createElement('div');
        div.textContent = text;
        
        // Apply specific color styling based on the message type
        if (className === 'prompt-echo') {
            div.style.color = '#FF5A00'; // Neon Orange for commands the user typed
            div.style.marginBottom = '6px';
        } else if (className === 'error') {
            div.style.color = '#ff3333'; // Red for errors or denied access
        } else if (className === 'system-text') {
            div.style.color = '#94A3B8'; // Muted slate for system messages
        } else if (className === 'success-text') {
            div.style.color = '#00F0FF'; // Electric Cyan for successful actions
        } else {
            div.style.color = '#E2E8F0'; // Default text color
            div.style.paddingLeft = '12px'; // Indent command outputs slightly for readability
        }
        
        cliOutput.appendChild(div);
        // Always auto-scroll to the bottom when new text is added
        cliOutput.scrollTop = cliOutput.scrollHeight; 
    }
}