const API_URL = 'http://localhost:3000';

// Ensure DOM is loaded before accessing elements
window.onload = () => {
    const button = document.getElementById('addExerciseButton');
    if (button) {
        button.addEventListener('click', addExercise);
    } else {
        console.error("Button with ID 'addExerciseButton' not found");
    }
    getExercises(); // Fetch and display exercises
};

async function addExercise() {
    console.log('Attempting to add an exercise'); // Log to verify function call

    const button = document.getElementById('addExerciseButton');
    button.disabled = true; // Disable the button to prevent duplicate requests

    const name = document.getElementById('exercise-name').value;
    const description = document.getElementById('exercise-description').value;

    try {
        const existingExercisesResponse = await fetch(`${API_URL}/exercises`);
        const existingExercises = await existingExercisesResponse.json();

        const duplicateExercise = existingExercises.some(exercise => exercise.name === name);
        if (duplicateExercise) {
            alert('This exercise already exists!');
            return;
        }

        const response = await fetch(`${API_URL}/exercises/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });

        if (response.ok) {
            alert('Exercise added successfully!');
            document.getElementById('exercise-name').value = '';
            document.getElementById('exercise-description').value = '';
            await getExercises(); // Refresh the exercise list
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Error adding exercise:', error);
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
