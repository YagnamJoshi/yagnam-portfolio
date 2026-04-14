export async function generatePDF() {
    try {
        // Change button text to show activity
        const btn = document.getElementById('generate-pdf');
        const originalText = btn.innerText;
        btn.innerText = "Compiling ATS Format...";

        // Fetch the data
        const [aboutRes, projRes] = await Promise.all([
            fetch('./data/about.json'),
            fetch('./data/projects.json')
        ]);
        const about = await aboutRes.json();
        const projects = await projRes.json();

        // Build the raw, linear HTML payload
        const container = document.createElement('div');
        
        // Strict ATS CSS: Linear, Arial, no fancy styling
        container.innerHTML = `
            <div style="font-family: Arial, sans-serif; font-size: 11pt; color: #000; line-height: 1.4; padding: 20px; max-width: 800px; margin: 0 auto;">
                
                <div style="text-align: center; margin-bottom: 15px;">
                    <h1 style="font-size: 18pt; font-weight: bold; margin: 0 0 5px 0; text-transform: uppercase;">${about.profile.name}</h1>
                    <p style="margin: 0; font-size: 10pt;">
                        ${about.profile.phone} | ${about.profile.email} <br>
                        ${about.profile.linkedin} | ${about.profile.github}
                    </p>
                </div>

                <div style="margin-bottom: 15px;">
                    <h2 style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin: 0 0 5px 0; padding-bottom: 2px;">PROFESSIONAL SUMMARY</h2>
                    <p style="margin: 0; text-align: justify;">${about.summary}</p>
                </div>

                <div style="margin-bottom: 15px;">
                    <h2 style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin: 0 0 5px 0; padding-bottom: 2px;">TECHNICAL SKILLS</h2>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${Object.entries(about.skills).map(([category, skills]) => 
                            `<li style="margin-bottom: 3px;"><strong>${category}:</strong> ${skills}</li>`
                        ).join('')}
                    </ul>
                </div>

                <div style="margin-bottom: 15px;">
                    <h2 style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin: 0 0 5px 0; padding-bottom: 2px;">EXPERIENCE</h2>
                    ${about.experience.map(exp => `
                        <div style="margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between; font-weight: bold;">
                                <span>${exp.role} – ${exp.company}</span>
                                <span>${exp.duration}</span>
                            </div>
                            <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                                ${exp.bullets.map(b => `<li style="margin-bottom: 3px;">${b}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <div style="margin-bottom: 15px;">
                    <h2 style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin: 0 0 5px 0; padding-bottom: 2px;">PROJECTS</h2>
                    ${projects.map(proj => `
                        <div style="margin-bottom: 10px;">
                            <div style="font-weight: bold;">${proj.title}</div>
                            <ul style="margin: 3px 0 0 0; padding-left: 20px;">
                                ${proj.bullets.map(b => `<li style="margin-bottom: 3px;">${b}</li>`).join('')}
                                <li style="margin-bottom: 3px;"><strong>Tech:</strong> ${proj.tech}</li>
                            </ul>
                        </div>
                    `).join('')}
                </div>

                <div style="margin-bottom: 15px;">
                    <h2 style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin: 0 0 5px 0; padding-bottom: 2px;">EDUCATION</h2>
                    ${about.education.map(edu => `
                        <div style="margin-bottom: 8px;">
                            <div style="display: flex; justify-content: space-between; font-weight: bold;">
                                <span>${edu.degree}</span>
                                <span>${edu.duration}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span>${edu.institution}, ${edu.location}</span>
                                <span>${edu.details}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div style="margin-bottom: 15px;">
                    <h2 style="font-size: 12pt; font-weight: bold; border-bottom: 1px solid #000; margin: 0 0 5px 0; padding-bottom: 2px;">CERTIFICATIONS</h2>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${about.certifications.map(cert => `<li style="margin-bottom: 3px;">${cert}</li>`).join('')}
                    </ul>
                </div>

            </div>
        `;

        // Configuration for the PDF generation
        const opt = {
            margin:       0.5,
            filename:     'Yagnam_Joshi_Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate and download
        await html2pdf().set(opt).from(container).save();

        // Revert button text
        setTimeout(() => { btn.innerText = originalText; }, 1000);

    } catch (error) {
        console.error("Failed to generate PDF:", error);
        document.getElementById('generate-pdf').innerText = "Generation Failed";
    }
}