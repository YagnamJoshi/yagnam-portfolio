export async function initSkillTree() {
    const container = document.getElementById('graph-canvas');
    if (!container) return;

    try {
        const response = await fetch('./data/skills.json');
        const data = await response.json();

        const colorMap = {
            0: '#00F0FF', 1: '#FF5A00', 2: '#E2E8F0', 3: '#FF5A00', 4: '#00F0FF'
        };

        // 1. Force the engine to acknowledge the exact box dimensions immediately
        const boxWidth = container.clientWidth || 600;
        const boxHeight = container.clientHeight || 500;

        const Graph = ForceGraph()(container)
            .width(boxWidth)
            .height(boxHeight)
            .graphData(data)
            .nodeColor(node => colorMap[node.group] || '#E2E8F0')
            .nodeRelSize(6)
            .linkColor(() => 'rgba(0, 240, 255, 0.2)')
            .backgroundColor('transparent')
            .nodeCanvasObject((node, ctx, globalScale) => {
                const label = node.id;
                const fontSize = 14 / globalScale;
                ctx.font = `${fontSize}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                
                ctx.fillStyle = colorMap[node.group] || '#E2E8F0';
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.val / 2, 0, 2 * Math.PI, false);
                ctx.fill();
                
                ctx.fillStyle = '#E2E8F0';
                ctx.fillText(label, node.x, node.y + (node.val / 2) + 6);
            });

        // 2. Hard-anchor the camera to the absolute center 
        Graph.centerAt(0, 0);
        Graph.zoom(1.5); // Set a good default zoom
        
        // 3. Let the physics settle for half a second, THEN perfectly frame them
        setTimeout(() => {
            Graph.zoomToFit(400, 50);
        }, 500);

        // Keep it centered if the browser is resized
        window.addEventListener('resize', () => {
            if (container.clientWidth && container.clientHeight) {
                Graph.width(container.clientWidth);
                Graph.height(container.clientHeight);
            }
        });

    } catch (error) {
        console.error("Physics engine failed to load data:", error);
    }
}