function addExercise() {
    const exerciseInput = document.getElementById('exerciseName');
    const setsInput = document.getElementById('numSets');
    const repsInput = document.getElementById('numReps');
    const weightInput = document.getElementById('totalWeight');

    const exercise = exerciseInput.value.trim();
    const sets = Number(setsInput.value);
    const reps = Number(repsInput.value);
    const weight = Number(weightInput.value);
        
    // Validate the input fields
    if (!exercise || !setsInput.value || !repsInput.value || !weightInput.value) {
        alert('Please fill in all of the fields!');
        return;
    }
    
    // Validate that sets, reps, and weight are numbers
    if (isNaN(sets) || isNaN(reps) || isNaN(weight)) {
        alert('Please enter valid numbers for sets, reps, and weight!');
        return;
    }

    const totalWeight = sets * reps * weight;
    const tableBody = document.querySelector('#exerciseTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${exercise}</td>
        <td>${reps}</td>
        <td>${weight}</td>
        <td>${sets}</td>
        <td>${totalWeight}</td>
        <td></td>
    `;

    tableBody.appendChild(row);

    exerciseInput.value = '';
    setsInput.value = '';
    repsInput.value = '';
    weightInput.value = '';
}

document.getElementById('addExercise').addEventListener('click', addExercise);