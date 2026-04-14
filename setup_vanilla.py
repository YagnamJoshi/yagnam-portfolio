import os
import json

def create_vanilla_portfolio():
    base_dir = "yagnam-vanilla-portfolio"

    # Define directories
    directories = [
        "css",
        "js/modules",
        "data",
        "assets/icons"
    ]

    # Pre-configure the HTML with the necessary CDNs for our complex features
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yagnam Joshi | Full-Spectrum Technologist</title>
    <link rel="stylesheet" href="css/style.css">
    
    <script src="https://unpkg.com/force-graph"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</head>
<body>

    <div id="cli-container" class="hidden">
        <div id="cli-output"></div>
        <div class="cli-input-line">
            <span class="prompt">yagnam@server:~$</span>
            <input type="text" id="cli-input" autocomplete="off" autofocus>
        </div>
    </div>

    <main id="app">
        <section id="hero">
            <h1>Synthesizing Data <br><span class="highlight">Interactive Logic.</span></h1>
            <button id="toggle-cli">Open Terminal</button>
            <button id="generate-pdf">Download Resume</button>
        </section>

        <section id="skill-tree-container">
            <div id="graph-canvas"></div>
        </section>

        <section id="projects-grid">
            </section>
        
        <section id="contact">
            </section>
    </main>

    <script type="module" src="js/app.js"></script>
</body>
</html>"""

    # Define files
    files = {
        "index.html": html_content,
        "css/style.css": ":root { --bg: #0B1120; --text: #E2E8F0; --primary: #00F0FF; --accent: #FF5A00; }\nbody { background: var(--bg); color: var(--text); font-family: monospace; }",
        "js/app.js": "// Main entry point\nimport { initCLI } from './modules/cli.js';\nimport { initSkillTree } from './modules/skill-tree.js';\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    initCLI();\n    initSkillTree();\n});",
        "js/modules/cli.js": "export function initCLI() { console.log('CLI initialized'); }",
        "js/modules/skill-tree.js": "export function initSkillTree() { console.log('Physics engine standing by'); }",
        "js/modules/pdf-gen.js": "export function generatePDF() { console.log('Building PDF...'); }"
    }

    # Data files
    json_files = {
        "data/projects.json": [
            {
                "id": "pune-bus-routing",
                "title": "PuneBusRouting Simulation",
                "role": "Qt Development & Algorithm Planning",
                "tech": ["C++", "Qt", "Dijkstra"]
            }
        ],
        "data/skills.json": {
            "nodes": [
                {"id": "C++", "group": 1}, {"id": "Python", "group": 2}, {"id": "JavaScript", "group": 3}
            ],
            "links": [
                {"source": "C++", "target": "Python"}
            ]
        }
    }

    print(f"🚀 Initializing Vanilla Architecture in '{base_dir}'...")

    os.makedirs(base_dir, exist_ok=True)

    for directory in directories:
        os.makedirs(os.path.join(base_dir, directory), exist_ok=True)

    for file_path, content in files.items():
        with open(os.path.join(base_dir, file_path), 'w') as f:
            f.write(content)

    for json_file, content in json_files.items():
        with open(os.path.join(base_dir, json_file), 'w') as f:
            json.dump(content, f, indent=2)

    print("✅ Vanilla build complete. No npm required.")

if __name__ == "__main__":
    create_vanilla_portfolio()
    