const API_URL = 'http://localhost:3000';

async function addExercise() {
    const button = document.getElementById('addExerciseButton');
    button.disabled = true; // Prevent duplicate requests

    const name = document.getElementById('exercise-name').value;
    const description = document.getElementById('exercise-description').value;

    if (!name || !description) {
        showNotification('Please fill in both fields', 'error');
        return;
    }

    try {
        const existingExercisesResponse = await fetch(`${API_URL}/exercises`);
        const existingExercises = await existingExercisesResponse.json();
        const duplicateExercise = existingExercises.find(
            (exercise) => exercise.name === name && exercise.description === description
        );

        if (duplicateExercise) {
            showNotification("Exercise already exists!", "error");
            return;
        } else {
            const response = await fetch(`${API_URL}/exercises/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description })
            });

            if (response.ok) {
                showNotification('Exercise added successfully', 'success');
                getExercises(); // Refresh exercise list
                document.getElementById('exercise-name').value = '';
                document.getElementById('exercise-description').value = '';
            } else {
                const error = await response.json();
                showNotification(`Error: ${error.error}`, 'error');
            }
        }
    } catch (error) {
        showNotification("Failed to add exercise", 'error');
    } finally {
        button.disabled = false;
    }
}

// Fetch and display exercises
async function getExercises() {
    try {
        const response = await fetch(`${API_URL}/exercises`);
        const exercises = await response.json();

        const exerciseList = document.getElementById('exercise-list');
        exerciseList.innerHTML = '';

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
    localStorage.setItem('activeTab', tabId); // Store the active tab
}

// Initialize by showing the Add Exercise tab
window.onload = () => {
    const activeTab = localStorage.getItem('activeTab') || 'addExerciseTab';
    showTab(activeTab);

    getExercises();
    getWorkouts();
    getBodyWeightLogs();
    populateExerciseOptions();
};

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

async function populateExerciseOptions() {
    try {
        const response = await fetch(`${API_URL}/exercises`);
        const exercises = await response.json();

        const workoutExerciseSelect = document.getElementById('workout-exercise');
        workoutExerciseSelect.innerHTML = '';
        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.exercise_id;
            option.textContent = exercise.name;
            workoutExerciseSelect.appendChild(option);
        });

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

    if (!exerciseId || !date || !reps || !sets || !weight) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/exercises/workout-logs/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ exercise_id: exerciseId, date, repetitions: reps, sets, weight })
        });

        if (response.ok) {
            showNotification('Workout added successfully', 'success');
            document.getElementById('workout-date').value = '';
            document.getElementById('workout-reps').value = '';
            document.getElementById('workout-sets').value = '';
            document.getElementById('workout-weight').value = '';
            getWorkouts();
        } else {
            const error = await response.json();
            showNotification(`Error: ${error.error}`, 'error');
        }
    } catch (error) {
        console.error('Error adding workout:', error);
    }
}

// Fetch and display workouts
async function getWorkouts() {
    try {
        const response = await fetch(`${API_URL}/exercises/workout-logs`);
        const workouts = await response.json();

        const exercisesResponse = await fetch(`${API_URL}/exercises`);
        const exercises = await exercisesResponse.json();
        const exerciseMap = exercises.reduce((map, exercise) => {
            map[exercise.exercise_id] = exercise.name;
            return map;
        }, {});

        const workoutList = document.getElementById('workout-list');
        workoutList.innerHTML = '';

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

// Add body weight function
async function addBodyWeight() {
    const date = document.getElementById('body-weight-date').value;
    const weight = document.getElementById('body-weight-value').value;

    if (!date || !weight) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/exercises/body-weight/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, weight })
        });

        if (response.ok) {
            showNotification('Body weight log added successfully', 'success');
            document.getElementById('body-weight-date').value = '';
            document.getElementById('body-weight-value').value = '';
            getBodyWeightLogs();
        } else {
            const error = await response.json();
            showNotification(`Error: ${error.error}`, 'error');
        }
    } catch (error) {
        console.error('Error adding body weight:', error);
    }
}

// Fetch and display body weight logs
async function getBodyWeightLogs() {
    try {
        const response = await fetch(`${API_URL}/exercises/body-weight`);
        const bodyWeights = await response.json();

        const bodyWeightList = document.getElementById('body-weight-list');
        bodyWeightList.innerHTML = '';

        bodyWeights.forEach(log => {
            const listItem = document.createElement('li');
            listItem.textContent = `Date: ${log.date}, Weight: ${log.weight} kg`;
            bodyWeightList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching body weight logs:', error);
    }
}

// Event listeners
document.getElementById('addWorkoutButton').addEventListener('click', addWorkout);
document.getElementById('addBodyWeightButton').addEventListener('click', addBodyWeight);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addExerciseButton').addEventListener('click', addExercise);

    getExercises();
    getWorkouts();
    getBodyWeightLogs();
    populateExerciseOptions();
});
