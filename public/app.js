const tableBody = document.querySelector('#exerciseTable tbody');

function renderExerciseRow(exercise) {
    const row = document.createElement('tr');
    const totalWeight = Number(exercise.sets) * Number(exercise.reps) * Number(exercise.weight);

    row.innerHTML = `
        <td>${exercise.exercise}</td>
        <td>${exercise.reps}</td>
        <td>${exercise.weight}</td>
        <td>${exercise.sets}</td>
        <td>${totalWeight}</td>
        <td></td>
    `;

    return row;
}

async function loadExercises() {
    // Fetch recent exercises from the server
    const response = await fetch('/api/exercise');

    if (!response.ok) {
        throw new Error('Unable to load exercises from the server.');
    }

    // Parse the JSON response and render the exercises in the table
    const exercises = await response.json();
    tableBody.innerHTML = '';

    exercises.forEach((exercise) => {
        tableBody.appendChild(renderExerciseRow(exercise));
    });
}

async function addExercise() {
    const exerciseInput = document.getElementById('exerciseName');
    const setsInput = document.getElementById('numSets');
    const repsInput = document.getElementById('numReps');
    const weightInput = document.getElementById('totalWeight');

    const exercise = exerciseInput.value.trim();
    const sets = Number(setsInput.value);
    const reps = Number(repsInput.value);
    const weight = Number(weightInput.value);

    if (!exercise || !setsInput.value || !repsInput.value || !weightInput.value) {
        alert('Please fill in all of the fields!');
        return;
    }

    if (isNaN(sets) || isNaN(reps) || isNaN(weight)) {
        alert('Please enter valid numbers for sets, reps, and weight!');
        return;
    }

    const response = await fetch('/api/exercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            exercise,
            sets,
            reps,
            weight
        })
    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message || 'Unable to save exercise.');
        return;
    }

    exerciseInput.value = '';
    setsInput.value = '';
    repsInput.value = '';
    weightInput.value = '';

    await loadExercises();
}

document.getElementById('addExercise').addEventListener('click', addExercise);

// Load recent exercises when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadExercises().catch((error) => {
        console.error(error);
        alert('Unable to load exercises from the database.');
    });
});

// "POST" Example
const nameExample = document.getElementById('nameExample');
const buttonExample = document.getElementById('buttonExample');
const resultExample = document.getElementById('resultExample');

buttonExample.addEventListener('click', async () => {
    const name = nameExample.value;

    const response = await fetch('/api/example', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });

    const data = await response.json();
    resultExample.textContent = `Server Response: ${data.message}`;
});