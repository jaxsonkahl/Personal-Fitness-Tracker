const API_URL = 'http://localhost:3000';

async function addExercise() {
    console.log('Attempting to add an exercise'); // Log to verify function call
    const button = document.getElementById('addExerciseButton');
    button.disabled = true; // Disable the button to prevent duplicate requests

    const name = document.getElementById('exercise-name').value;
    const description = document.getElementById('exercise-description').value;

    if (!name || !description) {
        showNotification('Please fill in both fields', 'error');
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

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    document.getElementById(tabId).style.display = 'block';
    localStorage.setItem('activeTab', tabId); // Store the active tab in localStorage
}

// Initialize by showing the Add Exercise tab
window.onload = () => {
    const activeTab = localStorage.getItem('activeTab') || 'addExerciseTab'; // Default to 'addExerciseTab'
    showTab(activeTab); // Show the active tab on load

    getExercises(); // Load exercises when the page loads
    getWorkouts(); // Load workouts when the page loads
    populateExerciseOptions(); // Populate exercise options for dropdowns
};


function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`; // Set success or error
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}
async function populateExerciseOptions() {
    try {
        const response = await fetch(`${API_URL}/exercises`);
        const exercises = await response.json();
        
        // Populate options for adding workout
        const workoutExerciseSelect = document.getElementById('workout-exercise');
        workoutExerciseSelect.innerHTML = '';
        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.exercise_id;
            option.textContent = exercise.name;
            workoutExerciseSelect.appendChild(option);
        });

        // Populate options for viewing progress
        const progressExerciseSelect = document.getElementById('progress-exercise');
        progressExerciseSelect.innerHTML = '';
        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.exercise_id;
            option.textContent = exercise.name;
            progressExerciseSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating exercises:', error);
    }
}

async function addWorkout() {
    const exerciseId = document.getElementById('workout-exercise').value;
    const date = document.getElementById('workout-date').value;
    const reps = document.getElementById('workout-reps').value;
    const sets = document.getElementById('workout-sets').value;
    const weight = document.getElementById('workout-weight').value;

    if (!exerciseId || !date|| !reps|| !sets|| !weight) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/exercises/workout-logs/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exercise_id: exerciseId, date, repetitions: reps, sets, weight })
        });

        if (response.ok) {
            alert('Workout added successfully', 'success');
            document.getElementById('workout-date').value = '';
            document.getElementById('workout-reps').value = '';
            document.getElementById('workout-sets').value = '';
            document.getElementById('workout-weight').value = '';
            await getWorkouts(); // Refresh the list of workouts
        } else {
            const error = await response.json();
            showNotification(`Error: ${error.error}`, 'error');
        }
    } catch (error) {
        console.error('Error adding workout:', error);
    }
}

// Function to fetch and display all workouts
async function getWorkouts() {
    try {
        // Fetch all workouts
        const response = await fetch(`${API_URL}/exercises/workout-logs`);
        const workouts = await response.json();

        // Fetch all exercises to match names with IDs
        const exercisesResponse = await fetch(`${API_URL}/exercises`);
        const exercises = await exercisesResponse.json();

        // Create a map for quick lookup of exercise names by ID
        const exerciseMap = exercises.reduce((map, exercise) => {
            map[exercise.exercise_id] = exercise.name;
            return map;
        }, {});

        // Get the workout list element and clear it
        const workoutList = document.getElementById('workout-list');
        workoutList.innerHTML = '';

        // Display each workout with the exercise name instead of the ID
        workouts.forEach(workout => {
            const listItem = document.createElement('li');
            const exerciseName = exerciseMap[workout.exercise_id] || 'Unknown Exercise';
            listItem.textContent = `${exerciseName}, Date: ${workout.date}, Reps: ${workout.repetitions}, Sets: ${workout.sets}, Weight: ${workout.weight} lbs`;
            workoutList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching workouts:', error);
    }
}

// Event listener for the add workout button
document.getElementById('addWorkoutButton').addEventListener('click', addWorkout);


// Set up the event listener only once
window.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addExerciseButton');

    // Remove any existing listeners, then add the click listener
    addButton.removeEventListener('click', addExercise); // Prevent duplicate listeners
    addButton.addEventListener('click', addExercise); // Attach the listener

    getExercises(); // Load exercises when the page loads
    getWorkouts();
    populateExerciseOptions();
});
