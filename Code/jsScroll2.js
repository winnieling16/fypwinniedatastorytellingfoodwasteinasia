// script.js

// Get the element whose scroll position we will track
const strokeSection = document.querySelector('.stroke-section');

// Function to calculate and update the CSS variable
function updateStrokeText() {
    // 1. Get the viewport dimensions
    const viewportHeight = window.innerHeight;
    
    // 2. Get the position of the stroke section relative to the viewport
    const sectionRect = strokeSection.getBoundingClientRect();

    // 3. Calculate the percentage of the section visible/passed
    // 'start' is the point when the bottom of the section hits the top of the viewport (fully passed)
    // 'end' is the point when the top of the section hits the bottom of the viewport (fully starting)
    const totalScrollRange = sectionRect.height + viewportHeight;
    const distanceScrolled = viewportHeight - sectionRect.top;
    
    // Calculate the progress from 0 (start) to 1 (end)
    let progress = distanceScrolled / totalScrollRange;

    // Clamp the progress between 0 and 1 to prevent negative or > 1 values
    progress = Math.max(0, Math.min(1, progress));

    // 4. Set the custom CSS property
    document.body.style.setProperty('--scroll-progress', progress);

    // Optional: Add a subtle speed difference for layered effect
    document.querySelectorAll('.stroke-text').forEach(textElement => {
        const speed = parseFloat(textElement.dataset.speed);
        // Apply a factor to the progress for a different drawing speed
        const offset = (1 - (progress * speed)) * 1000; 
        textElement.style.strokeDashoffset = offset;
    });
}

// Attach the function to the scroll event
window.addEventListener('scroll', updateStrokeText);

// Run once on load to set the initial state
updateStrokeText();