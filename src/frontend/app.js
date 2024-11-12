const API_URL = 'http://localhost:3000';

async function addExercise() {
    console.log('Attempting to add an exercise'); // Log to verify function call
    const button = document.getElementById('addExerciseButton');
    button.disabled = true; // Disable the button to prevent duplicate requests

    const name = document.getElementById('exercise-name').value;
    const description = document.getElementById('exercise-description').value;

    if (!name || !description) {
        showNotification('Please fill in both fields.', 'error');
        return;
    }

    try {
        // Fetch existing exercises once to check for duplicates
        const existingExercisesResponse = await fetch(`${API_URL}/exercises`);
        const existingExercises = await existingExercisesResponse.json();

        // Check if an exercise with the same name and description already exists
        const duplicateExercise = existingExercises.find(
            (exercise) => exercise.name === name && exercise.description === description
        );

        if (duplicateExercise) {
            // If exact duplicate exists, show a single alert and stop further execution
            showNotification("Exercise already exists!", "error");
            return;
        } else {
            // Proceed to add or update exercise description in the database
            const response = await fetch(`${API_URL}/exercises/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message, "success");
                getExercises(); // Refresh the list of exercises
                document.getElementById('exercise-name').value = '';
                document.getElementById('exercise-description').value = '';
                
            } else {
                const error = await response.json();
                showNotification(`Error: ${error.error}`, "error");
            }
        }
    } catch (error) {
        showNotification("Failed to add exercise", "error");
    } finally {
        button.disabled = false; // Re-enable the button
    }
}

// Fetch and display exercises
async function getExercises() {
    try {
        const response = await fetch(`${API_URL}/exercises`);
        const exercises = await response.json();

        const exerciseList = document.getElementById('exercise-list');
        exerciseList.innerHTML = ''; // Clear existing list

        exercises.forEach(exercise => {
            const listItem = document.createElement('li');
            listItem.textContent = `${exercise.name}: ${exercise.description}`;
            exerciseList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`; // Set success or error
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

// Set up the event listener only once
window.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addExerciseButton');

    // Remove any existing listeners, then add the click listener
    addButton.removeEventListener('click', addExercise); // Prevent duplicate listeners
    addButton.addEventListener('click', addExercise); // Attach the listener

    getExercises(); // Load exercises when the page loads
});
