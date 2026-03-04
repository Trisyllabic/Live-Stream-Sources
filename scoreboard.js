// scoreboard.js

// Observations: Positioning adjustments needed in the team container
// Team container positioning adjustment comments will guide future refactoring
// Hide KO and 2H phases without structural shift
const phaseElement = document.getElementById('phase');
if (currentPhase === 'KO' || currentPhase === '2H') {
    phaseElement.style.visibility = 'hidden'; // Keep element visible but hidden
} else {
    phaseElement.style.visibility = 'visible';
}

// Replace timer with HT/FT without movement
let timerElement = document.getElementById('timer');
if (currentPhase === 'HT') {
    timerElement.innerText = 'HT'; // Show HT
} else if (currentPhase === 'FT') {
    timerElement.innerText = 'FT'; // Show FT
} else {
    timerElement.innerText = '00:00'; // Default clock display
}

// Update render function accordingly
function render() {
    // Call to update phase display
    updatePhaseDisplay();
    // Call to render timing display
    renderTiming();
    // Potential adjustments will be documented here based on the phase and team positioning
    // Adjust team positioning based on phase
    // TODO: Implement CSS positioning adjustments here
}