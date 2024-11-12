const API_URL = 'http://localhost:3000';

// Function to add a new exercise
async function addExercise() {
    const button = document.getElementById('addExerciseButton');
    button.disabled = true; // Prevent duplicate requests

    const name = document.getElementById('exercise-name').value;
    const description = document.getElementById('exercise-description').value;

    if (!name || !description) {
        showNotification('Please fill in both fields', 'error');
        button.disabled = false;
        return;
    }

    try {
        const existingExercisesResponse = await fetch(`${API_URL}/exercises`);
        const existingExercises = await existingExercisesResponse.json();

        // Check for duplicate exercise
        const duplicateExercise = existingExercises.find(
            exercise => exercise.name === name && exercise.description === description
        );

        if (duplicateExercise) {
            showNotification("Exercise already exists!", "error");
        } else {
            // Add new exercise
            const response = await fetch(`${API_URL}/exercises/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description })
            });

            if (response.ok) {
                alert('Exercise added successfully', 'success');
                getExercises(); // Refresh exercise list
                document.getElementById('exercise-name').value = '';
                document.getElementById('exercise-description').value = '';
            } else {
                const error = await response.json();
                showNotification(`Error: ${error.error}`, 'error');
            }
        }
    } catch (error) {
        console.error('Error adding exercise:', error);
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

// Show a specific tab and remember the selected tab in local storage
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => (tab.style.display = 'none'));
    document.getElementById(tabId).style.display = 'block';
    localStorage.setItem('activeTab', tabId);
}

// Show a notification
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => (notification.style.display = 'none'), 3000);
}

// Populate dropdowns for workout and progress views with exercise options
async function populateExerciseOptions() {
    try {
        const response = await fetch(`${API_URL}/exercises`);
        const exercises = await response.json();

        const workoutExerciseSelect = document.getElementById('workout-exercise');
        const progressExerciseSelect = document.getElementById('progress-exercise');
        workoutExerciseSelect.innerHTML = '';
        progressExerciseSelect.innerHTML = '';

        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.exercise_id;
            option.textContent = exercise.name;
            workoutExerciseSelect.appendChild(option.cloneNode(true));
            progressExerciseSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating exercises:', error);
    }
}

// Function to add a workout
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
            alert('Workout added successfully', 'success');
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

// Fetch and display workouts with mapped exercise names
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

// Add a body weight log
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
            alert('Body weight log added successfully', 'success');
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
            listItem.textContent = `Date: ${log.date}, Weight: ${log.weight} lbs`;
            bodyWeightList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching body weight logs:', error);
    }
}

// Fetch data and display progress chart based on selected criteria
document.getElementById('viewProgressButton').addEventListener('click', async () => {
    const exerciseId = document.getElementById('progress-exercise').value;
    const startDate = document.getElementById('progress-start-date').value;
    const endDate = document.getElementById('progress-end-date').value;
    const metric = document.getElementById('progress-metric').value;

    if (!startDate || !endDate || (!exerciseId && metric === 'weight')) {
        showNotification('Please select an exercise (for weight), date range, and metric', 'error');
        return;
    }

    try {
        let labels = [];
        let data = [];

        if (metric === 'weight') {
            const response = await fetch(`${API_URL}/exercises/workout-logs?exercise_id=${exerciseId}&start_date=${startDate}&end_date=${endDate}`);
            const workouts = await response.json();
            labels = workouts.map(workout => workout.date);
            data = workouts.map(workout => workout.weight);
            createChart(labels, data, 'Weight Over Time', 'Weight (lbs)');
        } else if (metric === 'bodyWeight') {
            const response = await fetch(`${API_URL}/exercises/body-weight?start_date=${startDate}&end_date=${endDate}`);
            const bodyWeights = await response.json();
            labels = bodyWeights.map(log => log.date);
            data = bodyWeights.map(log => log.weight);
            createChart(labels, data, 'Body Weight Over Time', 'Body Weight (lbs)');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

// Create or update the progress chart
let progressChart;
function createChart(labels, data, title, yAxisLabel) {
    const ctx = document.getElementById('progressChart').getContext('2d');

    if (progressChart) {
        progressChart.destroy();
    }

    progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: '#4CAF50',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: { display: true, text: 'Date' }
                },
                y: {
                    title: { display: true, text: yAxisLabel },
                    beginAtZero: false
                }
            }
        }
    });
}

// Set up event listeners
document.getElementById('addWorkoutButton').addEventListener('click', addWorkout);
document.getElementById('addBodyWeightButton').addEventListener('click', addBodyWeight);
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addExerciseButton').addEventListener('click', addExercise);

    const activeTab = localStorage.getItem('activeTab') || 'addExerciseTab';
    showTab(activeTab);

    getExercises();
    getWorkouts();
    getBodyWeightLogs();
    populateExerciseOptions();
});
