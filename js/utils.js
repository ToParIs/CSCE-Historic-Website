// Formatting and UI Utilities

export function getNextPrevSiteButtons(currentSiteId, sites) {
    const currentIndex = sites.findIndex(s => s.id === currentSiteId);
    const prevSite = currentIndex > 0 ? sites[currentIndex - 1] : null;
    const nextSite = currentIndex < sites.length - 1 ? sites[currentIndex + 1] : null;

    let buttons = '';

    if (prevSite) {
        buttons += `
            <a href="#${prevSite.id}" class="btn btn-outline-secondary me-2">
                <i class="bi bi-chevron-left me-1"></i>
                <span data-en="Previous Site" data-fr="Site précédent">Previous Site</span>
            </a>
        `;
    }

    if (nextSite) {
        buttons += `
            <a href="#${nextSite.id}" class="btn btn-outline-secondary">
                <span data-en="Next Site" data-fr="Site suivant">Next Site</span>
                <i class="bi bi-chevron-right ms-1"></i>
            </a>
        `;
    }

    return buttons ? `<div>${buttons}</div>` : '';
}

export function formatTextContent(text) {
    if (!text) return '';

    // Split by double line breaks to create sections
    const sections = text.split('\n\n');
    let result = [];
    let i = 0;

    while (i < sections.length) {
        const section = sections[i].trim();

        // Skip empty sections
        if (!section) {
            i++;
            continue;
        }

        // Check if it's a heading (starts with ** and ends with **)
        if (section.startsWith('**') && section.endsWith('**')) {
            const heading = section.replace(/^\*\*|\*\*$/g, '').trim();

            // Look for content in the next section
            let content = '';
            if (i + 1 < sections.length) {
                const nextSection = sections[i + 1].trim();
                // If next section is not a heading, it's content for this heading
                if (!nextSection.startsWith('**') || !nextSection.endsWith('**')) {
                    content = nextSection;
                    i++; // Skip the content section in next iteration
                }
            }

            result.push(`
                <div class="content-section mb-4">
                    <h5 class="section-heading">${heading}</h5>
                    ${content ? `<p class="section-content">${content.replace(/\n/g, '<br>')}</p>` : ''}
                </div>
            `);
        } else {
            // Check for simple bullet points
            const lines = section.split('\n');
            const hasBullets = lines.length > 1 && lines.every(line => line.trim().match(/^[•\-\*]/));

            if (hasBullets) {
                const listItems = lines
                    .filter(line => line.trim())
                    .map(line => {
                        const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
                        return `<li class="mb-2">${cleanLine}</li>`;
                    })
                    .join('');
                result.push(`<ul class="list-unstyled ps-3 mb-3">${listItems}</ul>`);
            } else {
                // Regular paragraph with line break support
                result.push(`<p class="mb-3">${section.replace(/\n/g, '<br>')}</p>`);
            }
        }

        i++;
    }

    return result.join('');
}
